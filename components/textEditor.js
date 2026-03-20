/**
 * createTextEditor {
 *    @param {HTMLElement} parent - The element to append the editor to
 *    @param {string} content - Initial content of the editor, default is ""
 *    @param {string|number} id - Unique ID for this instance, used for undo/redo stack namespacing
 *    @param {Object} options - Optional configuration {
 *            @param {boolean} dark - dark theme enabled, false by default
 *            @param {boolean} shadow - box shadow enabled, true by default
 *            @param {string} focusColor - border color on focus, default #7c3aed
 *            @param {string} shadowColor - shadow color, default #000
 *            @param {boolean} lock - read-only mode, false by default
 *            @param {string} language - highlight.js language, default "plaintext"
 *            @param {string} hlTheme - highlight.js theme name, default "hybrid"
 *            @param {Object} font {
 *                @param {string} url - font file URL, only needed for external/custom fonts
 *                @param {string} name - font name, required for custom fonts
 *            }
 *            @param {Object} theme - custom colors {
 *                @param {Object} dark {
 *                    @param {string} background.editor - editor background color
 *                    @param {string} background.lineCounter - line counter background color
 *                    @param {string} color.editor - editor text color
 *                    @param {string} color.lineCounter - line counter text color
 *                    @param {string} editor.caret - caret color
 *                }
 *                @param {Object} light {
 *                    @param {string} background.editor - editor background color
 *                    @param {string} background.lineCounter - line counter background color
 *                    @param {string} color.editor - editor text color
 *                    @param {string} color.lineCounter - line counter text color
 *                    @param {string} editor.caret - caret color
 *                }
 *            }
 *    }
 *    @returns {Promise<Object>} {
 *                @return {function} getValue - returns current editor content (strips \u200B)
 *                @return {function} setValue - (@param {string} val) sets editor content
 *                @return {function} getCursor - returns current cursor offset
 *                @return {function} setCursor - (@param {number} pos) moves cursor to position
 *                @return {function} undo - undoes last change, restores cursor position
 *                @return {function} redo - redoes last undone change, restores cursor position
 *                @return {function} onChange - (@param {function} fn) fires on every content change with new text
 *                @return {function} onCursorMove - (@param {function} fn) fires on every cursor move with new position
 *                @return {function} isFocused - returns true if editor is currently focused
 *                @return {function} setLanguage - (@param {string} lang) switches syntax highlighting language
 *                @return {string} id - the editor instance id
 *                @return {function} delete - destroys editor, removes DOM elements and event listeners
 *    }
 *
 *    @notes
 *    - Requires Chrome/Chromium — uses EditContext API (not supported in Firefox/Safari yet)
 *    - Undo/redo stacks accessible globally via window.caret[`undoStack.${id}`]
 *    - \u200B (zero-width space) used internally for newline rendering, stripped from getValue()
 *    - Keyboard shortcuts: Ctrl+Z undo, Ctrl+Y / Ctrl+Shift+Z redo, Tab indent, Shift+Tab unindent
 * }
*/

import { createLineCounter, updateLineCounter } from "./lineCounter.js";
import { loadFont } from "./font.js";
import { createCaret } from "./caret.js";
// @ts-ignore
import hljs from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/core.js";
import languages from "./languages.js";

languages.init();

async function createTextEditor(parent, content = "", id, options = {}) {
    let onCursorMoveFn = null;
    async function isChromiumEngine() {
        if (navigator.userAgentData) {
            return navigator.userAgentData.brands.some(b => b.brand === 'Chromium');
        }
        const ua = navigator.userAgent;
        return /Chrome/i.test(ua) && !/Edg/i.test(ua) && !/OPR/i.test(ua);
    }

    async function getBrowserName() {
        if (navigator.userAgentData) {
            const brands = navigator.userAgentData.brands;
            const primaryBrand = brands.find(b => b.brand !== 'Chromium' && b.brand !== 'Not(A:Brand)') || brands[0];
            return primaryBrand.brand;
        }

        const ua = navigator.userAgent;
        if (ua.includes("Firefox")) return "Mozilla Firefox";
        if (ua.includes("SamsungBrowser")) return "Samsung Internet";
        if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
        if (ua.includes("Trident")) return "Internet Explorer";
        if (ua.includes("Edge")) return "Microsoft Edge (Legacy)";
        if (ua.includes("Edg")) return "Microsoft Edge";
        if (ua.includes("Chrome")) return "Google Chrome";
        if (ua.includes("Safari")) return "Apple Safari";
        
        return "Unknown Browser";
    }

    isChromiumEngine().then(async isChromium => {
        if (!isChromium) {
            const main = document.createElement("div");
            main.style = "display: flex; align-items: center; justify-content: center; padding: 20px; white-space: pre-wrap; margin: 0 auto;";
            main.innerHTML = `<h2>Caret (editor engine) does not yet support ${await getBrowserName()}.<br>File an issue <a href="https://github.com/PFMCODES/Caret/issues">here.</a></h2>`;
            parent.appendChild(main);
        }
    });
    if (id === undefined || id === null || (typeof id !== "string" && typeof id !== "number")) {
        console.error(`parameter 'id' of function createTextEditor must not be '${typeof id}', it must be a number or string`);
        return;
    }
    if (!parent || !(parent instanceof HTMLElement)) {
        console.error(`'parent' parameter of function 'createTextEditor' must be an HTMLElement`);
        return;
    }
    if (!("EditContext" in window)) {
        console.error("EditContext API is not supported in ", await getBrowserName());
        return;
    }

    if (!window.caret) window.caret = {};
    window.caret[`undoStack.${id}`] = [{ content, cursor: 0 }];
    window.caret[`redoStack.${id}`] = [];

    const lock = options.lock || false;
    const focusColor = options.focusColor || '#7c3aed';
    const dark = options.dark || false;
    const boxShadow = options.shadow ?? true;
    const shadowColor = options.shadowColor || "#000";
    const theme = options.theme;
    const font = options.font || {};
    let language = options.language || "plaintext";

    const themeLink = document.createElement("link");
    themeLink.rel = "stylesheet";
    themeLink.id = `caret-theme-${id}`;
    themeLink.href = options.hlTheme
        ? `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/${options.hlTheme}.css`
        : `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/hybrid.css`;
    document.head.appendChild(themeLink);

    if (!languages.registeredLanguages.includes(language)) {
        const mod = await import(`https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/${language}.js`);
        languages.registerLanguage(language, mod.default);
    }

    let fontName;
    if (!font.url && !font.name) {
        fontName = "monospace";
        parent.style.fontFamily = fontName;
    } else if (!font.url && font.name) {
        parent.style.fontFamily = font.name;
    } else {
        fontName = font.name;
        loadFont(fontName, font.url);
        parent.style.fontFamily = fontName;
    }

    let text = content;
    let selStart = content.length;
    let selEnd = content.length;
    let isFocused = false;
    let onChangeFn = null;

    const editContext = new EditContext({
        text,
        selectionStart: selStart,
        selectionEnd: selEnd
    });

    const main = document.createElement("div");
    main.editContext = editContext;
    main.tabIndex = 0;
    main.style.whiteSpace = "pre";
    main.style.height = "100%";
    main.style.width = "100%";
    main.style.minWidth = "50px";
    main.style.minHeight = "25px";
    main.style.fontSize = "14px";
    main.style.lineHeight = "1.5";
    main.style.outline = "none";
    main.style.boxSizing = "border-box";
    main.style.borderTopRightRadius = "5px";
    main.style.borderBottomRightRadius = "5px";
    main.style.transition = "all 0.2s ease-in-out";
    main.style.display = "block";
    main.style.paddingTop = "5px";
    main.style.overflowX = "auto";
    main.style.scrollbarWidth = "none";
    main.style.cursor = "text";
    main.style.userSelect = "none";
    main.style.caretColor = "transparent";

    if (boxShadow) main.style.boxShadow = `1px 1px 1px 1px ${shadowColor}`;

    if (!theme) {
        main.style.background = dark ? "#101010" : "#d4d4d4";
        main.style.color = dark ? "#fff" : "#000";
    } else {
        main.style.background = dark ? theme.dark["background.editor"] : theme.light["background.editor"];
        main.style.color = dark ? theme.dark["color.editor"] : theme.light["color.editor"];
    }

    let caretColor;
    if (options.theme) {
        caretColor = dark ? options.theme.dark["editor.caret"] : options.theme.light["editor.caret"];
    } else {
        caretColor = "#fff";
    }

    parent.style.display = "flex";
    parent.style.alignItems = "flex-start";
    parent.style.border = "2px solid #0000";
    parent.style.padding = "5px";
    parent.style.position = "relative";

    let lineCounter;
    lineCounter = await createLineCounter(parent, content.split("\n").length, id, options);

    parent.appendChild(main);

    const caret = createCaret(parent, main, { ...options, caretColor });

    function render() {
        let displayText = text;
        let od = 0;
        if (displayText.endsWith("\n")) {
            displayText += "\u200B";
            od = 1;
        }
        const highlighted = hljs.highlight(displayText, { language }).value;
        main.innerHTML = highlighted;

        updateLineCounter(lineCounter, text.trimEnd().split("\n").length + od);
        caret.update(selStart);
        if (onChangeFn) onChangeFn(text);
    }

    function saveState() {
        const stack = window.caret[`undoStack.${id}`];
        if (text !== stack[stack.length - 1]?.content) {
            stack.push({ content: text, cursor: selStart });
            window.caret[`redoStack.${id}`] = [];
        }
    }

    function undo() {
        const stack = window.caret[`undoStack.${id}`];
        const redoStack = window.caret[`redoStack.${id}`];
        if (stack.length <= 1) return;
        const current = stack.pop();
        redoStack.push(current);
        const prev = stack[stack.length - 1];
        text = prev.content;
        const diff = current.content.length - prev.content.length;
        selStart = selEnd = Math.max(0, current.cursor - diff);
        editContext.updateText(0, editContext.text.length, text);
        editContext.updateSelection(selStart, selEnd);
        render();
    }

    function redo() {
        const stack = window.caret[`undoStack.${id}`];
        const redoStack = window.caret[`redoStack.${id}`];
        if (redoStack.length === 0) return;
        const next = redoStack.pop();
        stack.push(next);
        text = next.content;
        selStart = selEnd = next.cursor;
        editContext.updateText(0, editContext.text.length, text);
        editContext.updateSelection(selStart, selEnd);
        render();
    }

    editContext.addEventListener("textupdate", (e) => {
        if (lock) return;
        text = text.slice(0, e.updateRangeStart) + e.text + text.slice(e.updateRangeEnd);
        text = text.replaceAll("\u200B", "");
        selStart = selEnd = e.selectionStart;
        editContext.updateText(0, editContext.text.length, text);
        saveState();
        render();
    });

    editContext.addEventListener("selectionchange", (e) => {
        selStart = e.selectionStart;
        selEnd = e.selectionEnd;
        caret.update(selStart);
    });

    main.addEventListener("keydown", (e) => {
        if (lock) return;

        if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z") {
            e.preventDefault();
            undo();
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "y") {
            e.preventDefault();
            redo();
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Z") {
            e.preventDefault();
            redo();
            return;
        }

        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            const indent = "    ";
            if (selStart !== selEnd) {
                const before = text.slice(0, selStart);
                const selected = text.slice(selStart, selEnd);
                const after = text.slice(selEnd);
                const indented = selected.split("\n").map(l => indent + l).join("\n");
                text = before + indented + after;
                selEnd = selStart + indented.length;
            } else {
                text = text.slice(0, selStart) + indent + text.slice(selStart);
                selStart = selEnd = selStart + indent.length;
            }
            editContext.updateText(0, editContext.text.length, text);
            editContext.updateSelection(selStart, selEnd);
            saveState();
            render();
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            const newText = text.slice(0, selStart) + "\n" + "\u200B" + text.slice(selEnd);
            text = newText;
            selStart = selEnd = selStart + 1;
            editContext.updateText(0, text.length, text);
            editContext.updateSelection(selStart, selEnd);
            saveState();
            render();
            return;
        }

        if (e.shiftKey && e.key === "Tab") {
            e.preventDefault();
            if (selStart !== selEnd) {
                const before = text.slice(0, selStart);
                const selected = text.slice(selStart, selEnd);
                const after = text.slice(selEnd);
                const unindented = selected.split("\n").map(l =>
                    l.startsWith("    ") ? l.slice(4) :
                    l.startsWith("\t") ? l.slice(1) : l
                ).join("\n");
                text = before + unindented + after;
                selEnd = selStart + unindented.length;
            } else {
                const lineStart = text.lastIndexOf("\n", selStart - 1) + 1;
                const linePrefix = text.slice(lineStart, lineStart + 4);
                if (linePrefix === "    ") {
                    text = text.slice(0, lineStart) + text.slice(lineStart + 4);
                    selStart = selEnd = Math.max(lineStart, selStart - 4);
                }
            }
            editContext.updateText(0, editContext.text.length, text);
            editContext.updateSelection(selStart, selEnd);
            saveState();
            render();
            return;
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            selStart = selEnd = Math.max(0, selStart - 1);
            editContext.updateSelection(selStart, selEnd);
            caret.update(selStart);
            if (onCursorMoveFn) onCursorMoveFn(selStart);
            return;
        }

        if (e.key === "ArrowRight") {
            e.preventDefault();
            selStart = selEnd = Math.min(text.length, selStart + 1);
            editContext.updateSelection(selStart, selEnd);
            caret.update(selStart);
            if (onCursorMoveFn) onCursorMoveFn(selStart);
            return;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            const lineStart = text.lastIndexOf("\n", selStart - 1) + 1;
            const prevLineEnd = lineStart - 1;
            const prevLineStart = text.lastIndexOf("\n", prevLineEnd - 1) + 1;
            const col = selStart - lineStart;
            const prevLineLength = prevLineEnd - prevLineStart;
            selStart = selEnd = prevLineStart + Math.min(col, prevLineLength);
            editContext.updateSelection(selStart, selEnd);
            caret.update(selStart);
            if (onCursorMoveFn) onCursorMoveFn(selStart);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const lineStart = text.lastIndexOf("\n", selStart - 1) + 1;
            const nextLineStart = text.indexOf("\n", selStart) + 1;
            const nextLineEnd = text.indexOf("\n", nextLineStart);
            const finalNextLineEnd = nextLineEnd === -1 ? text.length : nextLineEnd;
            const col = selStart - lineStart;
            const nextLineLength = finalNextLineEnd - nextLineStart;
            selStart = selEnd = nextLineStart + Math.min(col, nextLineLength);
            editContext.updateSelection(selStart, selEnd);
            caret.update(selStart);
            if (onCursorMoveFn) onCursorMoveFn(selStart);
            return;
        }
    });

    main.addEventListener("paste", (e) => {
        if (lock) return;
        e.preventDefault();
        const pasteText = e.clipboardData.getData("text/plain");
        text = text.slice(0, selStart) + pasteText + text.slice(selEnd);
        selStart = selEnd = selStart + pasteText.length;
        editContext.updateText(0, editContext.text.length, text);
        editContext.updateSelection(selStart, selEnd);
        saveState();
        render();
    });

    main.addEventListener("focus", () => {
        isFocused = true;
        parent.style.border = `2px solid ${focusColor}`;
        parent.style.boxShadow = "none";
        caret.show();
        caret.update(selStart);
    });

    main.addEventListener("blur", () => {
        isFocused = false;
        parent.style.border = "2px solid #0000";
        if (boxShadow) parent.style.boxShadow = `1px 1px 1px 1px ${shadowColor}`;
        caret.hide();
    });

    main.addEventListener("click", (e) => {
        main.focus();
        const range = document.caretRangeFromPoint(e.clientX, e.clientY);
        if (!range) return;

        let offset = 0;
        let remaining = 0;
        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (node === range.startContainer) {
                offset = remaining + range.startOffset;
                break;
            }
            remaining += node.textContent.length;
        }

        selStart = selEnd = offset;
        editContext.updateSelection(selStart, selEnd);
        caret.update(selStart);
    });

    render();

    return {
        getValue: () => text.replaceAll("\u200B", ""),
        getCursor: () => selStart,
        setCursor: (pos) => {
            selStart = selEnd = Math.max(0, Math.min(pos, text.length));
            editContext.updateSelection(selStart, selEnd);
            caret.update(selStart);
        },
        undo: undo,
        redo: redo,
        setValue: (val) => {
            text = val.replaceAll("\u200B", "");
            selStart = selEnd = text.length;
            editContext.updateText(0, editContext.text.length, text);
            editContext.updateSelection(selStart, selEnd);
            render();
        },
        id: options.id,
        onChange: (fn) => { onChangeFn = fn; },
        isFocused: () => isFocused,
        setLanguage: async (lang) => {
            if (!languages.registeredLanguages.includes(lang)) {
                const mod = await import(`https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/${lang}.js`);
                languages.registerLanguage(lang, mod.default);
            }
            language = lang;
            render();
        },
        delete: () => {
            parent.removeChild(main);
            parent.removeChild(lineCounter);
            caret.destroy();
            document.head.removeChild(themeLink);
            parent.style = "";
        }
    };
}

export { createTextEditor }
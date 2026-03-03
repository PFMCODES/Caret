// @ts-ignore
import hljs from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/core.js"; // Use default export
import languages from "./langauges.ts";

languages.init();

async function createEditor(editor: HTMLElement, data: any) {
    const editor1 = document.createElement("textarea");
    const highlighted = document.createElement("pre");
    const caret = document.createElement("div");
    const measureCanvas = document.createElement("canvas");
    const measureCtx: any = measureCanvas.getContext("2d");
    const isDark = data.theme && (data.theme.includes("dark") || data.theme.includes("night"));
    const caretColor = isDark ? "#fff" : "#7116d8";
    const lineColor = isDark ? "#fff" : "#000";
    const lineCounter = document.createElement("div");

    const i = Math.random().toString(16).slice(2);
    editor1.id = `Caret-textarea-${i}`;
    highlighted.id = `Caret-highlighted-${i}`;
    caret.id = `Caret-caret-${i}`;
    lineCounter.id = `Caret-lineCounter-${i}`;
    editor1.classList.add("Caret-textarea");
    highlighted.classList.add("Caret-highlighted");
    caret.classList.add("Caret-caret");
    lineCounter.classList.add("Caret-lineCounter");
    editor1.classList.add("dark");
    highlighted.classList.add("dark");
    caret.classList.add("dark");
    lineCounter.classList.add("dark");
    editor1.style.backgroundColor = isDark ? "#222" : "#fff";
    let code = data.value || "";
    let language = data.language;
    let theme = data.theme;
    let lock = data.readOnly || false;
    if (lock) {
        editor1.readOnly = true;
    }
    if (!languages.registeredLanguages.includes(language)) {
        const mod = await import(`https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/${language}.js`);
        languages.registerLanguage(language, mod.default);
        languages.registeredLanguages.push(language);
    }
    if (theme) {
        let themeLink = document.getElementById("Caret-theme")
        if (!themeLink) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.id = "Caret-theme";
            link.href = `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/${theme}.css`;
            document.head.appendChild(link);
        } else {
            // @ts-ignore
            themeLink.href = `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/${theme}.css`;
        }
    } else {
        let themeLink  = document.getElementById("Caret-theme");
        if (!themeLink) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.id = "Caret-theme";
            link.href = `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/hybrid.css`;
            document.head.appendChild(link);
        } else {
            // @ts-ignore
            themeLink.href = `./highlight.js/styles/hybrid.css`;
        }
    }
    editor1.spellcheck = false;
    (editor1 as any).autocapitalize = "off";
    (editor1 as any).autocomplete = "off";
    (editor1 as any).autocorrect = false;
    editor.style = "position: relative; width: 600px; height: 300px; overflow: hidden; /* 👈 CRITICAL */ font-size: 14px;"   
    if (code && editor && editor1 && language && highlighted) {
        editor1.style.paddingTop = "-9px";
        editor1.value = data.value;
        highlighted.innerHTML = await _render(data.value, language, editor1);
    }
    const keyDown = async (e: any) => {
        if (e.key !== "Tab") return;

        e.preventDefault();

        const value = editor1.value;
        const start = editor1.selectionStart;
        const end = editor1.selectionEnd;

        const indent = "    ";

        // Find line start & end
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const lineEnd = value.indexOf("\n", end);
        const finalLineEnd = lineEnd === -1 ? value.length : lineEnd;

        const block = value.slice(lineStart, finalLineEnd);
        const lines = block.split("\n");

        let newLines;
        let delta = 0;

        if (e.shiftKey) {
            // UNINDENT
            newLines = lines.map(line => {
                if (line.startsWith(indent)) {
                    delta -= indent.length;
                    return line.slice(indent.length);
                }
                if (line.startsWith("\t")) {
                    delta -= 1;
                    return line.slice(1);
                }
                return line;
            });
        } else {
            // INDENT
            newLines = lines.map(line => indent + line);
            delta = indent.length;
        }

        const newBlock = newLines.join("\n");

        editor1.value =
            value.slice(0, lineStart) +
            newBlock +
            value.slice(finalLineEnd);

        // Fix selection
        editor1.selectionStart = start + delta;
        editor1.selectionEnd =
            end + delta * newLines.length;

        highlighted.innerHTML = await _render(editor1.value, language, editor1);
        updateLineNumbers();
        updateCaret();
    }
    editor1.addEventListener("keydown", keyDown);
    editor.appendChild(lineCounter);
    editor.appendChild(highlighted);
    editor.appendChild(editor1);
    editor.appendChild(caret);

    function updateFontMetrics() {
        const style = getComputedStyle(editor1);
        measureCtx.font = `${style.fontSize} ${style.fontFamily}`;
    }

    function updateLineNumbers() {
        const lines = editor1.value.split("\n");
        const wrapMap = getWrapMap(editor1.value, 71);

        let html = "";
        lines.forEach((line, i) => {
            const visualLines = wrapMap[i] || 1;
            // first visual line gets the number
            html += `<div class="Caret-lineCounter-number" style="color: ${lineColor}; height: calc(1.5em * ${visualLines})">${i + 1}</div>`;
        });

        lineCounter.innerHTML = html;
    }

    highlighted.style.paddingTop = "12px"

    function getFontMetrics() {
        const metrics = measureCtx.measureText("Mg");
        return {
            ascent: metrics.actualBoundingBoxAscent,
            descent: metrics.actualBoundingBoxDescent,
            height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        };
    }
    const focus = () => {
        caret.style.opacity = "1";
        caret.style.background = caretColor;
    };

    editor1.addEventListener("focus", focus);

    const blur = () => {
        caret.style.opacity = "0";
    };

    editor1.addEventListener("blur", blur);

    function getVisualRow(text: string, wrapAt: number) {
        // simulate exactly what wrapCode does, but track caret position
        const words = text.split(" ");
        let currentLine = "";
        let visualRow = 0;

        for (let w = 0; w < words.length; w++) {
            const word = words[w];
            const isLast = w === words.length - 1;
            const test = currentLine ? currentLine + " " + word : word;

            if (test.length > wrapAt && currentLine !== "") {
                visualRow++;
                currentLine = word;
            } else {
                currentLine = test;
            }
        }

        return { row: visualRow, lineText: currentLine };
    }

    function updateCaret() {
        const start = editor1.selectionStart;
        const text = editor1.value.slice(0, start);

        const lines = text.split("\n");
        const lineIndex = lines.length - 1;
        const currentLineText = lines[lineIndex].replace(/\t/g, "  ");
        

        const style = getComputedStyle(editor1);
        const paddingLeft = parseFloat(style.paddingLeft);
        const paddingTop = parseFloat(style.paddingTop);
        const lineHeight = parseFloat(style.lineHeight) || 20;

        updateFontMetrics();
        const ascent = measureCtx.measureText("Mg").actualBoundingBoxAscent;

        const WRAP_AT = 71;

        // count visual rows from all previous lines
        let totalVisualRows = 0;
        for (let i = 0; i < lineIndex; i++) {
            const l = lines[i].replace(/\t/g, "  ");
            const { row } = getVisualRow(l, WRAP_AT);
            totalVisualRows += row + 1;
        }

        const { row, lineText } = getVisualRow(currentLineText, WRAP_AT);
        const onWrappedLine = row > 0;

        totalVisualRows += row;

        if (onWrappedLine) {
            // on wrapped line - X is just the text on this visual row
            
            caret.style.left = paddingLeft + measureCtx.measureText(lineText).width + "px";
        } else {
            // on original line - X is full line text width
            
            caret.style.left = paddingLeft + measureCtx.measureText(lineText.trimEnd()).width + "px";
        }

        caret.style.top = -9 + paddingTop + totalVisualRows * lineHeight + (lineHeight - ascent) + "px";
        caret.style.height = `${lineHeight - 5}px`;
    }

    const input = async () => {
        caret.style.opacity = "1";
        highlighted.innerHTML = await _render(editor1.value, language, editor1);
        updateLineNumbers();
        updateCaret();
    };

    const onDidChangeModelContent = (fn: any) => {
        editor1.addEventListener("input", fn)
    }

    editor1.addEventListener("input", input);
    const scroll = async () => {
        const x = -editor1.scrollLeft;
        const y = -editor1.scrollTop;
        highlighted.innerHTML = await _render(editor1.value, language, editor1);
        highlighted.style.transform = `translateY(${y}px)`;
        caret.style.transform = `translateY(${y}px)`;
        lineCounter.style.transform = `translateY(${y}px)`;
    };
    editor1.addEventListener("scroll", scroll);

    updateFontMetrics();
    getFontMetrics();

    editor1.addEventListener("click", updateCaret);
    editor1.addEventListener("keyup", updateCaret);
    
    // Initial caret position
    updateLineNumbers();
    updateCaret();
    
    // Focus the editor
    editor1.focus();
    function destroy() {
        editor1.removeEventListener('click', updateCaret);
        editor1.removeEventListener('keyup', updateCaret);
        editor1.removeEventListener('scroll', scroll);
        editor1.removeEventListener('keydown', keyDown);
        editor.innerHTML = "";
    }
    async function refresh() {
        highlighted.innerHTML = await _render(editor1.value, language, editor1);
        updateLineNumbers();
        updateCaret();
    }
    function getValue() {
        return editor1.value;
    }
    function setValue(i: string) {
        editor1.value = i;
        refresh();
    }
    async function setLanguage(l: string) {
        if (!languages.registeredLanguages.includes(l)) {
            if (l === "html" || l === "svg") {
                language = "xml";
                l = "xml";
            }
            const mod = await import(`https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/${l}.js`);
            languages.registerLanguage(l, mod)
        }
        language = l;
        refresh();
    }
    return {
        getValue,
        setValue,
        focus,
        setLanguage,
        destroy,
        onDidChangeModelContent,
    };
}

function wrapCode(code: string, wrapAt = 71) {
    return code.split("\n").map(line => {
        if (line.length <= wrapAt) return line;

        const indent = line.match(/^(\s*)/)?.at(1) ?? "";
        const words = line.trimStart().split(" ");
        const wrappedLines = [];
        let currentLine = indent; // first line keeps indent
        let isFirstLine = true;

        for (const word of words) {
            if (word.length > wrapAt) {
                if (currentLine.trim()) {
                    wrappedLines.push(currentLine);
                    currentLine = "";
                    isFirstLine = false;
                }
                for (let i = 0; i < word.length; i += wrapAt) {
                    wrappedLines.push(word.slice(i, i + wrapAt));
                }
                continue;
            }

            const test = currentLine ? currentLine + " " + word : word;
            if (test.length > wrapAt) {
                wrappedLines.push(currentLine);
                currentLine = word; // no indent on continuation lines
                isFirstLine = false;
            } else {
                currentLine = test;
            }
        }

        if (currentLine) wrappedLines.push(currentLine);
        return wrappedLines.join("\n");
    }).join("\n");
}

function getWrapMap(code: string, wrapAt = 71) {
    const wrapMap: any = []; // wrapMap[originalLineIndex] = number of visual lines it produces

    code.split("\n").forEach((line, i) => {
        if (line.length <= wrapAt) {
            wrapMap[i] = 1; // no wrap, 1 visual line
            return;
        }

        const indent = line.match(/^(\s*)/)?.at(1) ?? "";
        const words = line.trimStart().split(" ");
        let currentLine = indent;
        let visualLines = 1;

        for (const word of words) {
            if (word.length > wrapAt) {
                if (currentLine.trim()) {
                    visualLines++;
                    currentLine = "";
                }
                visualLines += Math.floor(word.length / wrapAt);
                continue;
            }

            const test = currentLine ? currentLine + " " + word : word;
            if (test.length > wrapAt) {
                visualLines++;
                currentLine = word;
            } else {
                currentLine = test;
            }
        }

        wrapMap[i] = visualLines;
    });

    return wrapMap;
}

function escapeHtml(str: string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

async function _render(code: string, language: any, editor: HTMLElement) {
    // If no editor context provided, just highlight everything (initial load)
    if (!editor) {
        return hljs.highlight(code, { language }).value;
    }
    const scrollTop = editor.scrollTop;
    const scrollBottom = scrollTop + editor.clientHeight;
    const style = getComputedStyle(editor);
    const lineHeight = parseFloat(style.lineHeight);
    
    // Calculate visible line range
    const startLine = Math.floor(scrollTop / lineHeight);
    const endLine = Math.ceil(scrollBottom / lineHeight);
    
    const lines = code.split("\n");
    
    // Add buffer (render extra lines above/below for smooth scrolling)
    const bufferLines = 10;
    const visibleStart = Math.max(0, startLine - bufferLines) || 0;
    const visibleEnd = Math.min(lines.length, endLine + bufferLines) || 0;
    
    // Split into three sections
    const beforeLines = lines.slice(0, visibleStart);
    const visibleLines: any = lines.slice(visibleStart, visibleEnd);
    const afterLines = lines.slice(visibleEnd);
    
    // Only highlight visible portion
    let wrappedCode;
    if (visibleLines.length === 0) {
        wrappedCode = wrapCode(code, 68);
    }
    else {
        wrappedCode = wrapCode(visibleLines.join("\n"), 71)
    }
    const highlightedVisible = hljs.highlight(wrappedCode, { language }).value;
    // Plain text for non-visible areas (no highlighting = faster)
    if (highlightedVisible.trim() === "") {
        return hljs.highlight(escapeHtml(code), { language }).value;
    }
    const beforeHTML = "\n".repeat(beforeLines.length);
    const afterHTML = "\n".repeat(afterLines.length);
    return beforeHTML + highlightedVisible + afterHTML;
}

const editor = {
    createEditor
};

export default editor;

/*
createEditor(editor, data): creates the main editor using HTML elements like textarea, pre, div etc.
    Returns an object with the following methods:
        getValue() -> returns the current value from the editor
        setValue(val) -> sets a value to the editor
        focus() -> focuses the editor
        setLanguage(lang) -> changes the syntax highlighting language
        destroy() -> destroys the editor and removes all event listeners
        onDidChangeModelContent(fn) -> fires a callback whenever the editor content changes

Internal functions:
        _render(code, language, editor) -> virtual renderer, only highlights visible lines for performance
        wrapCode(code, wrapAt) -> wraps long lines at word boundaries
        getWrapMap(code, wrapAt) -> returns an array mapping each line to its visual line count
        escapeHtml(str) -> escapes HTML special characters
        updateCaret() -> updates the caret position using canvas font metrics
        updateLineNumbers() -> re-renders line numbers, accounting for wrapped lines
        updateFontMetrics() -> updates the canvas font to match the textarea's computed style
        getFontMetrics() -> returns ascent, descent and height of the current font
        getVisualRow(text, wrapAt) -> returns which visual row and remaining text the caret is on
*/
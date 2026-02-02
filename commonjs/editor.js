const hljs = require("../highlight.js/es/core.js"); // Use default export
const languages = require("./languages.js");

languages.init();

async function createEditor(editor, data) {
    const editor1 = document.createElement("textarea");
    const highlighted = document.createElement("pre");
    const caret = document.createElement("div");
    const measureCanvas = document.createElement("canvas");
    const measureCtx = measureCanvas.getContext("2d");
    const isDark = data.theme && (data.theme.includes("dark") || data.theme.includes("night"));
    const caretColor = isDark ? "#fff" : "#7116d8";
    const lineColor = isDark ? "#fff" : "#000";
    const lineCounter = document.createElement("div");

    editor1.id = "Caret-textarea";
    highlighted.id = "Caret-highlighted";
    caret.id = "Caret-caret";
    lineCounter.id = "Caret-lineCounter";
    let code = data.value || "";
    let language = data.language;
    let theme = data.theme;
    if (!languages.registeredlanguages.includee(language)) {
        languages.registerlanguage(language);
    }
    if (theme) {
        let themeLink = document.getElementById("Caret-theme")
        if (!themeLink) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.id = "Caret-theme";
            link.href = `./highlight.js/styles/${theme}.css`;
            document.head.appendChild(link);
        } else {
            themeLink.href = `./highlight.js/styles/${theme}.css`;
        }
    } else {
        let themeLink  = document.getElementById("Caret-theme");
        if (!themeLink) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.id = "Caret-theme";
            link.href = `./highlight.js/styles/hybrid.css`;
            document.head.appendChild(link);
        } else {
            themeLink.href = `./highlight.js/styles/hybrid.css`;
        }
    }
    editor1.spellcheck = false;
    editor1.autocapitalize = "off";
    editor1.autocomplete = "off";
    editor1.autocorrect = "off";
    editor.style = "position: relative; width: 600px; height: 300px; overflow: hidden; /* 👈 CRITICAL */ font-size: 14px;"   
    if (code) {
        editor1.value = code;
        editor1.style.paddingTop = "-9px";
        highlighted.innerHTML = hljs.highlight(code, { language: language }).value;
    }
    const keyDown = (e) => {
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

        highlighted.innerHTML = hljs.highlight(editor1.value, { language }).value;
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
        const lineCount = editor1.value.split("\n").length;

        let html = "";
        for (let i = 1; i <= lineCount; i++) {
            html += `<div class="Caret-lineCounter-number" style="color: ${lineColor}">${i}</div>`;
        }

        lineCounter.innerHTML = html;
    }


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

    function updateCaret() {
        const start = editor1.selectionStart;
        const text = editor1.value.slice(0, start);

        const lines = text.split("\n");
        const lineIndex = lines.length - 1;
        const lineText = lines[lineIndex].replace(/\t/g, "  ");

        const style = getComputedStyle(editor1);
        const paddingLeft = parseFloat(style.paddingLeft);
        const paddingTop = parseFloat(style.paddingTop);
        const lineHeight = parseFloat(style.lineHeight);

        updateFontMetrics();
        const metrics = measureCtx.measureText("Mg");
        const ascent = metrics.actualBoundingBoxAscent;

        caret.style.left =
            paddingLeft + measureCtx.measureText(lineText).width + "px";
        caret.style.top =
           -9 +
            paddingTop +
            lineIndex * lineHeight +
            (lineHeight - ascent) +
            "px";

        caret.style.height = `${lineHeight}px`;
    }
    const input = () => {
        caret.style.opacity = "1";
        highlighted.innerHTML = hljs.highlight(editor1.value, { language: language }).value;
        updateLineNumbers();
        updateCaret();
    };
    editor1.addEventListener("input", input);
    const scroll = () => {
        const x = -editor1.scrollLeft;
        const y = -editor1.scrollTop;

        highlighted.style.transform = `translate(${x}px, ${y}px)`;
        caret.style.transform = `translate(${x}px, ${y}px)`;
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
    function refresh() {
        highlighted.innerHTML = hljs.highlight(editor1.value, { language }).value;
        updateLineNumbers();
        updateCaret();
    }
    function getValue() {
        return editor1.value;
    }
    function setValue(i) {
        editor1.value = i;
        refresh();
    }
    function setLanguage(l) {
        language = l;
        if (!languages.registeredlanguages.includee(language)) {
            languages.registerlanguage(language);
        }
        refresh();
    }
    return {
        getValue,
        setValue,
        focus,
        setLanguage,
        destroy
    };
}

const editor = {
    createEditor
};

module.exports = editor;

/* 

createEditor: creates the main editor, using html Elements like, textarea and etc.
                refresh: refreshs the editor
                getValue: return the current value from the editor
                setValue: sets a certain value to the editor's value
                focus: focusses the editor
                destroy: destroys and removeEventListeners
                updateCaret: updates the caret positon, height and other metrics using math
                updateLineNumbers: just add new line numbers
                getFontMetrics: returns back the font's metrics like height
                updateFontMetrics: update the fontMetrics

*/
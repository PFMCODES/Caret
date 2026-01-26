import hljs from './highlight.js/es/core.js'; // Use default export
import languages from './languages.js'

languages.init();

async function createEditor(editor, data) {
    const editor1 = document.createElement('textarea');
    const highlighted = document.createElement('pre');
    const caret = document.createElement("div");
    const measureCanvas = document.createElement("canvas");
    const measureCtx = measureCanvas.getContext("2d");
    const isDark = data.theme && (data.theme.includes('dark') || data.theme.includes('night'));
    const caretColor = isDark ? "#000" : "#7116d8";

    editor1.id = 'lexius-textarea';
    highlighted.id = 'lexius-highlighted';
    caret.id = 'lexius-caret';
    let code = data.value || "";
    let language = data.language;
    let theme = data.theme;
    if (theme) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.id = "Caret-theme";
        link.href = `./highlight.js/styles/${theme}.css`;
        document.head.appendChild(link);
    } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.id = "Caret-theme";
        link.href = `./highlight.js/styles/hybrid.css`;
        document.head.appendChild(link);
    }
    editor1.spellcheck = false;
    editor1.autocapitalize = "off";
    editor1.autocomplete = "off";
    editor1.autocorrect = "off";
    editor.style = "position: relative; width: 600px; height: 300px; overflow: hidden; /* 👈 CRITICAL */ font-size: 18px;"   
    if (code) {
        editor1.value = code;
        highlighted.innerHTML = hljs.highlight(code, { language: language }).value;
    }

    editor.appendChild(highlighted);
    editor.appendChild(editor1);
    editor.appendChild(caret);

    function updateFontMetrics() {
        const style = getComputedStyle(editor1);
        measureCtx.font = `${style.fontSize} ${style.fontFamily}`;
    }

    function getFontMetrics() {
        const metrics = measureCtx.measureText("Mg");
        return {
            ascent: metrics.actualBoundingBoxAscent,
            descent: metrics.actualBoundingBoxDescent,
            height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        };
    }

    editor1.addEventListener("focus", () => {
        caret.style.opacity = "1";
        caret.style.background = caretColor;
    });

    editor1.addEventListener("blur", () => {
        caret.style.opacity = "0";
    });

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
        -11.5 +
            paddingTop +
            lineIndex * lineHeight +
            (lineHeight - ascent) +
            "px";

        caret.style.height = ascent + "px";
    }

    editor1.addEventListener('input', () => {
        caret.style.background = "#000";
        highlighted.innerHTML = hljs.highlight(editor1.value, { language: language }).value;
        updateCaret();
    });

    editor1.addEventListener("scroll", () => {
        const x = -editor1.scrollLeft;
        const y = -editor1.scrollTop;

        highlighted.style.transform = `translate(${x}px, ${y}px)`;
        caret.style.transform = `translate(${x}px, ${y}px)`;
    });

    updateFontMetrics();
    getFontMetrics();

    editor1.addEventListener("click", updateCaret);
    editor1.addEventListener("keyup", updateCaret);
    
    // Initial caret position
    updateCaret();
    
    // Focus the editor
    editor1.focus();
}

const editor = {
    createEditor
};

export default editor;
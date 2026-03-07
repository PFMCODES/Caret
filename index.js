import editor from "./editor.js";
import theme from "./theme.js";
import language from "./langauges.js";

const Caret = {
    editor,
    theme,
    language
}
export default Caret;

/* 
Caret.editor: 
    createEditor() -> backbone of caret, handles ui and abstractions
Caret.theme:
    setTheme() -> changes the current highlight.js theme
Caret.langauge:
    init() -> initializes default avaible languages
    registerLanguage() -> registers a new languages
    registeredLangauges[List]: has all the langauges registered
    hljs: the highlight.js module
*/
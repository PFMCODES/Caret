import editor from "./editor.ts";
import theme from "./theme.ts";
import language from "./langauges.ts";

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
const javascript = require("../highlight.js/es/languages/javascript.js");
const xml = require("../highlight.js/es/languages/xml.js");
const css = require("../highlight.js/es/languages/css.js");
const python = require("../highlight.js/es/languages/python.js");
const java = require("../highlight.js/es/languages/java.js");
const csharp = require("../highlight.js/es/languages/csharp.js");
const cpp = require("../highlight.js/es/languages/cpp.js");
const ruby = require("../highlight.js/es/languages/ruby.js");
const php = require("../highlight.js/es/languages/php.js");
const go = require("../highlight.js/es/languages/go.js");
const c = require("../highlight.js/es/languages/c.js");
const rust = require("../highlight.js/es/languages/rust.js");
const kotlin = require("../highlight.js/es/languages/kotlin.js");
const swift = require("../highlight.js/es/languages/swift.js");
const typescript = require("../highlight.js/es/languages/typescript.js");
const json = require("../highlight.js/es/languages/json.js");
const bash = require("../highlight.js/es/languages/bash.js");
const plaintext = require("../highlight.js/es/languages/plaintext.js");
const hljs = require("../highlight.js/es/core.js");

let registeredLanguages = [];

function init() {
    // Register all languages
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("xml", xml);
    hljs.registerLanguage("css", css);
    hljs.registerLanguage("html", xml);
    hljs.registerLanguage("python", python);
    hljs.registerLanguage("java", java);
    hljs.registerLanguage("csharp", csharp);
    hljs.registerLanguage("cpp", cpp);
    hljs.registerLanguage("ruby", ruby);
    hljs.registerLanguage("php", php);
    hljs.registerLanguage("go", go);
    hljs.registerLanguage("c", c);
    hljs.registerLanguage("rust", rust);
    hljs.registerLanguage("kotlin", kotlin);
    hljs.registerLanguage("swift", swift);
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("json", json);
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("shell", bash);
    hljs.registerLanguage("sh", bash);
    hljs.registerLanguage("plaintext", plaintext);
    registeredLanguages = [
        "javascript",
        "js",
        "xml",
        "html",
        "svg",
        "python",
        "java",
        "csharp",
        "cpp",
        "ruby",
        "php",
        "go",
        "c",
        "rust",
        "kotlin",
        "swift",
        "typescript",
        "json",
        "bash",
        "shell",
        "sh",
        "plaintext"
    ]
}

function registerLanguage(name, definition) {
    hljs.registerLanguage(name, definition);
    if (!registeredLanguages.includes(name)) {
        registeredLanguages.push(name);
    }
}

const languages = {
    init,
    registeredLanguages,
    registerLanguage,
    hljs
}

module.exports = languages;

/* 

registeredLannguage: added for the editor.js can check if the langauge provided already is regsitered or not


init: just registers some languages and updates the registeredLangauges variable

registerLanguage: just registers a language

*/
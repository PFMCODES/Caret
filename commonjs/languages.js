const javascript = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/javascript.js");
const xml = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/xml.js");
const css = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/css.js");
const python = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/python.js");
const java = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/java.js");
const csharp = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/csharp.js");
const cpp = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/cpp.js");
const ruby = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/ruby.js");
const php = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/php.js");
const go = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/go.js");
const c = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/c.js");
const rust = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/rust.js");
const kotlin = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/kotlin.js");
const swift = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/swift.js");
const typescript = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/typescript.js");
const json = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/json.js");
const bash = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/bash.js");
const plaintext = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/plaintext.js");
const hljs = require("https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/core.js");

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
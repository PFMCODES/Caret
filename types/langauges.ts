// @ts-ignore
import javascript from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/javascript.js";
// @ts-ignore
import xml from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/xml.js";
// @ts-ignore
import css from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/css.js";
// @ts-ignore
import python from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/python.js";
// @ts-ignore
import java from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/java.js";
// @ts-ignore
import csharp from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/csharp.js";
// @ts-ignore
import cpp from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/cpp.js";
// @ts-ignore
import ruby from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/ruby.js";
// @ts-ignore
import php from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/php.js";
// @ts-ignore
import go from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/go.js";
// @ts-ignore
import c from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/c.js";
// @ts-ignore
import rust from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/rust.js";
// @ts-ignore
import kotlin from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/kotlin.js";
// @ts-ignore
import swift from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/swift.js";
// @ts-ignore
import typescript from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/typescript.js";
// @ts-ignore
import json from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/json.js";
// @ts-ignore
import bash from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/bash.js";
// @ts-ignore
import plaintext from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/plaintext.js";
// @ts-ignore
import hljs from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/core.js";

let registeredLanguages: Array<any> = [];

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

export function registerAliases(a: any, b: any) {
    hljs.registerAliases(a, b)
}

function registerLanguage(name: string, definition: any) {
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

export default languages;

/* 
registeredLannguage: added for the editor.js can check if the langauge provided already is regsitered or not
init: just registers some languages and updates the registeredLangauges variable
registerLanguage: just registers a language
registerAliases: basically registers a nickname or second name for an language
*/
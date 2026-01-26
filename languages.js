import javascript from './highlight.js/es/languages/javascript.js';
import xml from './highlight.js/es/languages/xml.js';
import css from './highlight.js/es/languages/css.js';
import python from "./highlight.js/es/languages/python.js";
import java from "./highlight.js/es/languages/java.js";
import csharp from "./highlight.js/es/languages/csharp.js";
import cpp from "./highlight.js/es/languages/cpp.js";
import ruby from "./highlight.js/es/languages/ruby.js";
import php from "./highlight.js/es/languages/php.js";
import go from "./highlight.js/es/languages/go.js";
import c from "./highlight.js/es/languages/c.js";
import rust from "./highlight.js/es/languages/rust.js";
import kotlin from "./highlight.js/es/languages/kotlin.js";
import swift from "./highlight.js/es/languages/swift.js";
import typescript from "./highlight.js/es/languages/typescript.js";
import json from "./highlight.js/es/languages/json.js";
import bash from "./highlight.js/es/languages/bash.js";
import plaintext from "./highlight.js/es/languages/plaintext.js";
import hljs from './highlight.js/es/core.js';

export function init() {
    // Register all languages
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('html', xml);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('csharp', csharp);
    hljs.registerLanguage('cpp', cpp);
    hljs.registerLanguage('ruby', ruby);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('go', go);
    hljs.registerLanguage('c', c);
    hljs.registerLanguage('rust', rust);
    hljs.registerLanguage('kotlin', kotlin);
    hljs.registerLanguage('swift', swift);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('shell', bash);
    hljs.registerLanguage('sh', bash);
    hljs.registerLanguage('plaintext', plaintext)
}

export default { init, registerLanguage: hljs.registerLanguage.bind(hljs), hljs };
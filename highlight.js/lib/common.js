import hljs from './core.js';

hljs.registerLanguage('xml', import('./languages/xml'));
hljs.registerLanguage('bash', import('./languages/bash'));
hljs.registerLanguage('c', import('./languages/c'));
hljs.registerLanguage('cpp', import('./languages/cpp'));
hljs.registerLanguage('csharp', import('./languages/csharp'));
hljs.registerLanguage('css', import('./languages/css'));
hljs.registerLanguage('markdown', import('./languages/markdown'));
hljs.registerLanguage('diff', import('./languages/diff'));
hljs.registerLanguage('ruby', import('./languages/ruby'));
hljs.registerLanguage('go', import('./languages/go'));
hljs.registerLanguage('graphql', import('./languages/graphql'));
hljs.registerLanguage('ini', import('./languages/ini'));
hljs.registerLanguage('java', import('./languages/java'));
hljs.registerLanguage('javascript', import('./languages/javascript'));
hljs.registerLanguage('json', import('./languages/json'));
hljs.registerLanguage('kotlin', import('./languages/kotlin'));
hljs.registerLanguage('less', import('./languages/less'));
hljs.registerLanguage('lua', import('./languages/lua'));
hljs.registerLanguage('makefile', import('./languages/makefile'));
hljs.registerLanguage('perl', import('./languages/perl'));
hljs.registerLanguage('objectivec', import('./languages/objectivec'));
hljs.registerLanguage('php', import('./languages/php'));
hljs.registerLanguage('php-template', import('./languages/php-template'));
hljs.registerLanguage('plaintext', import('./languages/plaintext'));
hljs.registerLanguage('python', import('./languages/python'));
hljs.registerLanguage('python-repl', import('./languages/python-repl'));
hljs.registerLanguage('r', import('./languages/r'));
hljs.registerLanguage('rust', import('./languages/rust'));
hljs.registerLanguage('scss', import('./languages/scss'));
hljs.registerLanguage('shell', import('./languages/shell'));
hljs.registerLanguage('sql', import('./languages/sql'));
hljs.registerLanguage('swift', import('./languages/swift'));
hljs.registerLanguage('yaml', import('./languages/yaml'));
hljs.registerLanguage('typescript', import('./languages/typescript'));
hljs.registerLanguage('vbnet', import('./languages/vbnet'));
hljs.registerLanguage('wasm', import('./languages/wasm'));

hljs.HighlightJS = hljs
hljs.default = hljs
export default hljs;
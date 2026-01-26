declare module 'caret' {
  const Caret: {
    editor: typeof import('./editor.js');
    theme: typeof import('./theme.js');
    language: typeof import('./languages.js');
  };

  export default Caret;
}
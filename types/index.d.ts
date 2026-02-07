declare module "@pfmcodes/caret" {
  interface CaretEditorAPI {
    createEditor(
      el: HTMLElement,
      data: any
    ): Promise<{
      getValue(): string;
      setValue(v: string): void;
      focus(): void;
      setLanguage(l: string): Promise<void>;
      destroy(): void;
    }>;
  }

  interface CaretThemeApi {
    setTheme(name: string): void;
    removeTheme(name: string): void;
  }

  interface CaretLanguageApi {
    registeredLanguages: string[];
    init(): void;
    registerLanguage(name: string, definition: any): void;
    hljs: any;
  }

  const Caret: {
    editor: CaretEditorAPI;
    theme: CaretThemeApi;
    language: CaretLanguageApi;
  };

  export default Caret;
}

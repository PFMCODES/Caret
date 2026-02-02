/**
 * Caret Editor - TypeScript Type Definitions
 * A lightweight code editor with syntax highlighting and custom caret rendering
 */

/**
 * Configuration options for creating a Caret editor instance
 */
export interface CaretEditorConfig {
  /**
   * Initial code content to display in the editor
   * @default ""
   */
  value?: string;

  /**
   * Programming language for syntax highlighting
   * Must be a language supported by Highlight.js
   * @example "javascript", "python", "html", "css"
   */
  language: string;

  /**
   * Highlight.js theme name for syntax highlighting
   * Can be any theme available in the highlight.js/styles directory
   * @example "hybrid", "monokai", "github", "atom-one-dark"
   * @default "hybrid"
   */
  theme?: string;
}

/**
 * Font metrics information returned by getFontMetrics
 */
export interface FontMetrics {
  /**
   * Height of the ascender (portion of characters above baseline)
   */
  ascent: number;

  /**
   * Height of the descender (portion of characters below baseline)
   */
  descent: number;

  /**
   * Total height of the font (ascent + descent)
   */
  height: number;
}

/**
 * Caret editor instance returned by createEditor
 */
export interface CaretEditorInstance {
  /**
   * Get the current value/content of the editor
   * @returns The current code content as a string
   */
  getValue(): string;

  /**
   * Set the value/content of the editor
   * @param value - The new code content to set
   */
  setValue(value: string): void;

  /**
   * Focus the editor textarea
   */
  focus(): void;

  /**
   * Change the programming language for syntax highlighting
   * @param language - The new language identifier (e.g., "javascript", "python")
   */
  setLanguage(language: string): void;

  /**
   * Destroy the editor instance and remove all event listeners
   * Cleans up the DOM and prepares for garbage collection
   */
  destroy(): void;
}

/**
 * Language manager for registering and initializing Highlight.js languages
 */
export interface LanguageManager {
  /**
   * Initialize the language manager
   */
  init(): void;

  /**
   * Register a new language for syntax highlighting
   * @param language - The language identifier to register
   */
  registerLanguage(language: string): void;

  /**
   * List of currently registered languages
   */
  registeredLanguages: string[];
}

/**
 * Main editor object containing the createEditor function
 */
export interface CaretEditor {
  /**
   * Create a new Caret editor instance
   * 
   * @param container - The HTMLElement that will contain the editor
   * @param config - Configuration options for the editor
   * @returns A CaretEditorInstance with methods to control the editor
   * 
   * @example
   * ```typescript
   * import editor from 'caret';
   * 
   * const editorContainer = document.getElementById('editor');
   * const instance = await editor.createEditor(editorContainer, {
   *   value: 'console.log("Hello, World!");',
   *   language: 'javascript',
   *   theme: 'monokai'
   * });
   * 
   * // Get current value
   * const code = instance.getValue();
   * 
   * // Update the content
   * instance.setValue('const x = 42;');
   * 
   * // Change language
   * instance.setLanguage('typescript');
   * 
   * // Clean up when done
   * instance.destroy();
   * ```
   */
  createEditor(
    container: HTMLElement,
    config: CaretEditorConfig
  ): Promise<CaretEditorInstance>;
}

/**
 * Default export - the main Caret editor object
 */
declare const editor: CaretEditor;

export default editor;

/**
 * Module augmentation for importing Highlight.js
 */
declare module "../highlight.js/es/core.js" {
  import type { HLJSApi } from "highlight.js";
  const hljs: HLJSApi;
  export default hljs;
}

declare module "./languages.js" {
  const languages: LanguageManager;
  export default languages;
}
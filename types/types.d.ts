/**
 * Caret Editor - Comprehensive Type Definitions
 * Extended types for internal structures and utilities
 */

/**
 * Internal DOM element IDs used by the Caret editor
 */
export const enum CaretElementIds {
  TEXTAREA = "Caret-textarea",
  HIGHLIGHTED = "Caret-highlighted",
  CARET = "Caret-caret",
  LINE_COUNTER = "Caret-lineCounter",
  THEME = "Caret-theme"
}

/**
 * CSS class names used by the Caret editor
 */
export const enum CaretClassNames {
  LINE_NUMBER = "Caret-lineCounter-number"
}

/**
 * Default editor dimensions
 */
export interface EditorDimensions {
  width: string;
  height: string;
}

/**
 * Editor style configuration
 */
export interface EditorStyle {
  position: string;
  width: string;
  height: string;
  overflow: string;
  fontSize: string;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /**
   * Whether the theme is a dark theme
   */
  isDark: boolean;

  /**
   * Color for the caret
   */
  caretColor: string;

  /**
   * Color for line numbers
   */
  lineColor: string;

  /**
   * Path to the theme CSS file
   */
  themePath: string;
}

/**
 * Caret position information
 */
export interface CaretPosition {
  /**
   * Horizontal position in pixels
   */
  left: number;

  /**
   * Vertical position in pixels
   */
  top: number;

  /**
   * Height of the caret in pixels
   */
  height: number;
}

/**
 * Text selection information
 */
export interface TextSelection {
  /**
   * Start position of the selection
   */
  start: number;

  /**
   * End position of the selection
   */
  end: number;

  /**
   * Selected text content
   */
  text: string;
}

/**
 * Line information for the editor
 */
export interface LineInfo {
  /**
   * Line number (1-indexed)
   */
  lineNumber: number;

  /**
   * Line content
   */
  content: string;

  /**
   * Starting character index in the full text
   */
  startIndex: number;

  /**
   * Ending character index in the full text
   */
  endIndex: number;
}

/**
 * Indentation configuration
 */
export interface IndentConfig {
  /**
   * Indentation string (spaces or tab)
   * @default "    " (4 spaces)
   */
  indent: string;

  /**
   * Whether to use tabs instead of spaces
   * @default false
   */
  useTabs?: boolean;

  /**
   * Number of spaces per indent level
   * @default 4
   */
  tabSize?: number;
}

/**
 * Event handlers for editor events
 */
export interface CaretEditorEventHandlers {
  /**
   * Called when the editor content changes
   */
  onInput?: (value: string) => void;

  /**
   * Called when the editor gains focus
   */
  onFocus?: () => void;

  /**
   * Called when the editor loses focus
   */
  onBlur?: () => void;

  /**
   * Called when the editor is scrolled
   */
  onScroll?: (scrollLeft: number, scrollTop: number) => void;

  /**
   * Called when a key is pressed
   */
  onKeyDown?: (event: KeyboardEvent) => void;

  /**
   * Called when a key is released
   */
  onKeyUp?: (event: KeyboardEvent) => void;

  /**
   * Called when the caret position changes
   */
  onCaretMove?: (position: CaretPosition) => void;

  /**
   * Called when the text selection changes
   */
  onSelectionChange?: (selection: TextSelection) => void;
}

/**
 * Extended configuration with event handlers and additional options
 */
export interface ExtendedCaretEditorConfig extends CaretEditorConfig {
  /**
   * Event handlers
   */
  events?: CaretEditorEventHandlers;

  /**
   * Custom indentation settings
   */
  indentation?: IndentConfig;

  /**
   * Custom editor dimensions
   */
  dimensions?: EditorDimensions;

  /**
   * Whether to enable spell checking
   * @default false
   */
  spellcheck?: boolean;

  /**
   * Whether to disable autocapitalization
   * @default true
   */
  disableAutocapitalize?: boolean;

  /**
   * Whether to show line numbers
   * @default true
   */
  showLineNumbers?: boolean;
}

/**
 * Keyboard event information for Tab handling
 */
export interface TabKeyEvent {
  /**
   * Whether Shift key was pressed
   */
  shiftKey: boolean;

  /**
   * Current cursor/selection start
   */
  selectionStart: number;

  /**
   * Current cursor/selection end
   */
  selectionEnd: number;

  /**
   * Current editor value
   */
  value: string;
}

/**
 * Result of tab key processing
 */
export interface TabKeyResult {
  /**
   * New value after indentation/unindentation
   */
  newValue: string;

  /**
   * New selection start position
   */
  newSelectionStart: number;

  /**
   * New selection end position
   */
  newSelectionEnd: number;
}

/**
 * Utility type for Highlight.js language names
 * Common languages - extend as needed
 */
export type HighlightLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "csharp"
  | "cpp"
  | "c"
  | "go"
  | "rust"
  | "php"
  | "ruby"
  | "swift"
  | "kotlin"
  | "scala"
  | "html"
  | "css"
  | "scss"
  | "less"
  | "json"
  | "xml"
  | "yaml"
  | "markdown"
  | "sql"
  | "bash"
  | "shell"
  | "powershell"
  | "dockerfile"
  | string; // Allow any string for custom languages

/**
 * Utility type for Highlight.js theme names
 * Common themes - extend as needed
 */
export type HighlightTheme =
  | "hybrid"
  | "monokai"
  | "github"
  | "atom-one-dark"
  | "atom-one-light"
  | "vs"
  | "vs2015"
  | "dracula"
  | "nord"
  | "solarized-dark"
  | "solarized-light"
  | "tomorrow"
  | "tomorrow-night"
  | string; // Allow any string for custom themes

/**
 * Re-export main types for convenience
 */
export type {
  CaretEditorConfig,
  CaretEditorInstance,
  CaretEditor,
  FontMetrics,
  LanguageManager
} from "./index";
export interface EditorInitData {
  /** Initial code value */
  value?: string;

  /** Language id registered in Highlight.js */
  language: string;

  /** Highlight.js theme name (without .css) */
  theme?: string;
}

export interface CaretEditorElements {
  textarea: HTMLTextAreaElement;
  highlighted: HTMLPreElement;
  caret: HTMLDivElement;
}

/**
 * Creates a Caret editor inside the given container.
 *
 * @param editor DOM element that will contain the editor
 * @param data Initial editor configuration
 */
export function createEditor(
  editor: HTMLElement,
  data: EditorInitData
): Promise<void>;

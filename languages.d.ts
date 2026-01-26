import type hljs from './highlight.js/es/core.js';

export function init(): void;

/**
 * Caret language API
 */
declare const languages: {
  /**
   * Register all built-in languages
   */
  init(): void;

  /**
   * Register a custom Highlight.js language
   */
  registerLanguage(
    name: string,
    language: (hljs: typeof import('./highlight.js/es/core.js')) => any
  ): void;

  /**
   * Exposed Highlight.js core instance
   */
  hljs: typeof import('./highlight.js/es/core.js');
};

export default languages;

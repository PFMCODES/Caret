/**
 * Caret Editor - Languages Module Type Definitions
 * Handles language registration and management for syntax highlighting
 */

import type { HLJSApi, LanguageFn } from 'highlight.js';

/**
 * Supported languages that are pre-registered by default
 */
export type PreRegisteredLanguage =
  | 'javascript'
  | 'js'
  | 'xml'
  | 'html'
  | 'svg'
  | 'css'
  | 'python'
  | 'java'
  | 'csharp'
  | 'cpp'
  | 'ruby'
  | 'php'
  | 'go'
  | 'c'
  | 'rust'
  | 'kotlin'
  | 'swift'
  | 'typescript'
  | 'json'
  | 'bash'
  | 'shell'
  | 'sh'
  | 'plaintext';

/**
 * Language registration status
 */
export interface LanguageRegistration {
  /**
   * Language identifier/name
   */
  name: string;

  /**
   * Whether the language is currently registered
   */
  isRegistered: boolean;

  /**
   * Aliases for this language
   */
  aliases?: string[];
}

/**
 * Languages module interface
 */
export interface LanguagesModule {
  /**
   * Initialize and register all default languages
   * This should be called once before using the editor
   * 
   * @example
   * ```typescript
   * import languages from './languages.js';
   * languages.init();
   * ```
   */
  init(): void;

  /**
   * Array of currently registered language identifiers
   * This includes both the primary language names and their aliases
   * 
   * @example
   * ```typescript
   * console.log(languages.registeredLanguages);
   * // ['javascript', 'js', 'xml', 'html', 'python', ...]
   * ```
   */
  registeredLanguages: string[];

  /**
   * Register a new language for syntax highlighting
   * If the language is already registered, this will update its definition
   * 
   * @param name - Language identifier (e.g., "rust", "go", "python")
   * @param definition - Highlight.js language definition function
   * 
   * @example
   * ```typescript
   * import languages from './languages.js';
   * import scala from 'highlight.js/es/languages/scala';
   * 
   * languages.registerLanguage('scala', scala);
   * ```
   */
  registerLanguage(name: string, definition: LanguageFn): void;

  /**
   * Reference to the Highlight.js core instance
   * Provides direct access to all Highlight.js methods
   */
  hljs: HLJSApi;
}

/**
 * Default export - Languages module instance
 */
declare const languages: LanguagesModule;

export default languages;

/**
 * Helper type to check if a language is registered
 */
export type IsLanguageRegistered<T extends string> = T extends PreRegisteredLanguage
  ? true
  : boolean;

/**
 * Language definition map for custom language registration
 */
export interface LanguageDefinitionMap {
  [languageName: string]: LanguageFn;
}

/**
 * Configuration for bulk language registration
 */
export interface BulkLanguageConfig {
  /**
   * Map of language names to their definition functions
   */
  languages: LanguageDefinitionMap;

  /**
   * Whether to skip already registered languages
   * @default true
   */
  skipIfRegistered?: boolean;
}
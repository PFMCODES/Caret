/**
 * Caret Editor - Language Utilities
 * Helper types and utilities for working with language registration
 */

import type { LanguageFn } from 'highlight.js';
import type { PreRegisteredLanguage, LanguagesModule } from './languages';

/**
 * Language information object
 */
export interface LanguageInfo {
  /**
   * Primary language identifier
   */
  name: string;

  /**
   * Display name for the language
   */
  displayName: string;

  /**
   * File extensions associated with this language
   */
  extensions: string[];

  /**
   * Common aliases for the language
   */
  aliases: string[];

  /**
   * Whether this language is pre-registered
   */
  isPreRegistered: boolean;
}

/**
 * Map of language information for all pre-registered languages
 */
export const LANGUAGE_INFO: Record<PreRegisteredLanguage, LanguageInfo> = {
  javascript: {
    name: 'javascript',
    displayName: 'JavaScript',
    extensions: ['.js', '.mjs', '.cjs'],
    aliases: ['js'],
    isPreRegistered: true
  },
  js: {
    name: 'javascript',
    displayName: 'JavaScript',
    extensions: ['.js', '.mjs', '.cjs'],
    aliases: ['javascript'],
    isPreRegistered: true
  },
  typescript: {
    name: 'typescript',
    displayName: 'TypeScript',
    extensions: ['.ts', '.tsx'],
    aliases: ['ts'],
    isPreRegistered: true
  },
  python: {
    name: 'python',
    displayName: 'Python',
    extensions: ['.py', '.pyw'],
    aliases: ['py'],
    isPreRegistered: true
  },
  java: {
    name: 'java',
    displayName: 'Java',
    extensions: ['.java'],
    aliases: [],
    isPreRegistered: true
  },
  csharp: {
    name: 'csharp',
    displayName: 'C#',
    extensions: ['.cs'],
    aliases: ['cs', 'c#'],
    isPreRegistered: true
  },
  cpp: {
    name: 'cpp',
    displayName: 'C++',
    extensions: ['.cpp', '.cc', '.cxx', '.hpp', '.h'],
    aliases: ['c++'],
    isPreRegistered: true
  },
  c: {
    name: 'c',
    displayName: 'C',
    extensions: ['.c', '.h'],
    aliases: [],
    isPreRegistered: true
  },
  ruby: {
    name: 'ruby',
    displayName: 'Ruby',
    extensions: ['.rb'],
    aliases: ['rb'],
    isPreRegistered: true
  },
  php: {
    name: 'php',
    displayName: 'PHP',
    extensions: ['.php'],
    aliases: [],
    isPreRegistered: true
  },
  go: {
    name: 'go',
    displayName: 'Go',
    extensions: ['.go'],
    aliases: ['golang'],
    isPreRegistered: true
  },
  rust: {
    name: 'rust',
    displayName: 'Rust',
    extensions: ['.rs'],
    aliases: ['rs'],
    isPreRegistered: true
  },
  kotlin: {
    name: 'kotlin',
    displayName: 'Kotlin',
    extensions: ['.kt', '.kts'],
    aliases: ['kt'],
    isPreRegistered: true
  },
  swift: {
    name: 'swift',
    displayName: 'Swift',
    extensions: ['.swift'],
    aliases: [],
    isPreRegistered: true
  },
  xml: {
    name: 'xml',
    displayName: 'XML',
    extensions: ['.xml'],
    aliases: [],
    isPreRegistered: true
  },
  html: {
    name: 'html',
    displayName: 'HTML',
    extensions: ['.html', '.htm'],
    aliases: [],
    isPreRegistered: true
  },
  svg: {
    name: 'svg',
    displayName: 'SVG',
    extensions: ['.svg'],
    aliases: [],
    isPreRegistered: true
  },
  css: {
    name: 'css',
    displayName: 'CSS',
    extensions: ['.css'],
    aliases: [],
    isPreRegistered: true
  },
  json: {
    name: 'json',
    displayName: 'JSON',
    extensions: ['.json'],
    aliases: [],
    isPreRegistered: true
  },
  bash: {
    name: 'bash',
    displayName: 'Bash',
    extensions: ['.sh', '.bash'],
    aliases: ['shell', 'sh'],
    isPreRegistered: true
  },
  shell: {
    name: 'shell',
    displayName: 'Shell',
    extensions: ['.sh'],
    aliases: ['bash', 'sh'],
    isPreRegistered: true
  },
  sh: {
    name: 'sh',
    displayName: 'Shell',
    extensions: ['.sh'],
    aliases: ['bash', 'shell'],
    isPreRegistered: true
  },
  plaintext: {
    name: 'plaintext',
    displayName: 'Plain Text',
    extensions: ['.txt'],
    aliases: ['text', 'plain'],
    isPreRegistered: true
  }
};

/**
 * Type guard to check if a language is pre-registered
 */
export function isPreRegisteredLanguage(language: string): language is PreRegisteredLanguage {
  const preRegistered: PreRegisteredLanguage[] = [
    'javascript', 'js', 'xml', 'html', 'svg', 'css',
    'python', 'java', 'csharp', 'cpp', 'ruby', 'php',
    'go', 'c', 'rust', 'kotlin', 'swift', 'typescript',
    'json', 'bash', 'shell', 'sh', 'plaintext'
  ];
  return preRegistered.includes(language as PreRegisteredLanguage);
}

/**
 * Check if a language is currently registered
 */
export function isLanguageRegistered(
  languages: LanguagesModule,
  language: string
): boolean {
  return languages.registeredLanguages.includes(language);
}

/**
 * Get language information by name or alias
 */
export function getLanguageInfo(language: string): LanguageInfo | null {
  // Check if it's a direct match
  if (isPreRegisteredLanguage(language)) {
    return LANGUAGE_INFO[language];
  }

  // Check if it's an alias
  for (const [key, info] of Object.entries(LANGUAGE_INFO)) {
    if (info.aliases.includes(language)) {
      return info;
    }
  }

  return null;
}

/**
 * Get language by file extension
 */
export function getLanguageByExtension(extension: string): string | null {
  const normalizedExt = extension.startsWith('.') ? extension : `.${extension}`;

  for (const [key, info] of Object.entries(LANGUAGE_INFO)) {
    if (info.extensions.includes(normalizedExt)) {
      return info.name;
    }
  }

  return null;
}

/**
 * Get all available language names (primary names only)
 */
export function getAllLanguageNames(): string[] {
  const uniqueNames = new Set<string>();
  
  for (const info of Object.values(LANGUAGE_INFO)) {
    uniqueNames.add(info.name);
  }

  return Array.from(uniqueNames);
}

/**
 * Language registration helper class
 */
export class LanguageRegistry {
  private languages: LanguagesModule;

  constructor(languagesModule: LanguagesModule) {
    this.languages = languagesModule;
  }

  /**
   * Register a language if it's not already registered
   */
  registerIfNeeded(name: string, definition: LanguageFn): boolean {
    if (this.isRegistered(name)) {
      return false;
    }

    this.languages.registerLanguage(name, definition);
    return true;
  }

  /**
   * Check if a language is registered
   */
  isRegistered(name: string): boolean {
    return isLanguageRegistered(this.languages, name);
  }

  /**
   * Get all registered languages
   */
  getRegistered(): string[] {
    return [...this.languages.registeredLanguages];
  }

  /**
   * Get language info
   */
  getInfo(name: string): LanguageInfo | null {
    return getLanguageInfo(name);
  }

  /**
   * Register multiple languages at once
   */
  registerBulk(definitions: Record<string, LanguageFn>): void {
    for (const [name, definition] of Object.entries(definitions)) {
      this.registerIfNeeded(name, definition);
    }
  }
}

/**
 * Options for lazy language loading
 */
export interface LazyLanguageOptions {
  /**
   * Base path for language modules
   * @default "../highlight.js/es/languages/"
   */
  basePath?: string;

  /**
   * Whether to cache loaded languages
   * @default true
   */
  cache?: boolean;
}

/**
 * Lazy language loader for dynamic imports
 */
export class LazyLanguageLoader {
  private languages: LanguagesModule;
  private basePath: string;
  private cache: boolean;
  private loadedLanguages: Set<string> = new Set();

  constructor(
    languagesModule: LanguagesModule,
    options: LazyLanguageOptions = {}
  ) {
    this.languages = languagesModule;
    this.basePath = options.basePath || '../highlight.js/es/languages/';
    this.cache = options.cache !== false;
  }

  /**
   * Load a language dynamically
   */
  async loadLanguage(name: string): Promise<void> {
    // Check if already loaded (if caching is enabled)
    if (this.cache && this.loadedLanguages.has(name)) {
      return;
    }

    // Check if pre-registered
    if (isLanguageRegistered(this.languages, name)) {
      this.loadedLanguages.add(name);
      return;
    }

    try {
      const module = await import(
        `${this.basePath}${name}.js`
      );
      
      const definition = module.default;
      this.languages.registerLanguage(name, definition);
      
      if (this.cache) {
        this.loadedLanguages.add(name);
      }
    } catch (error) {
      throw new Error(
        `Failed to load language "${name}": ${(error as Error).message}`
      );
    }
  }

  /**
   * Load multiple languages
   */
  async loadLanguages(names: string[]): Promise<void> {
    await Promise.all(names.map(name => this.loadLanguage(name)));
  }

  /**
   * Check if a language has been loaded
   */
  isLoaded(name: string): boolean {
    return this.loadedLanguages.has(name);
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.loadedLanguages.clear();
  }
}

/**
 * Export utility functions
 */
export const LanguageUtils = {
  isPreRegisteredLanguage,
  isLanguageRegistered,
  getLanguageInfo,
  getLanguageByExtension,
  getAllLanguageNames
};
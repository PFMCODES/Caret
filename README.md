![LOGO](https://github.com/PFMCODES/Caret/raw/main/logo.svg)
# Caret
[![License: MIT](https://img.shields.io/badge/License-MIT-4000ff.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dw/@pfmcodes/caret?style=flat-square)](https://npmjs.com/@pfmcodes/caret)
[![Version](https://img.shields.io/npm/v/@pfmcodes/caret?style=flat-square)](https://npmjs.com/@pfmcodes/caret)

A lightweight, fast code editor engine with real-time syntax highlighting, custom caret rendering, and a clean EditContext-based architecture. 551 lines. 26KB. 42ms load time.

## Features

- **EditContext API** - Clean input handling with no browser fighting, no textarea hacks
- **Live Syntax Highlighting** - Real-time highlighting powered by Highlight.js
- **Custom Caret** - Pixel-perfect caret positioning via Range API
- **Line Numbers** - Built-in line counter with dynamic updates
- **Smart Indentation** - Tab/Shift+Tab for indenting and unindenting code blocks
- **Undo/Redo** - Full undo/redo stack with cursor position restoration (Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z)
- **Theme Support** - Custom background, text, caret and line counter colors
- **Lock Mode** - Read-only mode for displaying code
- **Font Support** - Custom font loading
- **Paste Handling** - Always pastes plain text, no rich HTML
- **ES Modules** - Modern ESM architecture
- **Lightweight** - 551 lines, 26KB total, loads in ~42ms

## Table of Contents

- [What's New](#whats-new)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [License](#license)

## What's New

### v0.3.0 — Complete Rewrite
- **Ditched textarea** — rebuilt on Chrome's EditContext API
- **No more sync issues** — single text model, no dual layer fighting
- **Undo/redo with cursor restoration** — cursor returns to exact position
- **Pixel-perfect caret** — positioned via Range API, no canvas math
- **Modular architecture** — `textEditor.js`, `caret.js`, `lineCounter.js`, `font.js`, `languages.js`
- **setLanguage()** — switch language at runtime
- **delete()** — clean teardown with full event listener removal
- **onClick cursor positioning** — click anywhere to place cursor
- **Known limitation** — EditContext requires Chrome/Chromium (Firefox support pending)

### v0.2.8
- Bug fixes

### v0.2.7
- File optimizations and updated comments

### v0.2.6
- CommonJS support removed to reduce package size

### v0.2.5
- Multiple editor instances support
- Word-aware line wrapping
- Fixed language re-registration bug

## Installation

### NPM

```bash
npm install @pfmcodes/caret
```

### Yarn

```bash
yarn add @pfmcodes/caret
```

### PNPM

```bash
pnpm add @pfmcodes/caret
```

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Caret Demo</title>
  <link rel="shortcut icon" href="logo.svg" type="image/svg">
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      padding: 20px;
      background: #1a1a2e;
      color: #fff;
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    #editor {
      width: 900px;
      height: 600px;
      margin: 20px auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
      border-radius: 8px;
      overflow: hidden;
    }

    #result {
      width: 900px;
      margin: 10px auto;
      padding: 10px;
      background: #111;
      color: #0f0;
      font-family: monospace;
      font-size: 13px;
      border-radius: 8px;
      min-height: 40px;
      white-space: pre-wrap;
    }

    .controls {
      max-width: 900px;
      margin: 0 auto 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .controls span {
      font-size: 12px;
      opacity: 0.5;
      align-self: center;
      margin: 0 4px;
    }

    button {
      padding: 8px 16px;
      border: none;
      background: #7116d8;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }

    button:hover {
      background: #5a11ab;
    }
  </style>
</head>
<body>
  <h1>Caret Demo</h1>

  <div class="controls">
    <span>Language:</span>
    <button onclick="window.changeLanguage('javascript')">JavaScript</button>
    <button onclick="window.changeLanguage('python')">Python</button>
    <button onclick="window.changeLanguage('html')">HTML</button>
    <span>Theme:</span>
    <button onclick="window.changeTheme('tokyo-night-dark')">Tokyo Night</button>
    <button onclick="window.changeTheme('monokai')">Monokai</button>
    <button onclick="window.changeTheme('github-dark')">GitHub Dark</button>
    <button onclick="window.changeTheme('atom-one-dark')">Atom One Dark</button>
    <span>Actions:</span>
    <button onclick="window.runCode()">▶ Run</button>
    <button onclick="window.getCode()">Get Code</button>
  </div>

  <div id="editor"></div>
  <div id="result"></div>

  <script type="module">
    import { createTextEditor } from './components/textEditor.js';

    window.language = 'javascript';
    window.currentTheme = 'tokyo-night-dark';

    const jsCode = `// Welcome to Caret!
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`;

    const pyCode = `# Welcome to Caret!
def fibonacci(n):
    if n < 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Calculate first 25 Fibonacci numbers
for i in range(25):
    print(" i: " + f'{i} = {fibonacci(i)}. ')`;

    const htmlCode = `<!-- Welcome to Caret! -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Caret HTML Demo</title>
</head>
<body>
  <h1>Hello, Caret!</h1>
  <p>This is a simple HTML example to demonstrate Caret's capabilities.</p>
  <ul>
    <li>HTML5 support</li>
    <li>Syntax highlighting</li>
    <li>Auto-completion</li>
  </ul>
</body>
</html>`;

    const editorInstance = await createTextEditor(
      document.getElementById('editor'),
      jsCode,
      'demo-editor',
      {
        dark: true,
        language: 'javascript',
        hlTheme: 'tokyo-night-dark',
        focusColor: '#7116d8',
        id: Math.floor(Math.random() * 1000000000),
        theme: {
          dark: {
            'background.editor': '#1a1a2e',
            'background.lineCounter': '#16213e',
            'color.editor': '#d4d4d4',
            'color.lineCounter': '#888',
            'editor.caret': '#7116d8'
          },
          light: {
            'background.editor': '#fff',
            'background.lineCounter': '#f0f0f0',
            'color.editor': '#000',
            'color.lineCounter': '#666',
            'editor.caret': '#7116d8'
          }
        }
      }
    );

    window.editorInstance = editorInstance;

    window.changeLanguage = async (lang) => {
      window.language = lang;
      await editorInstance.setLanguage(lang);
      if (lang === 'javascript') editorInstance.setValue(jsCode);
      if (lang === 'python') editorInstance.setValue(pyCode);
      if (lang === 'html') editorInstance.setValue(htmlCode);
    };

    window.changeTheme = (theme) => {
      window.currentTheme = theme;
      // update the hlTheme stylesheet
      const link = document.getElementById('caret-theme-demo-editor');
      if (link) link.href = `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/${theme}.css`;
    };

    window.runCode = async () => {
      const resultEl = document.getElementById('result');
      resultEl.textContent = 'Running...';

      if (window.language === 'html') {
        resultEl.innerHTML = editorInstance.getValue();
        return;
      }

      const code = editorInstance.getValue();
      const lang = window.language;

      try {
        const res = await fetch('https://lexius-transpiler.onrender.com/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, lang })
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        const exec = data.result ?? {};
        const stdout = exec.stdout ?? '';
        const stderr = exec.stderr ?? '';
        const result = exec.result !== undefined && exec.result !== null
          ? String(exec.result) : '';

        resultEl.textContent = [stdout, stderr, result].filter(Boolean).join('\n') + '\n';
      } catch (err) {
        resultEl.textContent = 'Error: ' + (err.message || err) + '\n';
      }
    };

    window.getCode = async () => {
      try {
        await navigator.clipboard.writeText(editorInstance.getValue());
        window.confirm('Text copied to clipboard');
      } catch (err) {
        window.alert('Failed to copy: ', err);
      }
    };
  </script>
</body>
</html>
```

## Project Structure

```
caret/
├── components/
│   ├── textEditor.js     # Text editor(core) — EditContext, undo/redo, highlighting
│   ├── caret.js          # Custom caret positioning via Range API
│   ├── lineCounter.js    # Line number display
│   ├── font.js           # Custom font loading
│   └── languages.js      # Highlight.js language registration
├── .gitignore
├── .npmignore
├── index.js              # Main file
├── LICENSE 
├── logo.svg
├── package-lock.json
├── package.json
├── package.json
├── README.md
└── utilities.js          # Shared utilities
```

## Usage

### Basic Editor

```javascript
import { createEditor } from './node_modules/@pfmcodes/caret/index.js';

const editor = await createEditor(
  document.getElementById('editor'),  // parent element
  'const x = 42;',                    // initial content
  'my-editor',                         // unique id
  {
    dark: true,
    language: 'javascript',
    hlTheme: 'tokyo-night-dark'
  }
);
```

### Read-Only Display

```javascript
import { createEditor } from './node_modules/@pfmcodes/caret/index.js';

const editor = await createEditor(
  document.getElementById('editor'),
  code,
  'readonly-editor',
  {
    dark: true,
    language: 'python',
    hlTheme: 'github-dark',
    lock: true
  }
);
```

### Multiple Instances

```javascript
import { createEditor } from './node_modules/@pfmcodes/caret/index.js';

// each editor needs a unique id

const editor1 = await createEditor(el1, code1, 'editor-1', options);
const editor2 = await createEditor(el2, code2, 'editor-2', options);
```

### Custom Theme

```javascript
import { createEditor } from './node_modules/@pfmcodes/caret/index.js';

const editor = await createEditor(
  document.getElementById('editor'),
  code,
  'editor-1',
  {
    dark: true,
    language: 'javascript',
    hlTheme: 'tokyo-night-dark',
    focusColor: '#fff',
    theme: {
      dark: {
        'background.editor': '#222',
        'background.lineCounter': '#333',
        'color.editor': '#d4d4d4',
        'color.lineCounter': '#d4d4d4',
        'editor.caret': '#37ff29'
      },
      light: {
        'background.editor': '#cfd8f7',
        'background.lineCounter': '#e2e7f9',
        'color.editor': '#000',
        'color.lineCounter': '#000',
        'editor.caret': '#37ff29'
      }
    }
  }
);
```

### Custom Font

```javascript
import { createEditor } from './node_modules/@pfmcodes/caret/index.js';

const editor = await createEditor(
  document.getElementById('editor'),
  code,
  'editor-1',
  {
    dark: true,
    language: 'javascript',
    font: {
      url: './fonts/FiraCode.ttf',
      name: 'Fira Code'
    }
  }
);
```

## API Reference

### createEditor(parent, content, id, options)

Creates a new editor instance.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `parent` | `HTMLElement` | ✓ | Container element |
| `content` | `string` | ✓ | Initial content |
| `options` | `object` | ✓ | Configuration |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dark` | `boolean` | `false` | Dark mode |
| `shadow` | `boolean` | `true` | Box shadow |
| `focusColor` | `string` | `#7c3aed` | Border color on focus |
| `shadowColor` | `string` | `#000` | Shadow color |
| `lock` | `boolean` | `false` | Read-only mode |
| `language` | `string` | `plaintext` | Highlight.js language |
| `hlTheme` | `string` | `hybrid` | Highlight.js theme |
| `font` | `object` | — | Custom font `{ url, name }` |
| `theme` | `object` | — | Custom colors (see above) |
`id` | `string/number` | — | required for proper ditinguistion |

**Returns:** `Promise<EditorInstance>`

### EditorInstance Methods

```javascript
// Get current content
const code = editor.getValue();

// Set content
editor.setValue('console.log("hello");');

// Listen for changes
editor.onChange((text) => {
  console.log('content changed:', text);
});

// Check if focused
const focused = editor.isFocused();

// Switch language
await editor.setLanguage('python');

// Destroy instance and clean up
editor.delete();
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Indent (4 spaces) |
| `Shift+Tab` | Unindent |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+Shift+Z` | Redo |

### Global Undo/Redo Stack

Each editor instance stores its undo/redo stack on `window.caret`:

```javascript
// access undo stack for a specific editor
window.caret['undoStack.editor-1']; // array of { content, cursor }
window.caret['redoStack.editor-1'];
```

## Customization

### CSS Override

```css
/* editor container */
#editor {
  width: 900px;
  height: 500px;
  font-size: 16px;
}

/* line numbers */
.lineCounter {
  min-width: 40px;
}

.line-number {
  padding: 0 8px;
}
```

### Available hlTheme values

**Dark:**
- `atom-one-dark`
- `monokai`
- `night-owl`
- `nord`
- `tokyo-night-dark`
- `vs2015`
- `hybrid`
- `github-dark`

**Light:**
- `github`
- `atom-one-light`
- `stackoverflow-light`
- `xcode`

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome / Chromium | ✓ |
| Edge | ✓ |
| Firefox | ⨯ |
| Safari | ⨯ |

Caret v0.3+ uses the [EditContext API](https://developer.mozilla.org/en-US/docs/Web/API/EditContext_API) which is currently only available in Chromium-based browsers. Firefox support is tracked [here](https://github.com/mozilla/standards-positions/issues/199).

## Performance

| Metric | Caret v0.3+ | Monaco | CodeMirror 6 |
|--------|-------------|--------|--------------|
| Bundle size | **~30KB** | ~5MB | ~400KB |
| Load time | **~27ms** | ~2-3s | ~500ms |
| Lines of code | **605** | ~300,000 | ~50,000 |
| Architecture | EditContext | textarea | contenteditable |

## Speed and Size

| Files | Blank Lines | Comments | Code | Total |
|-------|-------------|----------|------|-------|
| 7 | 82 | 127 | 604 | 813 |

| File Name | Language | Size | Path | Blank Lines | Comments | Code |
|-----------|----------|------|------|-------------|----------|------|
| index.js | JavaScript | 173 bytes | / | 1 | 0 | 6 |
| utilities.js | JavaScript | 764 bytes | / | 6 | 2 | 24 |
| caret.js | JavaScript | 3.04 KB | components/ | 16 | 15 | 64 |
| font.js | JavaScript | 360 bytes | components/ | 2 | 8 | 6 |
| languages.js | JavaScript | 3.99 KB | components/ | 7 | 7 | 88 |
| lineCounter.js | JavaScript | 3.72 KB | components/ | 5 | 24 | 62 |
| textEditor.js | JavaScript | 17.81 KB | components/ | 44 | 71 | 351 |
| **Total** | — | **29.857KB or roughly 30KB** | — | 82 | 127 | 605 |

### Load time on Chrome
![~25ms load](https://pfmcodes.onrender.com/apps/caret/chrome-speed.png)

### Load time on Edge
![~27ms load](https://pfmcodes.onrender.com/apps/caret/edge-speed.png)

### ***TIP: after installing or cloning delete these files/directories:***
- ***.gitignore***
- ***.npmignore***
- ***chrome-speed.png***
- ***edge-speed.png***
- ***LICENSE***
- ***logo.svg***
- ***package.json***
- ***package-lock.json***
- ***README.md***
- ***.git***

> This will reduce the package size to its orignal size

## How It Works

Caret v0.3+ uses Chrome's EditContext API to completely separate input handling from rendering:

1. **EditContext** receives all keyboard input, IME, clipboard events
2. **Text model** — a single string `text` is the source of truth
3. **render()** — calls `hljs.highlight()` and sets `main.innerHTML`
4. **Caret** — positioned via `Range.getBoundingClientRect()`, no canvas math
5. **Undo/redo** — pure string operations stored in `window.caret`

No dual-layer sync issues. No textarea fighting. No canvas measurements.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Made with ❤️ by [PFMCODES](https://github.com/PFMCODES)
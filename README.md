# Caret

[![License: MIT](https://img.shields.io/badge/License-MIT-4000ff.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-63.7%25-f6fa03)](https://github.com/PFMCODES/lexius-edior)
[![CSS](https://img.shields.io/badge/CSS-4.0%25-2e7ad1)](https://github.com/pfmcodes/lexius-editor)
[![CSS](https://img.shields.io/badge/CSS-32.3%#0244f7)](https://github.com/pfmcodes/lexius-editor)

A lightweight, feature-rich code editor with real-time syntax highlighting and custom caret rendering. Built with vanilla JavaScript and powered by Highlight.js, caret delivers a smooth coding experience with professional-grade features.

## ✨ Features

- 🎨 **Live Syntax Highlighting** - Real-time code highlighting powered by Highlight.js
- 🖱️ **Custom Caret** - Smooth, pixel-perfect Caret positioning and rendering
- 🔢 **Line Numbers** - Built-in line counter with dynamic updates
- ⌨️ **Smart Indentation** - Tab/Shift+Tab support for indenting/unindenting code blocks
- 🎭 **Theme Support** - Multiple syntax highlighting themes (light/dark modes)
- 📜 **Smooth Scrolling** - Synchronized scrolling for code, highlights, and line numbers
- 📦 **ES Modules** - Modern ESM architecture for easy integration
- 🎯 **TypeScript Ready** - Full TypeScript definitions included
- ⚡ **Lightweight** - Pure JavaScript, no heavy frameworks required

## 📋 Table of Contents

- [What's new](#What's-New?)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## What's-New?

### New fresh package directory, now the heavy work is done in the cloud while minimizing package size to just a few Kilo Bytes.

## 🚀 Installation

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

## 🏁 Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Caret</title>
  <link rel="stylesheet" href="node_modules/caret/index.css">
</head>
<body>
  <div id="editor"></div>
  
  <script type="module">
    import editor from './node_modules/@pfmcodes/caret/esm/index.js';
    
    const instance = await editor.editor.createEditor(
      document.getElementById('editor'),
      {
        value: 'console.log("Hello, World!");',
        language: 'javascript',
        theme: 'hybrid'
      }
    );
  </script>
</body>
</html>
```

### ES Module Import

```javascript
import editor from '@pfmcodes/caret';

// Create editor instance
const editorInstance = await editor.editor.createEditor(
  document.getElementById('editor'),
  {
    value: '',           // Initial code
    language: 'python',  // Programming language
    theme: 'monokai'     // Highlight.js theme
  }
);
```

## 📁 Project Structure

```
caret/
├── esm/                  # ES Module builds
├── highlight.js/         # Syntax highlighting support
├── types/               # TypeScript type definitions
├── index.css            # Core styles
├── package.json         # Package configuration
├── .gitignore          # Git ignore rules
├── .npmignore          # NPM ignore rules
└── LICENSE             # MIT License
```

## 💡 Usage

### JavaScript Editor

```javascript
import editor from '@pfmcodes/caret'; // auto link to commonjs version

const jsEditor = await editor.editor.createEditor(
  document.getElementById('js-editor'),
  {
    value: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
    language: 'javascript',
    theme: 'atom-one-dark'
  }
);
```

### Python Editor

```javascript
const pyEditor = await editor.createEditor(
  document.getElementById('py-editor'),
  {
    value: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print([fibonacci(i) for i in range(10)])`,
    language: 'python',
    theme: 'github-dark'
  }
);
```

### Empty Editor (Start from Scratch)

```javascript
const emptyEditor = await editor.createEditor(
  document.getElementById('empty-editor'),
  {
    value: '',
    language: 'javascript',
    theme: 'hybrid'
  }
);
```

## 🎨 Customization

### Custom Styling

The editor comes with default styles that you can override:

```css
/* Custom editor styling */
#editor {
  width: 800px !important;
  height: 500px !important;
  font-size: 16px !important;
}

/* Customize line numbers */
.Caret-lineCounter {
  background: #1e1e1e;
}

.Caret-lineCounter-number {
  font-size: 12px;
  padding: 0 8px;
}

/* Customize the textarea */
#Caret-textarea {
  font-family: 'Fira Code', 'Consolas', monospace;
  line-height: 1.6;
}

/* Customize the Caret */
#Caret-caret {
  background: #00ff00 !important;
  width: 3px !important;
}
```

## 🎯 Advanced Features

### Multi-Language Support

Caret supports all languages available in Highlight.js:

```javascript
// JavaScript
await editor.createEditor(el, { language: 'javascript', ... });

// Python
await editor.createEditor(el, { language: 'python', ... });

// TypeScript
await editor.createEditor(el, { language: 'typescript', ... });

// HTML
await editor.createEditor(el, { language: 'html', ... });

// CSS
await editor.createEditor(el, { language: 'css', ... });

// And many more...
```

### Dynamic Language Switching

```javascript
const editorInstance = await editor.createEditor(el, {
  value: 'console.log("Hello");',
  language: 'javascript',
  theme: 'hybrid'
});

// Later, switch to Python
editorInstance.setValue('print("Hello")');
editorInstance.setLanguage('python');
```

### Real-Time Code Editing

The editor automatically:
- Updates syntax highlighting as you type
- Adjusts line numbers dynamically
- Maintains Caret position accurately
- Synchronizes all visual components

### Configuration Options

```javascript
const editorInstance = await editor.createEditor(
  containerElement,
  {
    // Initial code content
    value: 'const x = 42;',
    
    // Programming language for syntax highlighting
    // Supports: javascript, python, java, cpp, html, css, json, etc.
    language: 'javascript',
    
    // Highlight.js theme name
    // Examples: 'hybrid', 'monokai', 'atom-one-dark', 'github', 'vs2015'
    theme: 'hybrid'
  }
);
```

### Available Themes

Caret supports all Highlight.js themes. Popular options include:

**Dark Themes:**
- `atom-one-dark`
- `monokai`
- `night-owl`
- `nord`
- `tokyo-night-dark`
- `vs2015`

**Light Themes:**
- `github`
- `atom-one-light`
- `stackoverflow-light`
- `xcode`

## 🛠️ API Reference

### createEditor(container, options)

Creates a new editor instance.

**Parameters:**
- `container` (HTMLElement) - The DOM element to attach the editor to
- `options` (Object) - Configuration options
  - `value` (string) - Initial code content
  - `language` (string) - Programming language for syntax highlighting
  - `theme` (string) - Highlight.js theme name

**Returns:** Promise<EditorInstance>

### EditorInstance Methods

```javascript
// Get current editor content
const code = editorInstance.getValue();

// Set editor content programmatically
editorInstance.setValue('console.log("New code");');

// Focus the editor
editorInstance.focus();

// Change the programming language
editorInstance.setLanguage('python');

// Destroy the editor instance
editorInstance.destroy();
```

### Editor Features

#### Automatic Line Numbering
Line numbers are automatically generated and synchronized with your code.

#### Smart Tab Handling
- **Tab** - Indent selected lines or insert 4 spaces
- **Shift + Tab** - Unindent selected lines

#### Custom Caret
The editor features a custom-rendered Caret that adapts to your theme (light/dark).

#### Synchronized Scrolling
All editor components (code, highlights, line numbers) scroll together smoothly.

## 📖 Complete Example

Here's a complete working example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Caret Demo</title>
  <link rel="stylesheet" href="./node_modules/caret/index.css">
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }
    
    #editor {
      width: 900px;
      height: 600px;
      margin: 20px auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .controls {
      max-width: 900px;
      margin: 0 auto 20px;
    }
    
    button {
      padding: 8px 16px;
      margin-right: 8px;
      border: none;
      background: #7116d8;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background: #5a11ab;
    }
  </style>
</head>
<body>
  <h1 style="text-align: center;">Caret Demo</h1>
  
  <div class="controls">
    <button onclick="changeLanguage('javascript')">JavaScript</button>
    <button onclick="changeLanguage('python')">Python</button>
    <button onclick="changeLanguage('html')">HTML</button>
    <button onclick="changeTheme('monokai')">Monokai</button>
    <button onclick="changeTheme('github')">GitHub</button>
    <button onclick="getCode()">Get Code</button>
  </div>
  
  <div id="editor"></div>
  
  <script type="module">
    import editor from './node_modules/caret/esm/index.js';
    
    // Initialize editor
    const editorInstance = await editor.createEditor(
      document.getElementById('editor'),
      {
        value: `// Welcome to Caret!
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,
        language: 'javascript',
        theme: 'atom-one-dark'
      }
    );
    
    // Make it globally accessible for demo buttons
    window.editorInstance = editorInstance;
    
    window.changeLanguage = (lang) => {
      editorInstance.setLanguage(lang);
    };
    
    window.changeTheme = (theme) => {
      // Recreate editor with new theme
      const currentCode = editorInstance.getValue();
      editorInstance.destroy();
      
      editor.createEditor(
        document.getElementById('editor'),
        {
          value: currentCode,
          language: 'javascript',
          theme: theme
        }
      ).then(instance => {
        window.editorInstance = instance;
      });
    };
    
    window.getCode = () => {
      const code = editorInstance.getValue();
      console.log(code);
      alert('Code copied to console!');
    };
  </script>
</body>
</html>
```

## ⚙️ Technical Details

### How It Works

Caret uses a clever layering technique:

1. **Textarea Layer** - Handles user input and cursor management
2. **Pre/Code Layer** - Displays syntax-highlighted code (overlay)
3. **Custom Caret** - Renders a styled Caret in the correct position
4. **Line Numbers** - Dynamically generated and synchronized

The editor synchronizes all layers during:
- Typing (input events)
- Scrolling (scroll events)
- Navigation (click, keyup events)

### Performance

- **Real-time Highlighting**: Uses Highlight.js for fast, accurate syntax highlighting
- **Canvas Measurement**: Employs HTML5 Canvas API for precise text width calculations
- **Event Optimization**: Efficiently updates only what's necessary on each interaction

### Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Requires JavaScript modules support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/pfmcodes/lexius-editor.git

# Navigate to the directory
cd lexius-editor

# Install dependencies
npm install

# Run development server (if applicable)
npm run dev

# Build the project
npm run build
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern JavaScript/TypeScript
- Syntax highlighting powered by Highlight.js
- Inspired by various text editor projects in the JavaScript ecosystem

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/pfmcodes/lexius-editor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pfmcodes/lexius-editor/discussions)

## 🔗 Links

- [GitHub Repository](https://github.com/pfmcodes/lexius-editor)
- [NPM Package](https://www.npmjs.com/package/@pfmcodes/caret) *(if published)*

---

Made with ❤️ by [PFMCODES](https://github.com/PFMCODES)

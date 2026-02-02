function setTheme(name) {
  const link = document.getElementById("Caret-theme");
  link.href = `./highlight.js/styles/${name}.css`;
}

function removeTheme() {
  const link = document.getElementById("Caret-theme");
    if (link) {
        link.parentNode.removeChild(link);
    }
}

const theme = {
    removeTheme,
    setTheme
}

module.exports = theme;
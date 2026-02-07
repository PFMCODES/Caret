function setTheme(name) {
  const link = document.getElementById("Caret-theme");
  link.href = `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/${name}.css`;
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

export default theme;
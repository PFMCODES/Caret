function setTheme(name: string) {
  const link = document.getElementById("Caret-theme") as HTMLLinkElement;
  link.href = `./highlight.js/styles/${name}.css`;
}

function removeTheme() {
  const link = document.getElementById("Caret-theme") as HTMLLinkElement;
    if (link && link.parentNode) {
        link.parentNode.removeChild(link);
    }
}

const theme = {
    removeTheme,
    setTheme
}

export default theme;
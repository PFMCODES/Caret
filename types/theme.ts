function setTheme(name: string) {
  const link = document.getElementById("Caret-theme") as HTMLLinkElement;
  link.href = `./highlight.js/styles/${name}.css`;
}

const theme = {
    setTheme
}

export default theme;

/*
setTheme() -> changes the current highlight.js theme
*/
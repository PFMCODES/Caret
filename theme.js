function setTheme(name) {
  const link = document.getElementById("Caret-theme");
  link.href = `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/${name}.css`;
}

const theme = {
    setTheme
}

export default theme;

/*
setTheme() -> changes the current highlight.js theme
*/
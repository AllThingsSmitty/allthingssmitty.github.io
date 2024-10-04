const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const switchCodepenTheme = () => {
  const cpEls = document.querySelectorAll(".cp_embed_iframe");
  cpEls.forEach((cpEl) => {
    const src = cpEl.getAttribute("src");
    const updatedSrc = prefersDarkMode
      ? src.replace("theme-id=light", "theme-id=dark")
      : src.replace("theme-id=dark", "theme-id=light");
    cpEl.setAttribute("src", updatedSrc);
  });
};

setTimeout(() => {
  switchCodepenTheme();
}, 1000);

const switchTweetTheme = () => {
  const twEl = document.querySelector("[data-tweet-id]");
  const src = twEl ? twEl.getAttribute("src") : null;
  if (twEl) {
    twEl.setAttribute(
      "src",
      src.replace(prefersDarkMode ? "theme=light" : "theme=dark", prefersDarkMode ? "theme=dark" : "theme=light"),
    );
  }
};

setTimeout(() => {
  switchTweetTheme();
}, 1000);

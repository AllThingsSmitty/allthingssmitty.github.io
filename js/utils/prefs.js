function switchCodepenTheme() {
  const cpEl = document.querySelector(".codepen[data-pen-title]");
  cpEl.setAttribute("data-theme-id", prefersDarkMode ? "dark" : "light");
}

function switchTweetTheme() {
  const twEl = document.querySelector("[data-tweet-id]");
  const src = twEl.getAttribute("src");
  twEl.setAttribute(
    "src",
    src.replace(prefersDarkMode ? "theme=light" : "theme=dark", prefersDarkMode ? "theme=dark" : "theme=light"),
  );
}

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

try {
  setTimeout(() => {
    switchCodepenTheme();
  }, 1000);
} catch (error) {
  console.error(`Error switching embedded pen theme: ${error}`);
}

try {
  setTimeout(() => {
    switchTweetTheme();
  }, 1000);
} catch (error) {
  console.error(`Error switching embedded tweet theme: ${error}`);
}

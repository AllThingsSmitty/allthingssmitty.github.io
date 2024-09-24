(function () {
  const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  // codepen
  function switchCodepenTheme() {
    const cpEls = document.querySelectorAll(".codepen[data-pen-title]");
    cpEls.forEach((cpEl) => {
      cpEl.setAttribute("data-theme-id", prefersDarkMode ? "dark" : "light");
    });
  }

  try {
    setTimeout(function () {
      switchCodepenTheme();
    }, 1000);
  } catch (error) {
    console.error(`Error switching embedded pen theme: ${error}`);
  }

  function switchTweetTheme() {
    // tweets
    const twEls = document.querySelectorAll("[data-tweet-id]");
    twEls.forEach((twEl) => {
      const src = twEl.getAttribute("src");
      twEl.setAttribute(
        "src",
        src.replace(prefersDarkMode ? "theme=light" : "theme=dark", prefersDarkMode ? "theme=dark" : "theme=light"),
      );
    });
  }

  try {
    setTimeout(function () {
      switchTweetTheme();
    }, 1000);
  } catch (error) {
    console.error(`Error switching embedded tweet theme: ${error}`);
  }
})();

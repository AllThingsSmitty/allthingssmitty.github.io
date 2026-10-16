const storageKey = "theme-preference";
const root = document.documentElement;
const toggle = document.querySelector("#theme-toggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

// localStorage can throw (e.g. blocked storage), so treat it as optional.
const getSavedTheme = () => {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {}
};

const applyTheme = (theme) => {
  root.dataset.theme = theme;
  // Label the action the button performs, not the current state
  toggle?.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  document.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme } }));
};

// Resolve the theme from the saved choice here too, so we don't depend on the inline script in <head>
// having run. It also syncs the button label.
applyTheme(getSavedTheme() ?? (systemDark.matches ? "dark" : "light"));

// A tap is an explicit choice: it overrides the system setting and is remembered
toggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  saveTheme(next);
  applyTheme(next);
});

// Follow system changes (e.g. a scheduled dark mode at 10pm) unless the visitor has made a choice
systemDark.addEventListener("change", ({ matches }) => {
  if (!getSavedTheme()) applyTheme(matches ? "dark" : "light");
});

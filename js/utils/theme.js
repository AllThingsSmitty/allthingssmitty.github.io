const storageKey = "theme-preference";
const root = document.documentElement;
const toggle = document.querySelector("#theme-toggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const themeColorMetas = document.querySelectorAll('meta[name="theme-color"][media*="prefers-color-scheme"]');

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

const clearTheme = () => {
  try {
    localStorage.removeItem(storageKey);
  } catch {}
};

// The theme-color metas are keyed to the system preference, so point the browser UI color at the
// active theme instead: only the meta for that theme keeps matching.
const syncThemeColor = (theme) => {
  themeColorMetas.forEach((meta) => {
    meta.dataset.scheme ||= meta.media.includes("dark") ? "dark" : "light";
    meta.media = meta.dataset.scheme === theme ? "all" : "not all";
  });
};

const applyTheme = (theme) => {
  root.dataset.theme = theme;
  syncThemeColor(theme);
  // Label the action the button performs, not the current state
  toggle?.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  document.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme } }));
};

// Resolve the theme from the saved choice here too, so we don't depend on the inline script in <head>
// having run. It also syncs the button label.
applyTheme(getSavedTheme() ?? (systemDark.matches ? "dark" : "light"));

// A tap is an explicit choice that overrides the system setting and is remembered, unless it lands
// back on the system's theme, which hands control back to system
toggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  if (next === (systemDark.matches ? "dark" : "light")) clearTheme();
  else saveTheme(next);
  applyTheme(next);
});

// Follow system changes (e.g. a scheduled dark mode at 10pm) unless the visitor has made a choice
systemDark.addEventListener("change", ({ matches }) => {
  if (!getSavedTheme()) applyTheme(matches ? "dark" : "light");
});

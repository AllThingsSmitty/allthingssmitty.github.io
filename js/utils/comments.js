const loadDisqus = () => {
  const script = document.createElement("script");
  script.src = "https://allthingssmitty-com.disqus.com/embed.js";
  script.async = true;
  script.dataset.timestamp = String(Date.now());
  document.head.appendChild(script);
};

// Defer the heavy Disqus embed until the thread is near the viewport.
const initializeDisqus = () => {
  const el = document.querySelector("#disqus_thread");
  if (!el) return;

  if (!("IntersectionObserver" in window)) {
    loadDisqus();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        loadDisqus();
      }
    },
    { rootMargin: "300px 0px" },
  );
  observer.observe(el);
};

const setDefaultCommentCounts = () => {
  document.querySelectorAll(".disqus-comment-count").forEach((el) => {
    if (!el.textContent.trim()) {
      el.textContent = "0 comments";
    }
  });
};

// Disqus picks its color scheme once, when the embed loads, so reload the thread after a theme
// change. Only reload if the embed has already loaded; otherwise it will pick up the new theme itself.
let reloadPending = false;

const reloadDisqus = () => {
  if (!window.DISQUS) return;

  // The reply box lives in a cross-origin iframe, so we can't see a draft. Don't reset while the
  // visitor is focused in it (reloading would discard what they're typing); retry once focus returns.
  if (document.activeElement?.closest("#disqus_thread")) {
    reloadPending = true;
    return;
  }
  reloadPending = false;

  const url = document.querySelector('link[rel="canonical"]')?.href || location.origin + location.pathname;
  window.DISQUS.reset({
    reload: true,
    config() {
      this.page.url = url;
      this.page.identifier = url;
    },
  });
};

document.addEventListener("themechange", () => {
  // Wait a frame so the new theme's computed colors are in place when Disqus reads them
  requestAnimationFrame(reloadDisqus);
});

window.addEventListener("focus", () => {
  if (reloadPending) requestAnimationFrame(reloadDisqus);
});

// Safe initialization
initializeDisqus();
setDefaultCommentCounts();

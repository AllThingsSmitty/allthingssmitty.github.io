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

// Safe initialization
initializeDisqus();
setDefaultCommentCounts();

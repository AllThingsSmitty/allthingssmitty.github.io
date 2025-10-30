const initializeDisqus = () => {
  const el = document.querySelector("#disqus_thread");
  if (!el) return;

  const script = document.createElement("script");
  script.src = "https://allthingssmitty-com.disqus.com/embed.js";
  script.dataset.timestamp = Date.now();
  document.head.appendChild(script);
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

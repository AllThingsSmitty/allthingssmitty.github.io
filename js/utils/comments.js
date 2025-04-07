try {
  const initializeDisqus = () => {
    const el = document.querySelector("#disqus_thread");

    if (el) {
      const s = document.createElement("script");
      s.src = "https://allthingssmitty-com.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      document.head.appendChild(s);

      // // Disqus theme switching
      // document.addEventListener("themeChanged", function (e) {
      //   if (document.readyState == "complete") {
      //     DISQUS.reset({ reload: true });
      //     console.log("reloading Disqus");
      //   }
      // });
    }
  };

  const setDefaultCommentCounts = () => {
    const commentEls = document.querySelectorAll(".disqus-comment-count");
    commentEls.forEach((commentEl) => {
      if (!commentEl.textContent.trim()) {
        commentEl.textContent = "0 comments";
      }
    });
  };

  // Initialize Disqus and set default comment counts
  initializeDisqus();
  setDefaultCommentCounts();
} catch (error) {
  console.error("An error occurred while initializing Disqus:", error);
}

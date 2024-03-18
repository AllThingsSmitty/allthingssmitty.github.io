(function () {
  const d = document;
  const el = d.querySelector("#disqus_thread");

  try {
    if (el) {
      s = d.createElement("script");
      s.src = "https://allthingssmitty-com.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
})();

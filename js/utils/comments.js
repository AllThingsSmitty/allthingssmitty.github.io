try {
  const el = document.querySelector("#disqus_thread");

  if (el) {
    const s = document.createElement("script");
    s.src = "https://allthingssmitty-com.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    document.head.appendChild(s);
  }
} catch (error) {
  console.error(`An error occurred: ${error}`);
}

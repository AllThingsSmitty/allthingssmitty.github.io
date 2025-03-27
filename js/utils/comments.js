try {
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
} catch (error) {
  console.error(`An error occurred: ${error}`);
}

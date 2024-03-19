(function () {
  const d = document;
  const scrollToTopBtn = d.querySelector(".scrollToTop");
  const rootElement = d.documentElement;

  const handleScroll = () => {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    scrollToTopBtn.classList.toggle("showBtn", rootElement.scrollTop / scrollTotal > 0.3);
  };

  const scrollToTop = () => {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  try {
    scrollToTopBtn.addEventListener("click", scrollToTop);
    d.addEventListener("scroll", handleScroll);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
})();

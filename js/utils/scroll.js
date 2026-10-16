const scrollToTopBtn = document.querySelector(".scrollToTop");

if (scrollToTopBtn) {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const handleScroll = () => {
    const scrollable = root.scrollHeight - root.clientHeight;
    const scrollRatio = scrollable > 0 ? root.scrollTop / scrollable : 0;
    scrollToTopBtn.classList.toggle("showBtn", scrollRatio > 0.25);
  };

  const scrollToTop = () => {
    root.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
  };

  scrollToTopBtn.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

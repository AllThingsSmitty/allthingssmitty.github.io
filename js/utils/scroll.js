const scrollToTopBtn = document.querySelector(".scrollToTop");

if (scrollToTopBtn) {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const handleScroll = () => {
    const pageIsLongEnough = root.scrollHeight > 1000;
    const scrollable = root.scrollHeight - root.clientHeight;
    const scrollRatio = scrollable > 0 ? root.scrollTop / scrollable : 0;

    const show = pageIsLongEnough && scrollRatio > 0.25;

    scrollToTopBtn.classList.toggle("showBtn", show);
    // Keep the hidden button out of the tab order. tabindex (unlike visibility) doesn't drop focus
    // from a just-clicked button, which would interrupt the smooth scroll.
    scrollToTopBtn.tabIndex = show ? 0 : -1;
  };

  const scrollToTop = () => {
    root.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
  };

  scrollToTopBtn.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

const scrollToTopBtn = document.querySelector(".scrollToTop");
const root = document.documentElement;

const handleScroll = () => {
  const scrollRatio = root.scrollTop / (root.scrollHeight - root.clientHeight);
  scrollToTopBtn?.classList.toggle("showBtn", scrollRatio > 0.25);
};

const scrollToTop = () => {
  root.scrollTo({ top: 0, behavior: "smooth" });
};

scrollToTopBtn?.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

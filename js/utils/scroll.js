const scrollToTopBtn = document.querySelector(".scrollToTop");
const rootElement = document.documentElement;

const handleScroll = () => {
  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  scrollToTopBtn?.classList.toggle("showBtn", rootElement.scrollTop / scrollTotal > 0.25);
};

const scrollToTop = () => {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

try {
  scrollToTopBtn?.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", handleScroll);
} catch (error) {
  console.error(`An error occurred: ${error}`);
}

// scroll
(function () {
  const scrollToTopBtn = document.querySelector('.scrollToTop'),
  rootElement = document.documentElement;
  
  function handleScroll() {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    scrollToTopBtn.classList.toggle('showBtn', rootElement.scrollTop / scrollTotal > 0.3);
  }
  
  function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  scrollToTopBtn.addEventListener('click', scrollToTop);
  document.addEventListener('scroll', handleScroll);
})();

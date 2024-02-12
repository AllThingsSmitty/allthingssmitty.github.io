// scroll
(function () {
  const scrollToTopBtn = document.querySelector('.scrollToTop'),
  rootElement = document.documentElement;
  
  function handleScroll() {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.3) {
      scrollToTopBtn.classList.add('showBtn');
    } else {
      scrollToTopBtn.classList.remove('showBtn');
    }
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

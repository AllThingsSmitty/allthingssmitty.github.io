// page views
(function () {
  const pageViews = [...document.querySelectorAll('.page-views')];
  const addCommas = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  try {
    pageViews.forEach((e) => {
      const numericValue = e.textContent;
      const formattedValue = addCommas(numericValue);
      e.textContent = formattedValue;
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

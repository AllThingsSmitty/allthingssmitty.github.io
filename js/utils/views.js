// page views
(function () {
  const pageViews = document.querySelectorAll('.page-views');
  pageViews.forEach((e) => {
    const numericValue = e.textContent;
    const formattedValue = addCommas(numericValue);
    e.textContent = formattedValue;
  });

  function addCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
})();
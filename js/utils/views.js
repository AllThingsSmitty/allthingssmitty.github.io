(function () {
  const d = document;
  const pageViews = d.querySelectorAll(".page-views");
  const addCommas = (value) => {
    try {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (error) {
      console.error(`Error adding commas: ${error}`);
      return value;
    }
  };

  try {
    pageViews.forEach((e) => {
      try {
        const numericValue = e.textContent;
        const formattedValue = addCommas(numericValue);
        e.textContent = formattedValue;
      } catch (error) {
        console.error(`Error formatting page view value: ${error}`);
      }
    });
  } catch (error) {
    console.error(`Error processing page views: ${error}`);
  }
})();

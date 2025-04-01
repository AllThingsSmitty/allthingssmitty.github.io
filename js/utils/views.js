const formatPageViews = () => {
  const pageViews = [...document.querySelectorAll(".page-views")];
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

  // Hide view element if page views are set to 0
  try {
    const viewEls = [...document.querySelectorAll(".post-header__meta .views")];
    viewEls.forEach((viewEl) => {
      if (viewEl && viewEl.innerText.trim() === "0 views") {
        viewEl.style.display = "none";
      }
    });
  } catch (error) {
    console.error(`Error hiding page views: ${error}`);
  }
};

formatPageViews();

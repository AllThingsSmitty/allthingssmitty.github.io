const formatPageViews = () => {
  const addCommas = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Format page views
  document.querySelectorAll(".page-views").forEach((element) => {
    element.textContent = addCommas(element.textContent);
  });

  // Hide view elements if page views are set to "0 views"
  document.querySelectorAll(".post-header__meta .views").forEach((element) => {
    if (element.innerText.trim() === "0 views") {
      element.style.display = "none";
    }
  });
};

formatPageViews();

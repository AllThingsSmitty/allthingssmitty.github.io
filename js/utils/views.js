const formatPageViews = () => {
  const formatter = new Intl.NumberFormat();

  // Format page views (e.g. "12345 views" -> "12,345 views")
  document.querySelectorAll(".page-views").forEach((element) => {
    element.textContent = element.textContent.replace(/\d+/, (digits) => formatter.format(Number(digits)));
  });

  // Hide view elements if page views are set to "0 views"
  document.querySelectorAll(".post-header__meta .views").forEach((element) => {
    if (element.textContent.replace(/\s+/g, " ").trim() === "0 views") {
      element.style.display = "none";
    }
  });
};

formatPageViews();

const formatPageViews = () => {
  const addCommas = (value) => {
    try {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (error) {
      console.error(`Error adding commas: ${error}`);
      return value;
    }
  };

  const formatElements = (selector, formatter) => {
    try {
      const elements = [...document.querySelectorAll(selector)];
      elements.forEach((element) => {
        try {
          const formattedValue = formatter(element.textContent);
          element.textContent = formattedValue;
        } catch (error) {
          console.error(`Error formatting element: ${error}`);
        }
      });
    } catch (error) {
      console.error(`Error processing elements for selector "${selector}": ${error}`);
    }
  };

  const hideElements = (selector, condition) => {
    try {
      const elements = [...document.querySelectorAll(selector)];
      elements.forEach((element) => {
        if (condition(element)) {
          element.style.display = "none";
        }
      });
    } catch (error) {
      console.error(`Error hiding elements for selector "${selector}": ${error}`);
    }
  };

  // Format page views
  formatElements(".page-views", addCommas);

  // Hide view elements if page views are set to "0 views"
  hideElements(".post-header__meta .views", (el) => el.innerText.trim() === "0 views");
};

formatPageViews();

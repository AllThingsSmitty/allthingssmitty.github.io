// check for when the fonts are finished loading and add the `fonts-loaded` class to the HTML tag
(function (w) {
  if (w.document.documentElement.className.indexOf('fonts-loaded') > -1) {
    return;
  }
  var bitter = new w.FontFaceObserver('Bitter', {
    weight: 400
  }),
    opensans = new w.FontFaceObserver('Open Sans', {
      weight: 700
    });
  
  w.Promise
    .all([bitter.check()])
    .all([opensans.check()])
    .then(function () {
      w.document.documentElement.className += ' fonts-loaded';
    });
}(this));


// check if Font Awesome CDN loaded
(function () {
  var span = document.createElement('span'),
    headHTML = document.head.innerHTML;

  span.className = 'fa';
  span.style.display = 'none';
  document.body.insertBefore(span, document.body.firstChild);

  // get the computed style property and value of an element
  function css(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }

  if ((css(span, 'font-family')) !== 'FontAwesome') {
    headHTML += '<link rel="stylesheet" href="third-party/font-awesome/css/font-awesome.min.css">';
    document.head.innerHTML = headHTML;
  }
  document.body.removeChild(span);
  return;
}());
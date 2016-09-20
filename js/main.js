// check for when the fonts are finished loading and add the `fonts-loaded` class to the HTML tag
(function (w) {
  if (w.document.documentElement.className.indexOf('fonts-loaded') > -1) {
    return;
  }
  var bitter400 = new w.FontFaceObserver('Bitter', {
    weight: 400
  }),
    bitter400italic = new w.FontFaceObserver('Bitter', {
      weight: 400,
      style: 'italic'
    }),
    bitter700 = new w.FontFaceObserver('Bitter', {
      weight: 700
    }),
    opensans400 = new w.FontFaceObserver('Open Sans', {
      weight: 400
    }),
    opensans600 = new w.FontFaceObserver('Open Sans', {
      weight: 600
    }),
    opensans700 = new w.FontFaceObserver('Open Sans', {
      weight: 700
    });
  
  w.Promise
    .all([bitter400.check(), bitter400italic.check(), bitter700.check(), opensans400.check(), opensans600.check(), opensans700.check()])
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
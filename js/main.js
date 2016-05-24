// check for when the fonts are finished loading and add the `fonts-loaded` class to the HTML tag
(function (w) {
  if (w.document.documentElement.className.indexOf('fonts-loaded') > -1) {
    return;
  }
  var slabo = new w.FontFaceObserver('Slabo27px', {
    weight: 500
  });

  w.Promise
    .all([slabo.check()])
    .then(function () {
      w.document.documentElement.className += ' fonts-loaded';
    });
}(this));


// get the computed style property and value of an element
function css(element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}


// add a <span> to the start of the body and check if `FontAwesome` is the font-family
window.onload = function () {
  var span = document.createElement('span'),
    headHTML = document.head.innerHTML;

  span.className = 'fa';
  span.style.display = 'none';
  document.body.insertBefore(span, document.body.firstChild);
  if ((css(span, 'font-family')) !== 'FontAwesome') {
    headHTML += '<link rel="stylesheet" href="third-party/font-awesome/css/font-awesome.min.css">';
    document.head.innerHTML = headHTML;
  }
  document.body.removeChild(span);
  return;
};
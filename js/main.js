function css(element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}

window.onload = function () {
  var span = document.createElement('span'),
    headHTML = document.head.innerHTML;

  span.className = 'fa';
  span.style.display = 'none';
  document.body.insertBefore(span, document.body.firstChild);
  if ((css(span, 'font-family')) !== 'FontAwesome') {
    headHTML += '<link rel="stylesheet" href="third-party/font-awesome/css/font-awesome.min.css">';
    document.head.innerHTML = headHTML;
  } else {
    return;
  }
  document.body.removeChild(span);
  return;
};
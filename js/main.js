window.onload = function () {
  var span = document.createElement('span'),
    headHTML = document.head.innerHTML;

  span.className = 'fa';
  span.style.display = 'none';
  document.body.insertBefore(span, document.body.firstChild);
  if (span.style.fontFamily !== 'FontAwesome') {
    headHTML += '<link rel="stylesheet" href="third-party/font-awesome/css/font-awesome.min.css">';
    document.head.innerHTML = headHTML;
  }
  document.body.removeChild(span);
};


/*

(function ($) {
  var $span = $('<span class="fa" style="display: none;"></span>').appendTo('body');
  if ($span.css('fontFamily') !== 'FontAwesome') {
    // local fallback
    $('head').append('<link rel="stylesheet" href="third-party/font-awesome/css/font-awesome.min.css">');
  }
  $span.remove();
}(jQuery));

*/
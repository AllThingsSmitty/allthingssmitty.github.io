(function ($) {
  var $span = $('<span class="fa" style="display: none;"></span>').appendTo('body');
  if ($span.css('fontFamily') !== 'FontAwesome') {
    // local fallback
    $('head').append('<link rel="stylesheet" href="third-party/font-awesome/css/font-awesome.min.css">');
  }
  $span.remove();
}(jQuery));
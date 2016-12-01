(function () {
  'use strict';
  if (document.documentElement.className.indexOf('fonts-loaded') > -1) {
    return;
  }
  var BitterRegular = new FontFaceObserver('BitterRegular'),
    BitterItalic = new FontFaceObserver('BitterItalic'),
    BitterBold = new FontFaceObserver('BitterBold'),
    BitterBoldItalic = new FontFaceObserver('BitterBoldItalic'),
    OpenSansRegular = new FontFaceObserver('OpenSansRegular'),
    OpenSansSemibold = new FontFaceObserver('OpenSansSemibold'),
    OpenSansBold = new FontFaceObserver('OpenSansBold'),
    Inconsolata = new FontFaceObserver('Inconsolata');
  Promise.all([
    BitterRegular.load(),
    BitterItalic.load(),
    BitterBold.load(),
    BitterBoldItalic.load(),
    OpenSansRegular.load(),
    OpenSansSemibold.load(),
    OpenSansBold.load(),
    Inconsolata.load()
  ]).then(function () {
    document.documentElement.className += 'fonts-loaded';
    console.log('All fonts loaded');
  });
}());
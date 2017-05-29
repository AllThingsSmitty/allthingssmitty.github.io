(function () {
  'use strict';
  if (document.documentElement.className.indexOf('fonts-loaded') > -1) {
    return;
  }
  var BitterRegular = new FontFaceObserver('BitterRegular', {
    weight: 400
  }),
    BitterItalic = new FontFaceObserver('BitterItalic', {
      weight: 400
    }),
    BitterBold = new FontFaceObserver('BitterBold', {
      weight: 700
    }),
    BitterBoldItalic = new FontFaceObserver('BitterBoldItalic', {
      weight: 700
    }),
    OpenSansRegular = new FontFaceObserver('OpenSansRegular', {
      weight: 400
    }),
    OpenSansSemibold = new FontFaceObserver('OpenSansSemibold', {
      weight: 600
    }),
    OpenSansBold = new FontFaceObserver('OpenSansBold', {
      weight: 700
    }),
    Inconsolata = new FontFaceObserver('Inconsolata', {
      weight: 400
    });
  
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
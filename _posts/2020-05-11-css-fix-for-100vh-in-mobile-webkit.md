---
layout: post
title: CSS fix for 100vh in mobile WebKit
description: WebKit handles 100vh in a way that differs from other browsers, which can complicate some layouts. But using -webkit-fill-available might be a good enough alternative to get by. 
image: img/posts/sunset-home-office-min.jpg
tags: [CSS, HTML]
comments: true
---

Not long ago there was some buzz around how WebKit handles `100vh` in CSS, essentially ignoring the bottom edge of the browser viewport. Some have suggested not using `100vh`, others have come up with [different alternatives](https://medium.com/@susiekim9/how-to-compensate-for-the-ios-viewport-unit-bug-46e78d54af0d){:rel="external"} to work around the problem. In fact, this issue goes further back a few years when Nicolas Hoizey [filed a bug with WebKit](https://nicolas-hoizey.com/articles/2015/02/18/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers/){:rel="external"} on the subject (the short of it: WebKit says this is "intentional" <span class="emoji__x-sm" role="img" aria-label="emoji face with monocle">&#x1F9D0;</span>).

The other day I was doing some work with a basic flexbox layout -- header, main, sticky footer -- the kind we've all seen and used many times before:

```html
<body>
  <header>HEADER GOES HERE</header>
  <main>MAIN GOES HERE</main>
  <footer>FOOTER GOES HERE</footer>
</body>
```

```css
body {
  display: flex; 
  flex-direction: column;
  margin: 0;
  min-height: 100vh;
}

main {
  flex: 1;
}
```

 I began running some browser tests on my iPhone, and that's when I noticed that my sticky footer wasn't looking so sticky:

{::nomarkdown}
<img src="/img/posts/2020-05-11-css-fix-for-100vh-in-mobile-webkit-01.png" alt="iPhone screen showing sticky footer below Safari browser's menu bar." height="auto" width="auto" class="center" />
{:/}

The footer was hiding below Safari's menu bar. This is the `100vh` bug (feature?) that Nicolas originally uncovered and reported. I did a little sleuthing -- hoping that maybe by now a non-hacky fix had been found -- and that's when I stumbled upon my own solution (btw, it's totally hacky):

<div class="embed">
  <blockquote class="twitter-tweet tw-align-center"><p lang="en" dir="ltr">🔥 TIL a <a href="https://twitter.com/hashtag/CSS?src=hash&amp;ref_src=twsrc%5Etfw">#CSS</a> trick to handle that annoying mobile viewport bug with `100vh` in WebKit (iOS Safari)! <a href="https://twitter.com/hashtag/WebDev?src=hash&amp;ref_src=twsrc%5Etfw">#WebDev</a> <a href="https://twitter.com/hashtag/ProTip?src=hash&amp;ref_src=twsrc%5Etfw">#ProTip</a> <a href="https://t.co/lefD0Klqzd">pic.twitter.com/lefD0Klqzd</a></p>&mdash; Matt Smith (@AllThingsSmitty) <a href="https://twitter.com/AllThingsSmitty/status/1254151507412496384?ref_src=twsrc%5Etfw">April 25, 2020</a></blockquote>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

## Using -webkit-fill-available

The idea behind `-webkit-fill-available` -- at least at one point -- was to allow for an element to intrinsically fit into a particular layout, i.e., fill the available space for that property. At the moment [intrinsic values](https://caniuse.com/#feat=intrinsic-width){:rel="external"} like this aren't fully supported by the CSSWG.

However, the above problem is specifically in WebKit, which _does_ support `-webkit-fill-available`. So with that in mind, I added it to my ruleset with `100vh` as the fallback for all other browsers.

```css
body {
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}
```

<aside class="message" role="note">
This code was updated to include the <code>html</code> selector after I was told that <a href="https://twitter.com/bfgeek/status/1262459015155441664" rel="external">Chrome is updating the behavior</a> to match Firefox’s implementation.
</aside>

And now the sticky footer is right where I want it to be in mobile Safari!

{::nomarkdown}
<img src="/img/posts/2020-05-11-css-fix-for-100vh-in-mobile-webkit-02.png" alt="iPhone screen showing sticky footer at the bottom of the viewport above Safari browser's menu bar" height="auto" width="auto" class="center" />
{:/}

## Does this really work?

The jury seems to be out on this. I've had no problems with any of the tests I've run and I'm using this method in production right now. But I did receive a number of responses to my tweet pointing to other possible problems with using this (the effects of rotating devices, Chrome not completely ignoring the property, etc.).

Will `-webkit-fill-available` work in every scenario? Probably not, cuz let's be honest: this is the web, and it can be damn hard to build. But, if you're having a problem with `100vh` in WebKit and you're looking for a CSS alternative, you might want to try this.
---
layout: post
title: Flexible type with :root
description: There are a few different ways to manage responsive type on the web. My personal approach is to use the :root selector for maximum flexibility.
image: img/posts/sunset-home-office-min.jpg
tags: [CSS, mobile]
comments: true
views:
  ua: 16081
  ga4: 476
---

One element of responsive web design that can be tricky to solve for is typography. Ideally you want to have type that's as fluid as possible across different viewports. A conventional way of doing this might be to start with a base font size and then change it when you hit a specific breakpoint:

```css
p {
  font-size: 1em;
}

@media screen and (max-width: 45em) {
  p {
    font-size: 1.25em;
  }
}
```

Here the font size doesn't change until the breakpoint is reached.


## Using :root

My preferred approach for more flexible type is to calculate the font size based on the viewport height and width using the `:root` selector:

```css
:root {
  font-size: calc(1vw + 1vh + .5vmin);
}
```

Now you can utilize the root `em` unit based on the value calculated by `:root`:

```css
body {
  font: 1rem/1.6 sans-serif;
}
```

## Viewport units

You'll notice the `calc()` function has been passed values in viewport units. Let's quickly review those to understand how the root font size is being calculated.

* `1vw` = 1% of viewport width
* `1vh` = 1% of viewport height
* `1vmin` = `1vw` or `1vh`, whichever is smaller
* `1vmax` = `1vw` or `1vh`, whichever is larger

If we apply this to the viewport dimensions of the iPhone 7 (current version at the time of this post), which is 375x667, the calculated value of `:root` would be:

```css
:root {
  font-size: calc(3.75px + 6.67px + 1.875px); /* 1vw + 1vh + .5min */
}
```

<div class="embed">
  <p class="codepen" data-height="450" data-slug-hash="XKgOkR" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/XKgOkR/">Use :root for Flexible Type</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

There will always be different approaches to responsive typography, and we should measure each by what we're trying to solve for, beyond just a responsive state. I've found using `:root` this way provides the most flexible solution.

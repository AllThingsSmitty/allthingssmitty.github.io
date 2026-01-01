---
layout: post
title: Zero-based date, Christmas, and emoji
description: Not every method in JavaScript's Date object returns a zero-based number. Here's a tip will help you understand that a little better.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ua: 1629
  ga4: 130
---

Here's a quick tip if you're starting out with JavaScript: which of the following values passed to the `getMonth()` and `getDate()` methods will print December 25?

```javascript
11,24
11,25
12,25
```

If you answered `11,25`, have some egg nog and an extra piece of ribbon candy, you're doing awesome.

## Zero-based counting

JavaScript counters start at 0. But it's important to know that not every method in the `Date` object returns a zero-based number. Specifically, `getMonth()` counts from 0, whereas `getDate()` counts from 1.

Months can also be represented as a string name, so using zero-based counting for `getMonth()` makes it possible to index months into an array, e.g.:

```javascript
let months = ['Jan', 'Feb', 'Mar', 'Apr'...];
months[new Date().getMonth()];
```

But if you're starting to wonder, "Why does this method count from 0, and this method count from 1?", the answer is a matter of practicality: it's because the `Date` class in Java does it this way.

<div class="embed">
  <blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">@magrangs because that is how java.util.Date did it.</p>&mdash; BrendanEich (@BrendanEich) <a href="https://twitter.com/BrendanEich/status/179610205317902337">March 13, 2012</a></blockquote>
  <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

So there's a bit of nuance with counting using some of the JavaScript `Date` methods. And we know that `11,25` will print December 25.

## Okay, is it Christmas yet?

<div class="embed">
  <p class="codepen" data-height="450" data-slug-hash="MbppLg" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Is It Christmas?" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/MbppLg/">Is It Christmas?</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>
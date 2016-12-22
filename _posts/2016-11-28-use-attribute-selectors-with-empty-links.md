---
layout: post
title: Use attribute selectors with empty links
description: If a hyperlink doesn't have a text value, use CSS attribute selectors to insert the href value in its place.
image: img/posts/sunset-home-office-min.jpg
tags: [CSS]
comments: true
---

Here's a quick CSS tip: if a hyperlink doesn't have a text value, _i.e._, it rendered empty, insert the `href` value in its place:


```css
a[href]:empty::before {
  content: attr(href);
}
```
Why do this? Link text can be overlooked in content generated by a CMS. Rendering the text with the `href` value will help identify missing text more easily.

<div class="embed">
  <p data-height="450" data-theme-id="0" data-slug-hash="zBzXRx" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Use Attribute Selectors with Empty Links" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/zBzXRx/">Use Attribute Selectors with Empty Links</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

I like it.
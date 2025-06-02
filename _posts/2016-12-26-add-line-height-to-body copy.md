---
layout: post
title: Add line height to body
description: It's not necessary to add line height to each separate textual element. Here's a helpful tip for elements to inherit line height from the body.
image: img/posts/sunset-home-office-min.jpg
tags: [CSS]
comments: true
views:
  ua: 4681
  ga4: 54
---

If you've been adding line height to each textual element separately, e.g., `<h*>`, `<p>`, etc., this is a helpful tip that you'll want to try: add line height to the `body` selector instead.

```css
body {
  line-height: 1.5;
}
```

Now all textual elements will have a consistent line height that is inherited from the body. This gives text a more uniform display on the page.

## Unitless line height

Always specify the line height as a unitless number, e.g., `line-height: 1.5;`. That way descendent elements that specify a different font size will inherit that number rather than a fixed line height.

<div class="embed">
  <p class="codepen" data-height="450" data-slug-hash="VjbdYd" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Add line-height to Body" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/VjbdYd/">Add line-height to Body</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

Feel free to poke holes in it, but give it a try first.
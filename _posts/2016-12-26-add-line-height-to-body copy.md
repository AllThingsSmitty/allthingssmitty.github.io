---
layout: post
title: Add line height to body
description: It's not necessary to add line height to each separate textual element. Here's a helpful tip for elements to inherit line height from the body.
image: img/posts/sunset-home-office-min.jpg
tags: [CSS]
comments: true
---

If you've been adding line height to each textual element separately, e.g., `<h*>`, `<p>`, etc., this is a help tip that you might want to try: add `line-height` to the `body` selector instead.

```css
body {
  line-height: 1.5;
}
```

Now all textual elements will have a consistent line height that is inherited from the body. This provides a more uniform display for text on the page.

<div class="embed">
  <p data-height="450" data-theme-id="0" data-slug-hash="VjbdYd" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Add line-height to Body" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/VjbdYd/">Add line-height to Body</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

Feel free to poke holes in it, but give it a try first.
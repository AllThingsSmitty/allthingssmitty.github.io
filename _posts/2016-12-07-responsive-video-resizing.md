---
layout: post
title: Responsive video resizing
description:
image: img/posts/sunset-home-office-min.jpg
tags: [CSS, responsive]
comments: true
---

Recently I was looking at some studio sites that I loved visiting back in the Flash heyday, cuz, y'know, Macromedia Flash _was_ amazing (I'll rap battle anyone who says different). I was admiring [EVB](http://evb.com){:rel="external"}'s layout and their hero video banner caught my attention.

The video --- beautiful self-promotion, BTW --- has a responsive container but the content isn't flexible. This gives an effect similar to what we see with [`background-size: cover`](http://codepen.io/AllThingsSmitty/pen/bpYjPO/), where the aspect ratio of the background image is fixed even though the container size changes. This was likely done by design as the video is swapped out in smaller viewports for a static image.

But what if we wanted to make this video be fully responsive, _i.e._, as we might see with the `background-size: contain` effect?

```html
<section>
  <video>
    <source src="my_video.webm" type="video/webm">
    <source src="my_video.mp4" type="video/mp4">
  </video>
</section>
```

All we need to do is set the `height` and `width` values to `100%`:


```css
video {
  height: 100%;
  width: 100%;
}
```

This allows the video to be...its container...

### Good idea?

Not so fast. This can get expensive if you start serving video over mobile data plans.


<div class="embed">
  <p data-height="500" data-theme-id="0" data-slug-hash="KNPOjp" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Responsive 'background-size: contain' Video" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/KNPOjp/">Responsive "background-size: contain" Video</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>
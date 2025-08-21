---
layout: post
title: Responsive video resizing
description: There are many different solutions for responsive images, but video is a media element that's often ignored in fluid layouts. Let's change that by looking at how we can keep video responsive across viewports.
image: img/posts/sunset-home-office-min.jpg
tags: [CSS, mobile]
comments: true
views:
  ua: 56725
  ga4: 2469
---

There are a number of options for implementing responsive images, e.g., the `<picture>` element, client-side polyfills, [automatic cropping](http://cloudinary.com/blog/automatically_art_directed_responsive_images){:rel="external"}, <nobr>et al.</nobr> But what about _video_?

Many of the examples I see in responsive layouts replace video with a static image in smaller viewports. That may be because of concerns regarding data use across mobile networks. But let's say for the moment we wanted to make video fully responsive on the web.

We'll start here:

```html
<video>
  <source src="my_video.webm" type="video/webm">
  <source src="my_video.mp4" type="video/mp4">
</video>
```

To produce an effect that maintains the video's aspect ratio when the parent container changes, similar to `background-size: contain`, the height and width needs to be set to `100%`:

```css
video {
  height: 100%;
  width: 100%;
}
```

That's the bare minimum needed for responsive video.

<div class="embed">
  <p class="codepen" data-height="500" data-slug-hash="KNPOjp" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Responsive 'background-size: contain' Video" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/KNPOjp/">Responsive "background-size: contain" Video</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

Now let's try a solution similar to `background-size: cover`. This will still preserve the aspect ratio, however, if the video and its container have different dimensions then the video will be clipped on the left and right.

```css
video {
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

<div class="embed">
  <p class="codepen" data-height="500" data-slug-hash="NbLLjb" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Responsive 'background-size: cover' Video" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/NbLLjb/">Responsive "background-size: cover" Video  </a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>


## Good idea?

Remember what I said before about data use? This could become expensive for users if you start serving video over mobile networks. Also, I'm not sure displaying video in smaller viewports is any more effective than well-cropped images. Nevertheless, it's an interesting concept to consider. Happy coding.

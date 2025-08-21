---
layout: post
title: Nope, nope, nope, line-height is unitless
description: When setting line-height in CSS, a common mistake is to pass a specific unit for the value. Here's why we should be following the preferred approach and set line-height to a unitless value.
image: img/posts/sunset-home-office-min.jpg
tags: [CSS]
comments: true
views:
  ua: 29170
  ga4: 3357
---

Here's a bit of CSS trivia that, at least on the surface, seems straightforward but that I see misused repeatedly. Let's start with an oldie-but-goodie CSS interview question:

You want the text on your website to be double-spaced by default. Which of the following `line-height` values is the best way to do this?

```markdown
200%

2em

2

double
```

Well, if you read the title of this post then you probably already figured it out. But let's dig into it a bit first.

For starters, `double` is an invalid option. Yup, tricked you! The only keyword value that `line-height` accepts is `normal`. Now, `2em` will certainly give you double-spaced text for the element that it's applied to, but so will `200%`.

The correct answer is `2`.

## What the whaaat?

Okay, that may have confused you a bit, especially since browsers will accept length and percentage values. Let's break it down together.

You should always specify `line-height` as a [unitless number](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#Prefer_unitless_numbers_for_line-height_values){:rel="external"} (say this into the mirror five times). That way descendent elements that specify a different font size will inherit _that_ number instead of a fixed line height.

By making the line height unitless, the browser preserves the `font-size`/`line-height` ratio even if the font size changes. In the example above, if the line height is set on the body selector:

```css
body {
  line-height: 2;
}
```

* the line height for the browser's default `16px` font size will be `32px`
* the line height for the heading's `32px` font will increase to `64px`

Hopefully this helped explain the proper way to use `line-height`. If you're still using a length or percentage value, consider switching to a unitless number. This will give you greater control over your website's text.
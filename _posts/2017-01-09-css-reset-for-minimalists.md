---
layout: post
title: CSS reset for minimalists
description: Browsers have built-in CSS for native styling. Using a CSS reset helps you enforce consistent styling. Here's a 3-line snippet that may do just enough of what you need.
image: img/posts/sunset-home-office-min.jpg
tags: [CSS]
comments: true
views:
  ua: 16232
  ga4: 252
---

CSS resets help enforce style consistency across different browsers by providing a clean slate for styling elements. Resources like Normalize, <nobr>et al.</nobr>, do an excellent job at managing this. For a couple of years now, I've opted to go with a minimalist approach to resets and found it to be just as useful:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

Now elements will be stripped of margins and padding, and `box-sizing` lets you manage layouts using the [CSS box model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model){:rel="external"}.

Another minimalist alternative is to let `box-sizing` be inherited from the `html` selector:

```css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
```

This makes it easier to change `box-sizing` in plugins or other components that leverage other behavior.

## One size fits all?

You might be looking at this and asking the obvious question: "Is that really enough?" CSS reset libraries do a considerable amount of additional work, so it's easy look at this solution and assume three lines of code wouldn't be sufficient. That's up to you to decide.

If this approach does just enough of what you need, why integrate a separate resource? If you decide you need a full CSS library, at least you've given it some additional thought for future projects.

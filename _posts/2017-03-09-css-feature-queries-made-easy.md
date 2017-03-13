---
layout: post
title: CSS feature queries made easy
description: 
image: img/posts/sunset-home-office-min.jpg
tags: [CSS]
comments: true
---

It seems like everyone is talking about feature queries these days.

```css
// fallback code for older browsers (and those that do not support Feature Queries)
.content {
 height: 400px;
 background: purple;
 color: #fff;
}

/* start grid CSS */ 
@supports (display: grid) {
  .content {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;
    background: #f5c531;
    height: 400px;
  }    
}
```
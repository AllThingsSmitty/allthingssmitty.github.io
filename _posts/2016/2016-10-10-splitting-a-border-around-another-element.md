---
layout: post
title: Splitting a border around another element
description: Here's an effect that you may have seen but not realized that can be done with some straightforward CSS.
image: img/posts/sunset-home-office-min.jpg
tags: [CSS, HTML]
comments: true
views:
  ua: 4736
  ga4: 636
---

This is one of those "Can you do that, no you can't do that, but can you really do that?" moments. Splitting the border of an element around another element. Although, I should put quotes around "splitting". You're not actually splitting a border, but rather creating the appearance of it.

First, what the heck am I talking about?

<div class="embed">
  <blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">🔥 <a href="https://twitter.com/hashtag/CSS?src=hash">#CSS</a> trick: split an element's border around another element. 😎 <a href="https://t.co/bkfBUaCtAl">https://t.co/bkfBUaCtAl</a> <a href="https://twitter.com/CodePen">@CodePen</a> <a href="https://twitter.com/hashtag/responsive?src=hash">#responsive</a> <a href="https://twitter.com/hashtag/RWD?src=hash">#RWD</a> <a href="https://t.co/waSqYi6feh">pic.twitter.com/waSqYi6feh</a></p>&mdash; Matt Smith (@AllThingsSmitty) <a href="https://twitter.com/AllThingsSmitty/status/756117334029438976">July 21, 2016</a></blockquote>
  <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

Okay, that's kinda clever. "So...a table?" you might ask.

Nope, a single `<span>`.

"Wuuuuut?"

Let me show you.

## The HTML

```html
<div class="heading" role="banner">
  <div class="split-border"><span></span></div>
  <div class="logo">
    <img src="https://upload.wikimedia.org/wikipedia/en/3/34/SFDC_logo.png" alt="Salesforce logo image">
  </div>
  <h1>The World's No. 1<br>CRM Solution</h1>
</div>
```

**Full disclosure:** I don't have "official" permission to use the Salesforce logo in this demo. So anything you don't like here reflects on my crappy coding and not on Salesforce.


## The CSS

Let's review the styles that help define that border layout:

```css
.heading .logo {
  text-align: center;
}

.split-border {
  text-align: center;
}

.split-border span {
  position: relative;  
}

.split-border span::before,
.split-border span::after {
  border-top: 1px solid #fff;
  content: "";
  position: absolute;
  width: 5.625em;
}

.split-border span::before {
  margin-right: 3.75em;
  right: 100%;
}

.split-border span::after {
  margin-left: 3.75em;
}
```

For starters, the logo image is center-aligned inside the parent `<div>` container:

```css
.heading .logo {
  text-align: center;
}
```

The `.split-border` class also centers the `<span>` inside the parent container:

```css
.split-border {
  text-align: center;
}
```

Now for the fun part...

The `<span>` element's pseudo-elements each have a top border and a specified width:

```css
.split-border span::before,
.split-border span::after {
  border-top: 1px solid #fff;
  content: "";
  position: absolute;
  width: 5.625em;
}
```

That width value corresponds to the overall width of the container element, minus the width of the logo image. When we apply a margin to each pseudo-element (either `margin-left` or `margin-right`, respectively), the "split" effect is created:

```css
.split-border span::before {
  margin-right: 3.75em;
  right: 100%;
}

.split-border span::after {
  margin-left: 3.75em;
}
```

And _voila_...

<div class="embed">
  <p class="codepen" data-height="450" data-slug-hash="bpYjPO" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/bpYjPO/">Fully Responsive Split Line Border</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

## There you have it

This is a trick I'd never done before until another developer asked how I might go about implementing that kind of design. There may be traditional methods (`<table>`) or even more creative solutions (`text-shadow`, maybe?) that will also work for your needs. But it's still a fun exercise. Feel free to play around with it and see what ideas you come up with.
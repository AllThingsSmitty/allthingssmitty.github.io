---
layout: post
title: Accessible floating labels
description: Accessibility is a key piece to building the web, but for some reason using labels is considered unattractive. However, there's a design-friendly way to make accessible labels.
image: img/posts/sunset-home-office-min.jpg
tags: [accessibility, CSS, HTML, JavaScript]
comments: true
views:
  ua: 11892
  ga4: 734
---

<!--<p class="message">This post has been updated to reflect a <a href="http://codepen.io/AllThingsSmitty/pen/VjykOz/">CSS-only approach</a> without the use of the <code class="highlighter-rouge">placeholder</code> attribute on input elements.</p>-->

There's been plenty of [discussion](https://adactio.com/journal/10910){:rel="external"} in recent months regarding accessibility as it relates to the use of labels, which I think is great. Web designers and developers should treat accessibility as a fundamental part of development and not an afterthought.

Still, I see plenty of implementations where labels are ignored for more eye-catching solutions, which in turn creates [accessibility problems](https://medium.com/simple-human/always-use-a-label-a39ceab554e6){:rel="external"}. Interestingly enough, there are plenty of existing, design-friendly patterns using labels. One that's been around for a few years now is floating labels:

<div class="embed">
  <blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">Accessible floating labels: Learn it. Know it. Live it. 😎 🏄🏼 <a href="https://t.co/yD4mmxfl5L">https://t.co/yD4mmxfl5L</a> <a href="https://twitter.com/CodePen">@CodePen</a> <a href="https://twitter.com/hashtag/CSS?src=hash">#CSS</a> <a href="https://twitter.com/hashtag/accessibility?src=hash">#accessibility</a> <a href="https://t.co/5LreGYMJEs">pic.twitter.com/5LreGYMJEs</a></p>&mdash; Matt Smith (@AllThingsSmitty) <a href="https://twitter.com/AllThingsSmitty/status/773156583798927361">September 6, 2016</a></blockquote>
  <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>
  
And it's pretty easy to implement with a small amount of CSS and jQuery.


## The markup

Let's assume we need to build a registration form like the one above. We'll start with the first input and label:

```html
<div class="field">
  <input type="text" id="firstName">
  <label for="firstName">First Name</label>
</div>
```

<del>Here we're using `placeholder` inside the input to specify a short hint to aid the user, but _not as an alternative_ to a label.</del>


## The CSS

The input and label are wrapped inside a container class so the label's interaction will be relatively positioned to the input:

```css
.field {
  position: relative;
}
```

The `label` selector will be defined with this basic ruleset:

```css
label {
  left: .5em;
  opacity: 1;
  position: absolute;
  top: .25em;
  transition: all 0.1s linear;
}
```

The label's initial position will be "inside" the input element (it's actually just resting on top of it). <del>Now we'll add a class for this selector that will be dynamically added on user input:</del> We want to transition the label's position when the input has focus so it moves above the input:

```css
input:focus + label,
input + label.show {
  color: #2ea8c5;
  font-size: 1.15em;
  left: .75em;
  opacity: 1;
  top: -1em;
}
```

The `.show` class will be used by our jQuery code, so let's get started on that.


## The jQuery

First, let's create a function and add a variable for the `.show` class:

```javascript
$(function () {
  let showClass = 'show';
});
```

Next, we'll add an inner function that checks if `<input>` is empty:

```javascript
$(function () {
  let showClass = 'show';
  
  $('input').on('checkval', function () {
    let label = $(this).next('label');
    if(this.value !== '') {
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  })
});
```

If the input has a value then the `.show` class will be added to the label to keep it positioned above the input.

Lastly, we'll include an event listener for when the user enters a character, which checks the value of `<input>`:

```javascript
$(function () {
  let showClass = 'show';
  
  $('input').on('checkval', function () {
    let label = $(this).next('label');
    if(this.value !== '') {
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  }).on('keyup', function () {
    $(this).trigger('checkval');
  });
});
```

There you have it.

<div class="embed">
  <p class="codepen" data-height="500" data-slug-hash="VjykOz" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/VjykOz/">Accessible Floating Labels</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>


## Accessibility FTW!

The point here isn't to ignore accessibility in favor of design. The challenge is to craft an experience that's not only functional for _some_ users, but to fully engage _all_ users by making accessibility an integral part of development!
---
layout: post
title: Accessible floating labels
description: Accessibility is a key piece to building the web, but for some reason using labels is considered unattractive. However, there's a design-friendly way to make accessible labels.
image: img/posts/sunset-home-office-min.jpg
tags: [accessibility, CSS]
comments: true
---

<p class="message">This demo has since been updated to reflect a CSS-only approach that removes the use of the <code>:placeholder</code> pseudo-class. View the <a href="http://codepen.io/AllThingsSmitty/pen/VjykOz/">updated demo</a>.</p>

There's been plenty of [discussion](https://adactio.com/journal/10910){:rel="external"} in recent months regarding accessibility as it relates to the use of labels, which I think is great. Web designers and developers should treat accessibility as a fundamental part of development and not an afterthought.

Still, I see plenty of implementations where labels are ignored for more eye-catching solutions, which in turn creates [accessibility problems](https://medium.com/simple-human/always-use-a-label-a39ceab554e6){:rel="external"}. Interestingly enough, there are plenty of existing, design-friendly patterns using labels. One that's been around for a few years now is floating labels:

<div class="embed">
  <blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">Accessible floating labels: Learn it. Know it. Live it. 😎 🏄🏼 <a href="https://t.co/yD4mmxfl5L">https://t.co/yD4mmxfl5L</a> <a href="https://twitter.com/CodePen">@CodePen</a> <a href="https://twitter.com/hashtag/CSS?src=hash">#CSS</a> <a href="https://twitter.com/hashtag/accessibility?src=hash">#accessibility</a> <a href="https://t.co/5LreGYMJEs">pic.twitter.com/5LreGYMJEs</a></p>&mdash; Matt Smith (@AllThingsSmitty) <a href="https://twitter.com/AllThingsSmitty/status/773156583798927361">September 6, 2016</a></blockquote>
  <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>
  
And it's pretty easy to implement with just a small amount of CSS and jQuery.


## The markup

Let's assume we need to build a registration form like the one above. We'll start with the first input and label:

```html
<div class="field">
  <label for="firstName">First Name</label>
  <input type="text" id="firstName" placeholder="First Name">
</div>
```

Here we're using `placeholder` inside the input to specify a short hint to aid the user, but _not as an alternative_ to a label[^fn-footnote_1].


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
  opacity: 0;
  position: absolute;
  top: 2em;
  transition: all 0.1s linear;
  z-index: -1;
}
```

Now we'll add a class for this selector that will be dynamically added on user input:

```css
label.show {
  opacity: 1;
  top: -1em;
  z-index: 1;
}
```


## The jQuery

First, let's create a function and add a variable for the `.show` class:

```javascript
$(function () {
  var showClass = 'show';
});
```

Next, we'll add an inner function that checks if `<input>` is empty:

```javascript
$(function () {
  var showClass = 'show';
  
  $('input').on('checkval', function () {
    var label = $(this).prev('label');
    if(this.value !== '') {
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  })
});
```

If the input has a value then the `.show` class will be added to the label, triggering the "floating" transition effect.

Lastly, we'll include an event listener for when the user enters a character, which checks the value of `<input>`:

```javascript
$(function () {
  var showClass = 'show';
  
  $('input').on('checkval', function () {
    var label = $(this).prev('label');
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
  <p data-height="600" data-theme-id="0" data-slug-hash="VjykOz" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/VjykOz/">Accessible Floating Labels</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>


## Accessibility FTW!

The point here isn't to ignore accessibility in favor of design. The challenge is to craft an experience that's not only functional for _some_ users, but to fully engage _all_ users by making accessibility an integral part of development.

-----

[^fn-footnote_1]: [HTML5 W3C Recommendation 28 October 2014: The Placeholder Attribute](https://www.w3.org/TR/html5/forms.html#the-placeholder-attribute)
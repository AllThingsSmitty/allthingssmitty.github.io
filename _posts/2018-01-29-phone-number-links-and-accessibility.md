---
layout: post
title: Phone number links and accessibility
description: Phone number links are a great feature but styling them to not show on larger screens can be an accessibility concern and detected by screen readers. Here's a useful tip on making the links both functional and accessible.
image: img/posts/sunset-home-office-min.jpg
tags: [accessibility, JavaScript, mobile, UX]
comments: true
views:
  ua: 13818
  ga4: 4757
---

<aside class="message notification" role="note">
  I currently promote using the default styling of links for phone numbers. I've left this post up for historical purposes.
</aside>

<div class="break"></div>

One UX challenge that used to give me pause was making phone numbers accessible in the browser while still being functional. Here's what I mean about that. The [WCAG 2.0 guidelines](https://www.w3.org/TR/WCAG20-TECHS/F73.html#F73-description){:rel="external"} state:

<blockquote class="message">Link underlines or some other non-color visual distinction are required (when the links are discernible to those with color vision).</blockquote>

Consider for a moment how we code a [phone number link](https://css-tricks.com/the-current-state-of-telephone-links/){:rel="external"} to function when tapped in a mobile browser:

```html
<a href="tel:123-456-7890">123-456-7890</a>
```

Previously, if it didn't make sense to show a phone number link on a non-mobile screen we'd style it to resemble plain text, then display the link styling for mobile screens. But that solution goes against the above WCAG guidelines. And screen readers will read the `<a>` element for the phone number as a link even if it isn't visually styled like one.

You also want to avoid creating two separate HTML elements and using conditional CSS to display the appropriate one based on viewport. If CSS is disabled in the browser (a point that can be debated regarding the viability of accessibility testing semantic structure), both phone numbers will be displayed.

So, what can be done?

## Swap out the element

We can replace elements in the DOM with JavaScript. In this scenario, if we've already created a `<span>` for a phone number, we can dynamically replace it with an `<a>` when we choose.

So, given:

```html
<span class="number">123-456-7890</span>
```

Let's set up some variables for our existing phone number element and the new element we'll use to replace it:

```javascript
const num = document.querySelector('.number'),
      newEl = document.createElement('a');
```

We'll be using an event listener to check for when the page loads, and also getting the screen width from the client:

```javascript
const num = document.querySelector('.number'),
      newEl = document.createElement('a');

window.addEventListener('load', () => {
  viewportWidth = window.innerWidth || document.documentElement.clientWidth;

}, false);
```

## Using replaceChild()

Now that we have our basic shell of a function, we can add values for our new element. After that we can call [`replaceChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild){:rel="external"} method to replace the `<span>` element with `<a>` when the viewport/screen reaches a specific width:

```js
const num = document.querySelector('.number'),
      newEl = document.createElement('a');

window.addEventListener('resize', () => {
  viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  newEl.setAttribute('href', 'tel:' + num.innerHTML);
  newEl.innerHTML = num.innerHTML;

  if (viewportWidth < 700) {
    num.parentNode.replaceChild(newEl, num);
  }
}, false);
```

<aside class="message notification" role="note">I received a lot of feedback pointing out that this pattern could reduce overall accessibility when interacting with VoIP technology.</aside>

Here's our new pattern in action, with the element being replaced on load depending on whether the parent container is a specific size.

<div class="embed">
  <p class="codepen" data-height="450" data-slug-hash="jYgRqV" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Phone Link Accessibility Dilemma" class="codepen">See the Pen <a href="https://codepen.io/AllThingsSmitty/pen/jYgRqV/">Phone Link Accessibility Dilemma</a> by Matt Smith (<a href="https://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="https://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

Now we have a solution that's both accessible _and_ functional when appropriate. To me this makes sense, although I've heard concerns with this disrupting VoIP features with non-mobile screens (e.g., Teams, Slack). If you'd like to improve upon this method or have another solution for this scenario, I'd love to see what you come up with. Happy coding!

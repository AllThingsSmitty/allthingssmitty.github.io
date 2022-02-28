---
layout: post
title: Phone number links and accessibility
description: Phone number links are a great feature but styling them to not show on larger screens can be an accessibility concern and detected by screen readers. Here's a useful tip on making the links both functional and accessible.
image: img/posts/sunset-home-office-min.jpg
tags: [accessibility, 'UX']
comments: true
---


One design challenge that used to stump me was making phone numbers accessible in the browser while still being functional. The [WCAG 2.0 guidelines](https://www.w3.org/TR/WCAG20-TECHS/F73.html#F73-description){:rel="external"} state:

<blockquote class="message">Link underlines or some other non-color visual distinction are required (when the links are discernible to those with color vision).</blockquote>

Let's consider for a moment how we'd normally code a [phone number link](https://css-tricks.com/the-current-state-of-telephone-links/){:rel="external"} to function when tapped in a mobile browser:

```html
<a href="tel:123-456-7890">123-456-7890</a>
```

In the past, if we didn't think it made sense to show a phone number link on a non-mobile screen, we'd style it to look like plain text, and then display it as a link for mobile screens. But that solution goes against the above guideline. Additionally, screen readers will read the phone number as a link even if it's not styled like one.

Another thing to avoid is creating two separate elements for the phone number and using conditional CSS to display the appropriate one for mobile or desktop. If CSS is disabled in the browser, both phone numbers will be displayed (yes, people do disable CSS).

"Okay, dude, I get the problem. What can be done?"


## Swap out the element

We can replace elements in the DOM with JavaScript. In this scenario, if we created a `<span>` for a phone number, we could replace it in the DOM with an `<a>` for smaller screens.

So, given:

```html
<span id="num">123-456-7890</span>
```

We can add a little jQuery to the mix and use the `replaceWith()` method:

```javascript
$("#num").replaceWith(function () {
  return $("<a href='tel:" + $(this).html() + "'>" + $(this).html() + "</a>");
});
```

(You can do the same thing with plain JavaScript using the [`replaceChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild){:rel="external"} method.)

Now we need a condition to determine _when_ to replace the element. Since we're making this change based on screen size, a screen width of 700px as the trigger might give us the greatest flexibility across devices. ([It's not perfect](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/){:rel="external"}, but no one ever said building the web was easy.)

```javascript
if ($(window).width() <= 700) {
  $("#num").replaceWith(function () {
    return $("<a href='tel:" + $(this).html() + "'>" + $(this).html() + "</a>");
  });
}
```

<p class="message"><strong>Note:</strong> much of the feedback I've received points out that this could reduce overall accessibility when interacting with VoIP technology. So, YMMV.</p>

Here's a demo showing this technique when the phone number's container is a specific size.

<div class="embed">
  <p data-height="450" data-theme-id="0" data-slug-hash="jYgRqV" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Phone Link Accessibility Dilemma" class="codepen">See the Pen <a href="https://codepen.io/AllThingsSmitty/pen/jYgRqV/">Phone Link Accessibility Dilemma</a> by Matt Smith (<a href="https://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="https://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

Now we have a solution that is both accessible _and_ functional when appropriate. To me this makes sense, although I've heard concerns with this disrupting VoIP features with non-mobile screens. If you'd like to improve upon this method or have another solution for this scenario, I'd love to see what you come up with. Happy coding!

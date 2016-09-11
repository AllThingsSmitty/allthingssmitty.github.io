---
layout: post
title: Checking if Font Awesome loaded
description: Icon fonts are a very popular visual asset on the web today. Unlike JavaScript libraries it.
tags: [icons fonts, JavaScript]
comments: true
---

Icon fonts have become a widely-adopted visual asset on the web today and continue to grow in popularity. When your web page downloads resources --- e.g., from a content delivery network (CDN) --- you need to know if the HTTP request returned the files you requested. This is important whether it's a JavaScript library, CSS framework, or in this case, icon fonts. Otherwise your icons might not load.

So let's take a crack at it.


### Not a JavaScript library

Icon font libraries, unlike JavaScript libraries, typically consist of only CSS and fonts files. [Font Awesome](http://fontawesome.io/) is among the most popular of these resources, so we'll use that for this example.

If we were getting the jQuery library we'd be able to check if the jQuery object loaded via the CDN using `window.jQuery`. If it didn't load, we'd fallback to use a local copy. With Font Awesome there's no JavaScript to detect. One way we can detect Font Awesome is by creating an element and checking if it has the correct CSS is applied to it.

We'll start by adding Font Awesome to the web page:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
```

Now let's write a function to create a `<span>` element:

```javascript
(function () {
  var span = document.createElement('span');
})();
```

Note that this function will be immediately-invoked. Next we'll add a CSS class to the `<span>`:

```javascript
(function () {
  var span = document.createElement('span');
  
  span.className = 'fa';
  span.style.display = 'none';
})();
```

The `.fa` class is the default class name used by Font Awesome. We also don't want the `<span>` to be visible so we've added `display: none` as an inline style on the element.

Let's add the `<span>` as the first element of the `<body>`:

```javascript
(function () {
  var span = document.createElement('span');
  
  span.className = 'fa';
  span.style.display = 'none';
  document.body.insertBefore(span, document.body.firstChild);
})();
```

The `.fa` class has a `font-family` value of `FontAwesome`. This will be what we check to validate if the Font Awesome library loaded.


### Reading the computed style

In order to be able to read the `font-family` property we need a way to get the values of the `<span>`. The [`getComputedStyle()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) method will return all CSS values of an element, which is perfect for what we're doing.

So let's go ahead and create a function to get the computed style:

```javascript
function css(element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}
```

The function will be passed the element and CSS property. We'll add this as an inner function to the function we've already created:

```javascript
(function () {
  var span = document.createElement('span');
  
  span.className = 'fa';
  span.style.display = 'none';
  document.body.insertBefore(span, document.body.firstChild);
  
  function css(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }
})();
```

Let's run our check for Font Awesome in an `if` statement:

```javascript
(function () {
  var span = document.createElement('span');
  
  span.className = 'fa';
  span.style.display = 'none';
  document.body.insertBefore(span, document.body.firstChild);
  
  function css(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }
  
  if ((css(span, 'font-family')) !== 'FontAwesome') {
    var headHTML = document.head.innerHTML;
    headHTML += '<link rel="stylesheet" href="third-party/font-awesome/css/font-awesome.min.css">';
    document.head.innerHTML = headHTML;
  }
  document.body.removeChild(span);
})();
```

If the `font-family` isn't `FontAwesome` we'll add a local copy of the library to the `<head>`. Lastly, now that we've performed the check we'll remove the `<span>` element from the `<body>` at the end of the function.

<p data-height="400" data-theme-id="0" data-slug-hash="YqjBqW" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/YqjBqW/">Did Font Awesome Load?</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Wrapping up

Whether or not you use icon fonts is up to you. If you are and opt to serve your reseource via a CDN, you'll want to know that the resource loaded. Now you have a way tell and can similarly apply this technique to other icon font libraries.s
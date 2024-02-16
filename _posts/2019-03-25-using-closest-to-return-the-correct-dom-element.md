---
layout: post
title: Using closest() to return the correct DOM element
description: Sometimes you need JavaScript to target specific selectors in the DOM. The closest() method can help you do just that.
image: img/posts/sunset-home-office-min.jpg
tags: [HTML, JavaScript]
comments: true
views:
  ua: 21048
  ga4: 3009
---

I was recently working with a vertical navigation component and ran into a hiccup where the JavaScript code wouldn't fire depending on _where_ I clicked on the menu item link. I did some digging and thought I'd share a little about what I discovered and how I was able to resolve the problem. 

To start, I have a list item that when selected will expand or collapse a submenu:

```html
<li>
  <a href="#submenu" class="toggle">Billing</a>
  <div id="submenu">
    <ul>
      <li><a href="/statment/">My Statement</a></li>
      <li><a href="/history/">Pay History</a></li>
    </ul>
  </div>
</li>
```

This event listener will manage toggling the submenu's expanded/collapsed state:

```javascript
document.addEventListener('click', function (event) {

  // Make sure clicked element is our toggle
  if (!event.target.classList.contains('toggle')) {
    return;
  }
  event.preventDefault();

  // Get the content
  let content = document.querySelector(event.target.hash);
  if (!content) {
    return;
  }

  // Toggle the content
  toggle(content);

}, false);
```

The `toggle()` method executes a function to check if the submenu has the `.is-visible` CSS class. If the element has that class, the submenu will be hidden; otherwise, the submenu is displayed:

```javascript
const toggle = function (elem, timing) {

  // If the element is visible, hide it
  if (elem.classList.contains('is-visible')) {
    hide(elem);
    return;
  }

  // Otherwise, show it
  show(elem);
};
```

I expected that clicking anywhere within the menu item would fire the JavaScript and perform the toggle. But if I clicked on either the icon or the label child elements, the JavaScript wouldn't execute. The reason is that `event.target` returns the exact DOM element. Clicking on the icon or the label returned only the image or span elements.

## The closest() method

This was something I had to look up. I needed the target and return the parent element, not the child elements. I found the solution using the [`closest()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest){:rel="external"} method. This method travels up the DOM tree from the current element and returns the closest ancestor that matches the given parameter:

```javascript
const closestElement = Element.closest(selector); 
```

This was my "ah-ha!" moment. I could chain `closest()` to `event.target` to find and return the parent element (menu item link), regardless if I ended up clicking on the child elements (icon or label):

```javascript
if (!event.target.closest('a').classList.contains('toggle')) {
  return;
}

const content = document.querySelector(event.target.closest('a').hash);
```

Now clicking anywhere in the menu item link fires the JavaScript to toggle the submenu.

<div class="embed">
  <p class="codepen" data-height="450" data-theme-id="0" data-default-tab="result" data-user="AllThingsSmitty" data-slug-hash="WPMPaV" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="WPMPaV">
    <span>See the Pen <a href="https://codepen.io/AllThingsSmitty/pen/WPMPaV/">
    WPMPaV</a> by Matt Smith (<a href="https://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
  </p>
  <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div>

Hopefully this tip will help you if you need to target specific elements in the DOM. The `closest()` method is supported in [most major browsers](https://caniuse.com/#search=closest){:rel="external"} but requires a [polyfill with IE11](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill){:rel="external"}.

If you're looking for more in-depth reading on this, I'd recommend [Zell Liew's post](https://zellwk.com/blog/dom-traversals/){:rel="external"} on traversing the DOM. He covers this method and a few other tricks that are worth checking out.
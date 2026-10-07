---
layout: post
title: "CSS does your tooltip positioning now"
description: "CSS can now handle tooltip and dropdown positioning without JavaScript. Learn how anchor positioning, popovers, and anchor-size() simplify UI."
image: img/posts/sunset-home-office-min.jpg
tags: [CSS]
comments: true
views:
  ga4: 712
---

If you've ever built a tooltip, a footnote, or a popover then you've written some version of this:

```js
const rect = trigger.getBoundingClientRect();
tooltip.style.top = `${rect.bottom + 8}px`;
tooltip.style.left = `${rect.left}px`;
```

Looks fine, right? Until the window resizes. Or until the page scrolls. Or the tooltip happens to land near the bottom of the viewport and renders half off-screen because nothing told it to flip to the other side. Not too great.

So you add a resize listener, then a scroll listener. Then some manual math to detect overflow and flip the positioning, or you find a JS library to own the math.

**CSS can do all of this now.** No JavaScript, no library, no listeners involved.

## The core trick: `anchor-name` and `position-anchor`

Give the element you want to position relative to an `anchor-name`:

```css
.term {
  anchor-name: --my-anchor;
}
```

Then tell the thing that should follow it to use that anchor:

```css
.note {
  position: fixed;
  position-anchor: --my-anchor;
  position-area: bottom;
}
```

Anchor positioning only works on elements that are already absolutely or fixed positioned. The browser keeps recalculating that position as the page scrolls or resizes.

One thing could trip you up the first time you build this into a component: `anchor-name` **doesn't need to be globally unique** across the whole page. It does need to be unique for each anchor and its matching target.

Build a card grid where every card has its own tooltip, and if you reuse the same name across all of them, every tooltip tethers to whichever card most recently registered that name, not the one you're hovering. You'll need to generate the name per instance so each card's tooltip only ever matches its own card.

`position-area` does more than it looks like at first glance. Instead of computing offsets by hand, you're describing placement: `bottom`, `top`, `bottom span-right`, whatever you need. You can get rid of `top: calc()`.

## The part that used to require a resize listener

Here's the one that saves you real code: `position-try-fallbacks`.

```css
.note {
  position-try-fallbacks: flip-block, flip-inline;
}
```

If a note near the bottom of the page would overflow the viewport, the browser tries flipping it to the other side on its own. The overflow detection and repositioning happen automatically as the page moves or resizes.

## Pair it with `popover`, and you've basically built a dropdown menu

Most of the time you're not positioning a static tooltip. You're building a dismissible dropdown or a menu, and that's where anchor positioning gets paired with the native `popover` attribute:

```html
<button id="trigger">Menu</button>
<div popover id="menu" style="position-anchor: --trigger-anchor;">...</div>
```

`popover` gives you top-layer rendering (it sits above everything, no battling `z-index`) and light-dismiss on an outside click, for free. Combine that with anchor positioning for placement, and you've got a working dropdown menu without a line of JavaScript.

## Match a dropdown's width to its button with `anchor-size()`

The other thing you'll want almost immediately once you're building real components: making a dropdown exactly as wide as the button that opened it.

```css
#menu {
  width: anchor-size(width);
}
```

`anchor-size()` reads a dimension straight off the anchor itself. No measuring the button in JavaScript and setting an inline width to match.

<div class="embed">
  <p class="codepen" data-height="450" data-pen-title="Dropdown Menus Using CSS anchor position + Popovers" data-default-tab="result" data-slug-hash="rayGzMK" data-user="AllThingsSmitty" data-token="87795aa535519ddbd03fd51a3aa2785c" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"> <span>See the Pen <a href="https://codepen.io/AllThingsSmitty/pen/rayGzMK/87795aa535519ddbd03fd51a3aa2785c"> Dropdown Menus Using CSS anchor position + Popovers</a> by Matt Smith (<a href="https://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="https://codepen.io">CodePen</a>.</span>
  </p>
  <script async src="https://public.codepenassets.com/embed/index.js"></script>
</div>

## One wrinkle I hit

**Anchor positioning only cares that two elements share a name.** It doesn't care where either one sits in the DOM. What if you need to toggle a note's visibility based on whether its term is active, and the two aren't siblings?

A plain sibling selector (`~`) only works when both elements share a parent. Mine doesn't. The clickable terms live inline in a paragraph, and the notes live in a separate container at the end of the document. I added `:has()` on their nearest shared ancestor:

```css
.essay:has(#term-1:checked) .note[data-for="term-1"] {
  display: block;
}
```

It's a nice trick, but just remember: anchor positioning solves where things *go*, not when they should *show up*. Those are two different problems, and for the second one you'll still probably need `:has()`, a popover, or a few lines of JavaScript.

<div class="embed">
  <p class="codepen" data-height="450" data-pen-title="Tethering a Note with anchor-name and position-anchor" data-default-tab="result" data-slug-hash="OPpPmRK" data-user="AllThingsSmitty" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"> <span>See the Pen <a href="https://codepen.io/AllThingsSmitty/pen/OPpPmRK"> Tethering a Note with anchor-name and position-anchor</a> by Matt Smith (<a href="https://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="https://codepen.io">CodePen</a>.</span>
  </p>
  <script async src="https://public.codepenassets.com/embed/index.js"></script>
</div>

Click any underlined term. Its note tethers itself to that exact word, even though the two aren't anywhere near each other in the markup.

## Rule of thumb

If you're positioning something relative to a specific other element, use `anchor-name`/`position-anchor` first. If you just need to position something relative to its own container, you don't need any of this. `position: absolute` with a `position: relative` parent will do the job.

## Where this isn't a good fit yet

- **Browser support is solid** across current versions of Chrome, Firefox, Safari, and Edge. But Safari and Chrome disagree on some fallback-position edge cases, and there's a known quirk with the `popover` attribute's default margin interfering with anchor positioning unless you explicitly reset it. Keep the `@supports not (anchor-name: --a)` fallback for older browsers.

- **Screen reader users** won't experience this the way sighted users do. The anchor relationship is purely visual. If your note lives somewhere else entirely in the DOM, a screen reader will announce it in document order, not in visual proximity to its anchor. `aria-describedby` can bridge some of the gap, but it's not a complete fix. Don't treat this as an accessibility feature. The visual relationship doesn't change the underlying document structure.
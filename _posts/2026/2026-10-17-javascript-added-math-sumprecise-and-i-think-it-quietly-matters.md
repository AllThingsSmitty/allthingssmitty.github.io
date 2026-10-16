---
layout: post
title: "JavaScript added Math.sumPrecise() and I think it quietly matters"
description: "Math.sumPrecise() is a small addition to JavaScript, but it fixes a real problem with adding up floating-point numbers."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 0
---

Confession: I'm actually bad at math. I know, that's ironic for someone who works in software. I partly blame JavaScript. For years we've all just learned to live with the quirks of floating-point math.

You know the classic example:

```js
0.1 + 0.2
// 0.30000000000000004
```

The problem isn't that JavaScript is "bad at math." It uses IEEE 754 double-precision floating-point numbers (yes, it's a mouthful), like a lot of other programming languages. Some decimal values can't be represented exactly in binary, so tiny rounding errors are unavoidable.

Ironically, that famous example isn't what `Math.sumPrecise()` fixes. Most of the time those tiny errors don't matter. Sometimes they absolutely do.

`Math.sumPrecise()` is part of ES2026, and it gives you a much more accurate way to add up a list of numbers.

## Where things start to go sideways

Say you need to total a large array of floating-point values.

```js
const values = [0.1, 0.2, 0.3, 0.4];

const total = values.reduce((sum, value) => sum + value, 0);
```

For small datasets, that's usually good enough.

But every addition introduces a tiny rounding error. Most of the time it's harmless, but keep adding enough values and those errors start to pile up.

It gets even worse when the numbers have very different magnitudes:

```js
const values = [
  1e16,
  1,
  -1e16
];

values.reduce((a, b) => a + b, 0);
// 0
```

The answer should be `1`. But the `1` is too small next to `1e16` to survive the intermediate calculation, so it just vanishes.

## That's where `Math.sumPrecise()` comes in

It's built to sum numbers with much higher accuracy.

```js
const values = [
  1e16,
  1,
  -1e16
];

Math.sumPrecise(values);
// 1
```

Instead of rounding after every single addition, it works as if it added the exact values and rounded once at the end. How engines pull that off is up to them.

You don't need to know what Kahan summation is, or write your own compensated summation algorithm. Just pass an iterable to `Math.sumPrecise()`.

## It works with more than arrays

Arrays work, of course.

```js
Math.sumPrecise([1, 2, 3]);
```

So do generators.

```js
function* values() {
  yield 0.1;
  yield 0.2;
  yield 0.3;
}

Math.sumPrecise(values());
```

That means you can use it in your processing code without converting everything to an array first.

## It won't fix everything

`Math.sumPrecise()` doesn't magically make floating-point numbers exact.

```js
Math.sumPrecise([0.1, 0.2]);
// 0.30000000000000004
```

Just like before, `0.1` still isn't stored exactly in memory. What `Math.sumPrecise()` does is add things up carefully, so you don't lose precision along the way.

If your inputs are already approximations, the result is still based on those approximations. The difference is you're not piling extra error on top.

## Should you replace every `reduce()`?

Probably not.

If you're summing five numbers in a UI component, you won't notice a difference. This is certainly readable:

```js
const total = Math.sumPrecise(prices);
```

But this is also perfectly reasonable for a lot of everyday cases:

```js
prices.reduce((sum, price) => sum + price, 0);
```

Where it really earns its keep is when you're working with:

- scientific calculations
- financial code that already uses JavaScript numbers
- statistics
- charting libraries
- large datasets
- long-running numerical computations

Financial code is the one I keep coming back to. I've seen totals that looked fine on screen but were slightly off underneath. Accumulated rounding error can sneak up on you, and this gives you a better default.

## Just one catch

`Math.sumPrecise()` only sums values. It won't make multiplication, division, or subtraction more accurate.

It's a focused tool for one operation that turns out to be surprisingly tricky to get right.

## Not flashy, but it matters

You won't see `Math.sumPrecise()` in many conference demos. But it's good to know it exists. Instead of a hand-written helper or an outside library, JavaScript now has this built in.

If you're working with charts, analytics, or simulations, you'll probably be glad it's there.

One last thing: it's been available in the latest browsers since April 2026, but if you're targeting older browsers or runtimes, check compatibility before you ship it.
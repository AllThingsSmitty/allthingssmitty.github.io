---
layout: post
title: Mastering default values in JavaScript with the nullish coalescing (??) operator
description: "?? only falls back on null or undefined, so 0 and empty strings survive. Here's where it differs from ||."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 5068
---

One piece of JavaScript syntax I've come to appreciate is the nullish coalescing (`??`) operator. It's easy to overlook until it saves you from a subtle bug.

If you're still using the logical OR (`||`) operator to provide default values, it's worth knowing where the two behave differently.

## What each one treats as missing

The logical OR (`||`) operator treats any *falsy* value as a signal to fall back to the value on the right. That includes `false`, `0`, `NaN`, `""` (an empty string), `null`, and `undefined`.

This can be surprising when values like `0` or `""` are perfectly valid and should be preserved:

```js
const value = 0;
const _default = 5;
console.log(value || _default); // Output: 5 (because 0 is falsy)
```

Here, `||` treats `0` as falsy, so the default value (`5`) is returned.

The nullish coalescing (`??`) operator works a little differently. It only falls back when the value on the left is `null` or `undefined`.

Everything else, including `0`, `false`, and an empty string, is treated as a legitimate value:

```js
const value = 0;
const _default = 5;
console.log(value ?? _default); // Output: 0 (because 0 is not null or undefined)
```

Since `0` isn't `null` or `undefined`, it's preserved instead of being replaced by the default.

## Why I usually turn to `??`

When I'm providing default values, `??` is usually the operator I want.

It preserves values that happen to be falsy while still giving me a fallback when something is actually missing (`null` or `undefined`). That small distinction prevents bugs that are annoying to track down, especially with numbers, form inputs, and config values.

That doesn't make `||` wrong. It still has its place when you want *any* falsy value treated as "missing." But if all you want is "use a default only when there's no value," `??` is usually the better fit.

It's a small change that makes defaults behave the way you'd expect.
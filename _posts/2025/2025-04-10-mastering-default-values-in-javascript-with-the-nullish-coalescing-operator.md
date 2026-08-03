---
layout: post
title: Mastering default values in JavaScript with the nullish coalescing (??) operator
description: The nullish coalescing operator ('??') provides a simple way to handle null or undefined values in JavaScript. It's a must-have, let me show you why.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 5007
---

One piece of JavaScript syntax I've come to appreciate is the nullish coalescing (`??`) operator. It's one of those features that's easy to overlook until it saves you from a subtle bug.

If you're still using the logical OR (`||`) operator to provide default values, it's worth knowing where the two behave differently.

The difference comes down to what each operator considers a value worth replacing.

## Breaking it down

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

## Why I usually reach for `??`

When I'm providing default values, `??` is usually the operator I want.

It preserves values that happen to be falsy while still giving me a fallback when something is actually missing (`null` or `undefined`). That small distinction helps avoid bugs that can be frustrating to track down, especially when working with numbers, form inputs, or configuration values.

That's not to say `||` is wrong; it still has its place when you intentionally want to treat *any* falsy value as "missing." But if your goal is simply "use a default only when no value exists," `??` is often the better fit.

It's a small change, but it's one that can make your code behave more predictably and save you from a few head-scratching moments down the road. 👍🏻
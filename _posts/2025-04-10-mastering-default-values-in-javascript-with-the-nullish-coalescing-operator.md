---
layout: post
title: Mastering default values in JavaScript with the nullish coalescing (??) operator
description: The nullish coalescing operator ('??') provides a simple way to handle null or undefined values in JavaScript. It's a must-have, let me show you why.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 4667
---

One important piece of JavaScript syntax that I've enjoyed using is the nullish coalescing (`??`) operator. The `??` operator handles default values more effectively compared with the traditional approach using the logical OR (`||`) operator. It's a 100% must-have tip.

Both the `??` and `||` operators return the right-hand operand if the left-hand operand is "falsy". But the key difference lies in what they consider falsy...

## Breaking it down

The logical OR (`||`) operator will treat `false`, `0`, `NaN`, `""` (empty string), `null`, and `undefined` all as falsy. So if any of these are encountered, the right-hand side of the `||` expression will be returned. This happens even when a value like `0` or `""` might be a valid and intended value:

```js
const value = 0;
const _default = 5;
console.log(value || _default); // Output: 5 (because 0 is falsy)
```

Here `||` evaluates `0` as falsy, so the default value `5` is returned.

However, the nullish coalescing (`??`) operator only considers `null` and `undefined` as falsy. Any other value, even if it's falsy in a boolean context (e.g., `0`, `false`, or an empty string), will not trigger the default value:

```js
const value = 0;
const _default = 5;
console.log(value ?? _default); // Output: 0 (because 0 is not null or undefined)
```

The `??` operator treats `0` as a valid value, so it doesn't replace it with the default.

## Why `??` is safer for default values

The nullish coalescing operator is a powerful tool that shines in situations where you want to preserve falsy values like `0`, `false`, or an empty string but still provide defaults for `null` or `undefined`. This distinction helps prevent unintended consequences that can arise when using `||`, particularly when working with numbers or empty strings.

By using `??`, you can avoid unexpected results and write more predictable, reliable JavaScript code that handles default values with precision. 👍🏻

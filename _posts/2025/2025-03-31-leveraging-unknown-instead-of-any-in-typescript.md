---
layout: post
title: "Leveraging \"unknown\" instead of \"any\""
description: Learn why using 'unknown' instead of 'any' in TypeScript leads to safer, more maintainable code. Discover best practices, benefits, and examples for improved type safety and error handling in TypeScript.
image: img/posts/sunset-home-office-min.jpg
tags: [TypeScript]
comments: true
views:
  ga4: 709
---

In TypeScript, you may have heard that the `any` type is seen as a kind of "get out of jail free" card. It allows any value to be assigned to a variable of type `any`, which effectively disabling TypeScript's static type checking. That might be convenient in certain situations, but it undermines one of the primary benefits of TypeScript: catching errors during development. If you use `any` liberally, you might end up with a codebase that's no safer than regular JavaScript.

## An `unknown` alternative

The `unknown` type is a safer, more restrictive alternative to `any`. It lets you assign any value to a variable but requires type checking before use, unlike `any`, which allows operations without checks.

Let's take a look:

```js
let value: unknown;

value = 10; // OK
value = "hello"; // OK

// The following would raise a TypeScript error
let strLength: number = value.length; // Error: Object is of type "unknown"
```

With `unknown`, the TypeScript compiler won't allow you to perform operations that may not be valid for the assigned value unless you first check its type.

### Is `unknown` really better than `any`?

A few things to consider:

-	**Type safety:** `unknown` requires explicit type checks before performing operations.
-	**Better tooling:** TypeScript provides improved autocompletion and error messages with `unknown`.
-	**Improved maintainability:** `unknown` encourages safer, more maintainable code.

Using `unknown` with a type check:

```js
let value: unknown = 10;

if (typeof value === "string") {
  // Now TypeScript knows value is a string, so we can safely call string methods
  console.log(value.length); // OK
} else {
  console.log("Value is not a string.");
}
```

With this, TypeScript requires an explicit check (`typeof value === "string"`) before you can safely use the string methods on `value`. This provides an extra layer of safety over `any`.

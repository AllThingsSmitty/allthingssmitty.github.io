---
layout: post
title: Leveraging "unknown" instead of "any"
description: Learn why using 'unknown' instead of 'any' in TypeScript leads to safer, more maintainable code. Discover best practices, benefits, and examples for improved type safety and error handling in TypeScript.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 12
---

In TypeScript, you may have heard that the `any` type is seen as a kind of "get out of jail free" card. It allows any value to be assigned to a variable of type `any`, effectively disabling TypeScript's static type checking. While this can be convenient in certain situations, it undermines one of the primary benefits of TypeScript: its ability to catch errors during development. If you use `any` liberally, you might end up with a codebase that's no safer than regular JavaScript.

## An "unknown" alternative

A better alternative to `any` is the `unknown` type. The `unknown` type is a safer and more restrictive type. While `unknown` allows you to assign any value to a variable, it forces you to perform some type of checking before interacting with the value. Whereas `any` allows you to operate on the value without checks.

For instance:

```js
let value: unknown;

value = 10; // OK
value = "hello"; // OK

// The following would raise a TypeScript error
let strLength: number = value.length; // Error: Object is of type "unknown"
```

With `unknown`, the TypeScript compiler won't allow you to perform operations that may not be valid for the assigned value unless you first check its type.

### Is "unknown" really better than "any"?

A few things to consider:

-	**Type safety:** `unknown` forces developers to explicitly check the type of a value before performing operations on it. 🦺
-	**Better tooling:** TypeScript can offer more meaningful autocompletion and error messages when `unknown` is used instead of `any`. 🧰
-	**Improved maintainability:** By using `unknown`, the development team is encouraged to write safer and more maintainable code. 👍🏻

Here's how you might use `unknown` with a type check:

```js
let value: unknown = 10;

if (typeof value === "string") {
  // Now TypeScript knows value is a string, so we can safely call string methods
  console.log(value.length); // OK
} else {
  console.log("Value is not a string.");
}
```

In this example, TypeScript requires an explicit check (`typeof value === "string"`) before you can safely use the string methods on `value`. This provides an extra layer of safety over `any`.

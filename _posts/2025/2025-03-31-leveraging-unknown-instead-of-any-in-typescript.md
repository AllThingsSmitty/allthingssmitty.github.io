---
layout: post
title: "Leveraging \"unknown\" instead of \"any\""
description: Learn why using 'unknown' instead of 'any' in TypeScript leads to safer, more maintainable code. Discover best practices, benefits, and examples for improved type safety and error handling in TypeScript.
image: img/posts/sunset-home-office-min.jpg
tags: [TypeScript]
comments: true
views:
  ga4: 734
---

One habit I've picked up over the years using `unknown` as a default before `any`. I still use `any` occasionally, but I've become much more intentional about it.

The reason is pretty simple: `any` opts you out of TypeScript's type checking. That can be convenient when you're prototyping or working with legacy code, but if it starts spreading through a codebase, it's surprisingly easy to lose many of the guarantees that make TypeScript valuable in the first place.

## An `unknown` alternative

The `unknown` type takes a different approach. Like `any`, it can hold any value. The difference is that TypeScript won't let you assume what that value is until you've proven it.

Here's a simple example:

```ts
let value: unknown;

value = 10; // OK
value = "hello"; // OK

// TypeScript won't let us assume this is a string.
let strLength: number = value.length;
// Error: Object is of type 'unknown'
```

That's the point. TypeScript refuses to guess.

Before you can use `value` as a string (or any other type), you need to narrow it first.

### Why I usually prefer `unknown`

A few reasons I've come to prefer `unknown`:

- **It forces me to be explicit.** Before I can use a value, I have to prove what it is.
- **It catches bad assumptions early.** TypeScript won't let me call methods or access properties that might not exist.
* **The intent is clearer.** Future readers (including me a few months later) can see exactly why a value is safe to use.

Here's what that looks like in practice:

```ts
let value: unknown = "hello";

if (typeof value === "string") {
  // TypeScript now knows value is a string.
  console.log(value.length); // OK
} else {
  console.log("Value is not a string.");
}
```

Once we've narrowed the type, TypeScript is happy because we've shown that `value` is actually a string before using string-specific properties.

That doesn't mean `any` is wrong. There are legitimate cases for it, like working with older libraries, gradually migrating JavaScript to TypeScript, or intentionally opting out of type checking when you understand the trade-off.

For me, though, `any` has become the exception rather than the default. If I genuinely don't know the type yet, I start with `unknown` and narrow it from there. It's a small habit that's saved me from more than a few bugs.
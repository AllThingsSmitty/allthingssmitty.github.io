---
layout: post
title: "Leveraging \"unknown\" instead of \"any\""
description: I default to unknown before any in TypeScript. Here's why, and what narrowing it looks like in practice.
image: img/posts/sunset-home-office-min.jpg
tags: [TypeScript]
comments: true
views:
  ga4: 739
---

One habit I've picked up over the years is using `unknown` as a default before `any`. I still use `any` occasionally, but I've become much more intentional about it.

The reason is pretty simple: `any` opts you out of TypeScript's type checking. That can be convenient when you're prototyping or working with legacy code, but if it starts spreading through a codebase, it's easy to lose most of what makes TypeScript worth using.

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

- It forces me to be explicit. Before I can use a value, I have to prove what it is.
- Bad assumptions get caught early. TypeScript won't let me call methods or read properties that might not exist.
- The intent is clearer for whoever reads it next, including me a few months from now.

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

That doesn't mean `any` is wrong. There are fair reasons to use it: older libraries, a gradual JS-to-TS migration, or a spot where I've decided the trade-off is worth it.

For me, though, `any` has become the exception rather than the default. If I genuinely don't know the type yet, I start with `unknown` and narrow it from there. It's a small habit that's saved me from more than a few bugs.
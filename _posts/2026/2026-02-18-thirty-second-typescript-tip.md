---
layout: post
title: "A lightning-fast TypeScript tip: use \"satisfies\""
description: "TypeScript tip: use satisfies to enforce type safety without losing inference. Ideal for configs, design tokens and more."
image: img/posts/sunset-home-office-min.jpg
tags: [TypeScript]
comments: true
views:
  ga4: 0
---

Let's say you've got a little config object:

```ts
type Config = {
  theme: "light" | "dark";
  version: number;
};

const config = {
  theme: "dark",
  version: 3,
} satisfies Config;
```

And that little keyword, **`satisfies`**, does a *lot* of work:

- ✅ You get full type safety
- ✅ Literal types stay intact (`"dark"` doesn't widen to `string`)
- ✅ You'll get a loud error if you typo a key or put in the wrong type
- ❌ Without `satisfies`, you'd either slap on a bulky annotation or let TypeScript loosen things more than you'd like

## Why this matters

It's perfect for design tokens, config objects, or any situation where you want TypeScript to check the shape *strictly* without blowing away your nice, inferred types. Basically: strong constraints, zero verbosity.

### Bonus: great for simple maps

```ts
const COLORS = {
  primary: "#000",
  secondary: "#fff",
} satisfies Record<string, string>;
```

Clean. Safe. Still fully inferred. Go forth and satisfy. 🚀
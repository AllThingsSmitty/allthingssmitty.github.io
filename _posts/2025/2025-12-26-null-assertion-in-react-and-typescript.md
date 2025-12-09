---
layout: post
title: "When to use (and avoid) non-null assertion in React + TypeScript"
description: ...
image: img/posts/sunset-home-office-min.jpg
tags: [React, TypeScript]
comments: true
views:
  ga4: 0
---

"Just slap `!` on it," they said. Every TypeScript developer has heard that advice, and maybe even followed it.

The non-null assertion operator (`!`) can feel like a quick fix for those annoying "object is possibly null or undefined" errors. But in React projects, it's a double-edged sword: it can silence the compiler, or it can silently invite runtime bugs.

Let's unpack when the null assertion operator is useful, when it's risky, and how to write React + TypeScript code that rarely needs it.

## What the `!` actually does

In TypeScript, the non-null assertion operator tells the compiler:

> "Trust me, this value isn't `null` or `undefined`."

Example:

```ts
const el = document.querySelector('#root')!;
el.classList.add('visible');
```

TypeScript normally warns that `querySelector` might return `null`. The `!` tells it to skip that warning.

Crucially: **this does nothing at runtime**. If `el` is actually `null`, your code will still throw an error. The `!` is compile-time sugar, it asserts safety without verifying it.


## Why React developers reach for it

React and TypeScript mix beautifully, but they also create plenty of "possibly null" situations:

### Refs

```ts
const inputRef = useRef<HTMLInputElement>(null);

function focusInput() {
  inputRef.current!.focus(); // ❗ non-null assertion
}
```

Here, `inputRef.current` starts as `null`, so TS forces you to handle that. Many developers add `!` to skip the null check, assuming `focusInput` only runs after mount.

### Contexts

```ts
const ThemeContext = createContext<Theme | null>(null);
const theme = useContext(ThemeContext)!;
```

You often *know* your component is always wrapped in a provider, but the compiler doesn't. Hence, the temptation to assert.

### DOM access / portals

Sometimes you need to reach into the DOM, or use libraries that don't have perfect types. Again, `!` looks like an easy fix.

## The problem with non-null assertion (`!`)

The operator makes TypeScript *trust* you, and that's the danger.

If your assumptions ever break (e.g., a ref isn't set yet, or a context provider is missing), the compiler won't help. You've silenced it.

```ts
inputRef.current!.focus(); // works...
// ...until someone calls it before the component mounts
```

You've gained short-term convenience, but lost long-term type safety, the exact thing TypeScript is meant to give you.

## Safer alternatives

Instead of reaching for `!`, here are patterns that keep your code safe *and* type-correct.

### Optional chaining

```ts
inputRef.current?.focus();
```

Runs only if `current` isn't null.

### ✅ Conditional Logic

```ts
if (inputRef.current) {
  inputRef.current.focus();
}
```

### Better typing

If your context or prop can never be null in practice, encode that in your types:

```ts
const ThemeContext = createContext<Theme>({ /* default value */ });
```

Or, if your setup guarantees non-null values later, initialize lazily or assert once at a boundary, not everywhere.

### Runtime checks for safety

When interacting with APIs or the DOM, runtime guards are your friend. For example:

```ts
const el = document.getElementById('root');
if (!el) throw new Error('Root element missing!');
```

## When it's actually okay to use `!`

The non-null assertion isn't evil — just sharp.
Used sparingly, it can make sense in well-controlled scenarios:

- **Inside framework guarantees** (e.g., a ref inside `useEffect` after mount).
- **In migration code** where you're incrementally typing a legacy codebase.
- **With third-party libraries** that have incomplete or overly broad typings.

Even then, document why the `!` is safe with a comment:

```ts
// Safe: ref is assigned after mount
inputRef.current!.focus();
```

## Enforcing discipline with ESLint

To keep `!` from spreading like wildfire, enable the rule:

```json
"@typescript-eslint/no-non-null-assertion": "warn"
```

You can still override it per line when necessary, but it encourages deliberate use.

## Takeaways

{::nomarkdown}
<div class="table-container">
{:/}

| Rule of thumb                                           | Use case                                                          |
| ------------------------------------------------------- | ----------------------------------------------------------------- |
| Avoid `!` when you can                                  | Most of the time, a small refactor or optional chaining is safer. |
| Assert only when you truly control the nullability      | e.g., React refs after mount.                                     |
| Don't silence the compiler just to make it stop yelling | The warning is there for a reason.                                |
| Add comments when you use `!`                           | Future you (and teammates) will thank you.                        |

{::nomarkdown}
</div>
{:/}

## Final thought

The non-null assertion is like duct tape: quick, handy, but messy if you rely on it everywhere. Used with intention, it's fine. Used carelessly, it's a type-safety time bomb.

The real goal isn't to eliminate `!` entirely, it's to design your React + TypeScript code so you *don't need it often*.
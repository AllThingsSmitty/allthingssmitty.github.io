---
layout: post
title: "The cost of non-null assertions in React + TypeScript"
description: "A practical look at non-null assertions in React + TypeScript, their hidden costs, and patterns that make them mostly unnecessary."
image: img/posts/sunset-home-office-min.jpg
tags: [React, TypeScript]
comments: true
views:
  ga4: 0
---

"Just slap `!` on it," they said. Every TypeScript developer has heard that advice, and most of us have followed it at least once, usually five minutes before a deadline.

The non-null assertion operator (`!`) can feel like a quick fix for those annoying "object is possibly null or undefined" errors. And sometimes, honestly, it *is*. But in React projects, it's also a double-edged sword: it can silence the compiler, or quietly set you up for a runtime crash later.

<!-- Let's unpack when the non-null assertion operator is useful, when it's risky, and how to write React + TypeScript code that rarely needs it in the first place. -->

## What the `!` actually does

In TypeScript, the non-null assertion operator tells the compiler:

> "Trust me, this value isn't `null` or `undefined`."

```ts
const el = document.querySelector('#root')!; // 👀 note ❗ at the end
el.classList.add('visible');
```

Normally, TypeScript warns you that `querySelector` might return `null`. Adding `!` tells it to stop complaining.

What's easy to forget is that this **does absolutely nothing at runtime**. The operator is erased from the emitted JavaScript. If `el` *is* `null`, your code will still blow up, you've just told the compiler not to warn you about it.

In other words, `!` doesn't make your code safer. It just asserts that you've already made it safe **by reasoning outside the type system**.

## Why React developers reach for it

React and TypeScript work great together, but they also create plenty of "possibly null" situations that feel...unavoidable.

### Refs

```ts
const inputRef = useRef<HTMLInputElement>(null);

function focusInput() {
  inputRef.current!.focus(); // ❗ non-null assertion
}
```

`inputRef.current` starts as `null`, so TypeScript forces you to deal with that. Many developers add `!` and move on, assuming `focusInput` only runs after mount and the element is rendered.

That assumption is *often* correct...until it isn't. Conditional rendering, ref forwarding, tests, or subtle timing changes can break it. And when they do, the compiler won't help you anymore.

### Contexts

```ts
const ThemeContext = createContext<Theme | null>(null);
const theme = useContext(ThemeContext)!;
```

You know the component is wrapped in a provider. But TypeScript doesn't. So the `!` comes out.

This is one of the most common places non-null assertions sneak in, and one of the easiest to clean up later.

### DOM access / portals

Sometimes you need to touch the DOM directly or integrate with a library that has loose or incomplete typings. Again, `!` looks like the fastest way forward.

And sometimes it *is*, just not for free.

## The problem with non-null assertions (`!`)

The core issue is simple: the operator makes TypeScript **trust you**.

And trust, in codebases that grow and change, is expensive.

```ts
inputRef.current!.focus(); // works...
```

...until someone calls it before the component mounts. Or refactors when it's called. Or reuses it somewhere you didn't expect.

There's also a scaling problem here:

- **one** non-null assertion is easy to reason about
- **ten** of them across a component tree turns into a web of assumptions no one remembers making six months later

You get short-term convenience, but you give up long-term type safety.

Which is kind of the whole reason you're using TypeScript.

## Safer alternatives

Before reaching for `!`, it's usually worth asking whether the code can be structured to make nullability explicit.

### Optional chaining

```ts
inputRef.current?.focus();
```

This is safe, but also quiet. If a missing ref indicates a bug, silently doing nothing may hide a real problem.

As a rule of thumb: optional chaining works best when *absence is acceptable*, not when absence is exceptional.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">🙋🏻‍♂️ Ready for more?</div>

Pull back the curtain and get a closer look at [optional chaining]({% post_url 2025-06-02-write-more-reliable-javascript-with-optional-chaining %}) for cleaner code.

{::nomarkdown}
</aside>
{:/}

### Conditional logic

```ts
if (inputRef.current) {
  inputRef.current.focus();
}
```

Is it exciting? No.

Is it obvious, readable, and hard to misuse? Yes, and that counts for a lot.

### Better typing (with intent)

If a value truly can't be null *in correct usage*, you can encode that, but be careful what you're trading away.

```ts
const ThemeContext = createContext<Theme>({ /* default value */ });
```

This removes `null` entirely, but it also means forgetting the provider won't fail loudly. Your app will just render with a fake default instead.

That can be acceptable for truly global, non-optional defaults (like theme colors), but it's risky for anything that represents required state or business logic.

A safer pattern is to push the check to a boundary:

```ts
function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return theme;
}
```

Now your components stay clean, mistakes surface immediately, and there's no need for `!`.

### Runtime checks for safety

When dealing with the DOM or external APIs, runtime guards are often the right tool:

```ts
const el = document.getElementById('root');
if (!el) throw new Error('Root element missing!');
```

Failing fast is usually better than failing mysteriously.

## When it's actually okay to use `!`

The non-null assertion isn't evil, it's just sharp.

Used sparingly, it can make sense in tightly controlled situations:

- **Framework guarantees**, when the value is guaranteed to exist (for example, refs inside `useEffect` *when the element is rendered*)
- **Migration code** while incrementally typing a legacy codebase
- **Third-party libraries** with overly broad or incorrect typings

Even then, leave a breadcrumb:

```ts
// Safe here: ref is assigned after mount and element is rendered
inputRef.current!.focus();
```

That comment turns a risky assertion into a documented decision.

## Enforcing discipline with ESLint

If you want to keep `!` from spreading quietly through your codebase, enable:

```json
"@typescript-eslint/no-non-null-assertion": "warn"
```

You can still override it when needed, but now every usage is intentional, not reflexive.

## Takeaways

{::nomarkdown}
<div class="table-container">
{:/}

| Rule of thumb                                   | Use case                          |
| ----------------------------------------------- | --------------------------------- |
| Avoid `!` when you can                          | A small refactor is usually safer |
| Assert only when you truly control nullability  | e.g., refs after render           |
| Don't silence the compiler just to make it stop | The warning exists for a reason   |
| Comment every `!`                               | Future you will appreciate it     |

{::nomarkdown}
</div>
{:/}

## Final thought

The non-null assertion is like duct tape: quick, handy, and occasionally necessary, but messy if you rely on it everywhere.

The real goal isn't to eliminate `!` entirely. It's to design your React + TypeScript code so you **rarely need it**, and when you do, you *know exactly why*.
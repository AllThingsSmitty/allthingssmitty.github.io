---
layout: post
title: "From instanceof to Error.isError: safer error checking in JavaScript"
description: "Why instanceof error fails across realms in JavaScript, and how Error.isError() fixes it."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 0
---

For a long time, JavaScript developers have relied on `instanceof` to figure out, "Is this an error?"

```js
err instanceof Error // true...usually
```

In normal code, that works fine. You rarely think about it. But once values come from other realms, things get weird, and the failures are silent.

Everything "works" until your logging pipeline quietly drops real errors.

I ran into this debugging an error reporting issue that only occurred in production. Everything worked locally and in staging. In prod, some errors were just...empty.

## The cross-realm problem

JavaScript doesn't run in just one global environment. It has **realms**, which are separate JavaScript worlds with their own globals and their own built-ins like `Object`, `Array`, and `Error`.

Two values can both be real errors, but if they were created in different realms, JavaScript treats them as different things. It's one of those "why is this even a thing?" moments the first time it bites you.

## Why `instanceof` breaks down

Think about an example using an iframe:

```js
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);

const err = new iframe.contentWindow.Error('Oops!');
err instanceof Error; // false
```

At first glance that result looks wrong: `err` *is* an error.

I'll be honest: I used `instanceof Error` everywhere for years and never questioned it. It never failed on my machine, so why would it?

The catch is that it wasn't created with *your* `Error` constructor. It came from the iframe's. Since `instanceof` walks the prototype chain for a specific realm, the check fails. `instanceof` isn't wrong. It's just limited to its own world.

This is one of those bugs that only appears after you ship:

- Workers and iframes
- Browser extensions
- SSR and test runners
- Anything crossing execution contexts

If you've ever wondered why a logging system suddenly stopped showing stack traces, this kind of check is often the reason. 

I've seen this show up in production logs as "mysteriously empty" error objects. The error was there, but the check just decided it wasn't.

## Enter `Error.isError()`

JavaScript now has `Error.isError(value)`, **a realm-safe way to answer, "Is this actually an error?"** It's one of those APIs that feels obvious in hindsight.

Here is what it guarantees:

- `true` for real `Error` objects, even across realms
- `false` for non errors
- It never throws, even for odd or unexpected inputs

The API itself is simple:

```js
Error.isError(value)
```

And the behavior lines up with expectations:

```js
Error.isError(new Error('Oops!'))                 // true
Error.isError(new TypeError('Bad type'))          // true
Error.isError('just a string')                    // false
Error.isError({ message: 'Not really an error' }) // false
Error.isError(Object.create(Error.prototype))     // false
```

That last case is important. Even though the object inherits from `Error.prototype`, **it was never created as an actual error**. `Error.isError()` correctly rejects it.

The cross-realm case now behaves the way most developers expect:

```js
const err = new iframe.contentWindow.Error('Oops');
Error.isError(err); // true
```

Under the hood, engines check an internal "brand" real errors carry, something you can't access from userland. That's why our workarounds have always been a little...approximate.

One practical detail is worth mentioning. In browsers, `Error.isError()` also returns `true` for `DOMException` objects. Even though `DOMException` isn't a subclass of `Error` in the usual prototype sense, the platform treats it as a real error. This is usually what you want in logging or error handling code.

Custom error classes work as expected:

```js
class CustomError extends Error {}

const err = new CustomError('Custom fail');
Error.isError(err); // true
```

As long as your custom error extends `Error` correctly, it's treated as a real error, even across realms.

## When should you use this?

If your code ever handles errors that come from outside its own execution context, `Error.isError()` is the safer default.

Common examples include:

- Global error handlers and logging tools
- Test frameworks
- Web extensions
- SSR / edge runtimes
- Workers, iframes, **basically anything crossing a boundary**

In these situations, `instanceof Error` can quietly miss real errors. Worse than throwing, because you don't notice until something downstream breaks.

It also means you can stop leaning on fragile checks like this:

```js
err &&
typeof err === 'object' &&
'message' in err &&
'stack' in err
```

You don't have to ban `instanceof`. In tightly scoped code it's fine. Once boundaries are involved, `Error.isError()` is the more reliable check.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">☝🏻 By the way...</div>

Once you can reliably identify real error objects, the next challenge is preserving useful context as they move through your code. The [`Error.cause` API]({% post_url 2025-11-10-error-chaining-in-javascript-cleaner-debugging-with-error-cause %}) helps with just that.

{::nomarkdown}
</aside>
{:/}

## Adopting it without a big refactor

You don't need to rewrite your entire codebase to start using this. A small wrapper gets you most of the benefit:

```js
function isError(value) {
  return typeof Error.isError === 'function'
    ? Error.isError(value)
    : value instanceof Error;
}
```

Use this in boundary-heavy places like logging or framework glue instead of sprinkling `instanceof Error` everywhere.

This approach gives you:

- Realm-safe behavior in modern runtimes
- A decent fallback in older ones
- A single place to update later when support is universal

Start at the edges of your app. That's where cross-realm errors sneak in.

## Can you use this today?

`Error.isError()` is supported in modern environments, with partial support in Safari:

- ✅ Chrome 134+, Firefox 138+, Edge 134+
- ✅ Node.js 24.3+
- ⚠️ Safari 18.4

Feature detection is enough:

```js
if (typeof Error.isError === 'function') {
  Error.isError(err);
} else {
  // Fallback, not realm safe
  err instanceof Error;
}
```

## The bug you don't see coming

If your code crosses boundaries, `instanceof` is a footgun. `Error.isError()` is what we actually meant all along.

It's a small change that removes a whole class of annoying bug, and it's a pretty good trade. If your code touches workers, iframes, extensions, or server boundaries, switching to `Error.isError()` is an easy win and one less thing to be quietly wrong.
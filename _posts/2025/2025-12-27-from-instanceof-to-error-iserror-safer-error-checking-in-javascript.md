---
layout: post
title: "From instanceof to Error.isError: safer error checking in JavaScript"
description: ...
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 0
---

For years, JavaScript developers have leaned on `instanceof` to determine whether a value is an `Error`. It's simple, familiar, and...surprisingly fragile.

```js
err instanceof Error // true or... maybe not?
```

In 99% of cases, `instanceof` works just fine. But when you're working with **cross-realm objects**, like errors passed between iframes, workers, or different execution contexts, things start to fall apart.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

A **realm** is an execution context with its own set of built-in objects, its own `Object`, `Array`, `Error`, and so on. So even if two values are both `Error` instances, if they come from different realms, JavaScript treats them as distinct types.

{::nomarkdown}
</aside>
{:/}

Enter: **`Error.isError()`**, a new static method that recently reached **Stage 4** in the TC39 proposal process. That means it's now officially part of the ECMAScript standard and on its way to wide support in environments like modern browsers and Node.js.

Let's dig into why this matters, how it works, and when you should start using it.

## The problem with `instanceof`

Let's say you have two JavaScript realms. For example, a parent window and an iframe:

```js
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);

const err = new iframe.contentWindow.Error('Oops!');
err instanceof Error; // ❌ false!
```

Why does this return `false`? Because `err` is an instance of `Error` from the iframe's global object, not from the parent document. Since `instanceof` checks the prototype chain, and the prototype from one realm doesn't match the prototype in another, the check fails, even though the value is clearly an `Error`.

This issue crops up in more places than you'd expect:

- Browser extensions
- Server-side rendering (SSR)
- Workers and iframes
- Testing environments
- Anything crossing boundaries between execution contexts

> Imagine a logging tool capturing errors from a worker thread, `instanceof Error` silently fails, and your logs miss crucial stack traces. These bugs can be subtle and hard to debug.

## The solution: `Error.isError()`

`Error.isError(value)` is a new static method that provides a realm-safe way to check whether a value is an error object.

- It returns `true` for all native `Error` instances (regardless of realm)
- It returns `false` for everything else
- It doesn't throw, even on edge cases

Here's the syntax:

```js
Error.isError(value)
```

And here it is in action:

```js
Error.isError(new Error('Oops'))               // true
Error.isError(new TypeError('Bad type'))       // true
Error.isError('just a string')                 // false
Error.isError({ message: 'Not really error' }) // false
Error.isError(Object.create(Error.prototype))  // true
```

> This works because the object inherits from `Error.prototype`, mimicking the structure of a real error, and internally, it's treated as such by `Error.isError()`.

And most importantly:

```js
const err = new iframe.contentWindow.Error('Oops');
Error.isError(err); // ✅ true
```

Under the hood, `Error.isError()` uses the internal `[[ErrorData]]` slot to determine whether an object is truly an error. That's something you simply can't replicate in userland JavaScript.

## What about custom errors?

Good news: `Error.isError()` works perfectly with custom subclasses of `Error`:

```js
class CustomError extends Error {}

const err = new CustomError('Custom fail');
Error.isError(err); // true
```

As long as your custom error inherits from `Error`, you're covered, even across realms.

## When should you use it?

If you're doing any kind of error type checking, especially in environments where you **can't guarantee you're in the same realm**, you should use `Error.isError()`.

Use cases include:

- Global error handlers
- Logging and monitoring tools
- Testing frameworks
- Web extension APIs
- Server/client boundaries (SSR, Edge Functions)
- Anything involving iframes or web workers

You don't *have* to stop using `instanceof`, especially for simple or internal-only code. But for robust, cross-context applications, `Error.isError()` is the safer choice.

## Browser and runtime support

Since `Error.isError()` is now **Stage 4**, it's being rolled out to JavaScript engines. As of writing, it's already implemented in [recent versions of V8](https://v8.dev) (used by Chrome and Node.js), and other engines are catching up.

You can safely feature-detect it:

```js
if (typeof Error.isError === 'function') {
  Error.isError(err);
} else {
  // Fallback — not realm-safe
  err instanceof Error;
}
```

If you need to support older environments, you can write a polyfill that mimics the behavior, but note the limitations.

> You can cover many cases using prototype checks or duck typing, but without access to the internal `[[ErrorData]]` slot, a polyfill can never be truly realm-safe. At best, it's a partial solution.

## TL;DR

- `instanceof Error` fails across JavaScript realms
- `Error.isError()` is a new, standardized, cross-realm-safe method for error detection
- It's part of ECMAScript (Stage 4) and rolling out in modern environments
- Use it in tools, frameworks, and any app with multi-context execution

> JavaScript keeps evolving, and in this case, the fix is small but powerful. Safer error checking means more resilient applications, fewer debugging nightmares, and cleaner, future-ready code. Start using `Error.isError()` today where it makes sense.

Let me know if you want this formatted for a particular blogging platform (Markdown with front matter, HTML, etc.), or if you'd like an abridged version for sharing on social media.

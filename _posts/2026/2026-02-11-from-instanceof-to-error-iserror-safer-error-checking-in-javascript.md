---
layout: post
title: "From instanceof to Error.isError: safer error checking in JavaScript"
description: "Why instanceof error fails across realms and how Error.isError() makes error handling safer."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 0
---

For a long time, JavaScript developers have relied on `instanceof` to answer the question, "Is this an error?"

```js
err instanceof Error // true...usually
```

In straightforward, single-realm code, that works fine. Most of the time you never think twice about it. But once values start coming from other execution contexts, things get weird. And the failures are silent.

## The cross-realm problem

JavaScript doesn't run in just one global environment. It has **realms**, which are separate JavaScript worlds with their own globals and their own built-ins like `Object`, `Array`, and `Error`.

Two values can both be real errors, but if they were created in different realms, JavaScript treats them as different things. That distinction matters more than you might expect.

## Why `instanceof` breaks down

Think about a simple example using an iframe:

```js
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);

const err = new iframe.contentWindow.Error('Oops!');
err instanceof Error; // false
```

At first glance that result looks wrong: `err` *is* an error.

The catch is that it wasn't created with your `Error` constructor. It was created with the iframe's `Error` constructor. Since `instanceof` works by walking the prototype chain, which is specific to each realm, the check fails.

This comes up in more places than most people realize:

- Workers and iframes
- Browser extensions
- Server side rendering
- Test runners
- Anything that crosses execution contexts

If you've ever wondered why a logging system suddenly stopped showing stack traces, this kind of check is often the reason. It's easy to miss in code reviews because nothing looks obviously wrong.

## Enter `Error.isError()`

JavaScript now has `Error.isError(value)`, which provides a realm-safe way to answer, "Is this actually an error?"

<!-- The method has reached **Stage 4** in the TC39 process. That means the feature is finalized in the specification. Engine support still rolls out over time, but the API shape won't change. -->

Here is what it guarantees:

- `true` for real `Error` objects, even across realms
- `false` for non errors
- It never throws, even for odd or unexpected inputs

The API itself is <!--intentionally--> simple:

```js
Error.isError(value)
```

And the behavior lines up with expectations:

```js
Error.isError(new Error('Oops'))               // true
Error.isError(new TypeError('Bad type'))       // true
Error.isError('just a string')                 // false
Error.isError({ message: 'Not really error' }) // false
Error.isError(Object.create(Error.prototype))  // false
```

That last case is important. Even though the object inherits from `Error.prototype`, it was never created as an actual error. `Error.isError()` correctly rejects it.

The cross-realm case now behaves the way most developers expect:

```js
const err = new iframe.contentWindow.Error('Oops');
Error.isError(err); // true
```

Under the hood, this works because the engine checks an internal error brand that only genuine error objects have. You can't reliably reproduce that in user space JavaScript. That's why earlier workarounds were always fragile.

One practical detail is worth mentioning. In browsers, `Error.isError()` also returns `true` for `DOMException` objects. Even though `DOMException` isn't a subclass of `Error` in the usual prototype sense, the platform treats it as a real error. This is usually what you want in logging or error handling code.


## Custom errors

Custom error classes work as expected.

```js
class CustomError extends Error {}

const err = new CustomError('Custom fail');
Error.isError(err); // true
```

As long as your custom error extends `Error` correctly, it's treated as a real error, even across realms.

## When should you use this?

If your code ever handles errors that come from outside its own execution context, `Error.isError()` is the safer default.

Common examples include:

- Global error handlers
- Logging and monitoring tools
- Test frameworks
- Web extensions
- Server and client boundaries such as SSR or edge runtimes
- Workers, iframes, and third-party code

In these situations, relying on `instanceof Error` can quietly miss genuine errors. That's worse than throwing, because you don't notice until something downstream breaks.

It also means you can stop leaning on brittle heuristics like this:

```js
err &&
typeof err === 'object' &&
'message' in err &&
'stack' in err
```

You don't have to ban `instanceof` everywhere. In small, tightly scoped code, it's fine. Once boundaries are involved, `Error.isError()` is the more reliable check.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">☝🏻 By the way...</div>

Once you can reliably identify real error objects, the next challenge is preserving useful context as they move through your code. The [`Error.cause` API]({% post_url 2025-11-10-error-chaining-in-javascript-cleaner-debugging-with-error-cause %}) helps with that.

{::nomarkdown}
</aside>
{:/}

## Adopting it without a big refactor

You don't need to rewrite your entire codebase to start using this.

A small wrapper gets you most of the benefit:

```js
function isError(value) {
  return typeof Error.isError === 'function'
    ? Error.isError(value)
    : value instanceof Error;
}
```

Use this in boundary-heavy places like logging, error handling, or framework glue instead of sprinkling `instanceof Error` throughout the code.

This approach gives you:

- Realm-safe behavior in modern runtimes
- A reasonable fallback in older ones
- A single place to update later when support is universal

Start at the edges of your application. That's where cross-realm errors tend to sneak in.

## Can you use this today?

`Error.isError()` is supported in all modern environments, however, Safari ony has partial support:

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

If you need to support older environments, you can write a polyfill. Just be realistic about its limits. Without access to the engine's internal error branding, no polyfill can be truly realm-safe.

## Why this matters

- `instanceof Error` can fail across realms
- `Error.isError()` checks what you actually care about
- The feature is standardized and shipping
- You can adopt it incrementally

This is a small change that removes an entire class of annoying bugs. If your code touches workers, iframes, extensions, or server boundaries, switching to `Error.isError()` is an easy win and one less thing to be quietly wrong.
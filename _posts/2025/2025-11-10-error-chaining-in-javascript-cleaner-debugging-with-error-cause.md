---
layout: post
title: "Error chaining in JavaScript: cleaner debugging with Error.cause"
description: "Use JavaScript's 'cause' property to chain errors, preserve context, and simplify debugging. Cleaner stack traces, better test assertions."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, TypeScript]
comments: true
views:
  ga4: 5490
---

Error handling in JavaScript has always felt a bit chaotic. Throwing errors is easy, but tracing them back to the root cause? Not so much. That's where the `cause` property comes in.

## The problem with traditional error handling

When you're working with layered code (e.g., services calling services, wrapper functions, bubbling errors, etc.), it's easy to lose track of what *actually* broke. Traditionally, you might write something like this:

```js
try {
  JSON.parse('{ bad json }');
} catch (err) {
  throw new Error('Something went wrong: ' + err.message);
}
```

Sure, you wrapped the error, but you've lost the original stack trace and error type.

## Introducing `Error.cause`

By using the [`cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause){:target="_blank"}{:rel="noopener noreferrer"} parameter, you can preserve the original error cleanly:

```js
try {
  try {
    JSON.parse('{ bad json }');
  } catch (err) {
    throw new Error('Something went wrong', { cause: err });
  }
} catch (err) {
  console.error(err.stack);
  console.error('Caused by:', err.cause.stack);
}
```

Here's what happens when you use `Error.cause` (notice how you can access both stack traces):

```js
Error: Something went wrong
    at ...
Caused by: SyntaxError: Unexpected token b in JSON at position 2
    at JSON.parse (<anonymous>)
    at ...
```

Now you're preserving the original error *while* surfacing a clear top-level message.

## What it looks like in practice

```js
function fetchUserData() {
  try {
    JSON.parse('{ broken: true }'); // ← This will fail
  } catch (parseError) {
    throw new Error('Failed to fetch user data', { cause: parseError });
  }
}

try {
  fetchUserData();
} catch (err) {
  console.error(err.message); // "Failed to fetch user data"
  console.error(err.cause);   // [SyntaxError: Unexpected token b in JSON]
  console.error(err.cause instanceof SyntaxError); // true
}
```

That's pretty slick.

The `cause` property is **non-enumerable** by specification when passed through the `Error` constructor, so it won't clutter logs or `for...in` loops unless you explicitly access it. (This mirrors how `message` and `stack` behave.)

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** JavaScript doesn't automatically merge stack traces. The new error's stack trace stands alone. To see the full picture, inspect `err.cause.stack` manually.

{::nomarkdown}
</aside>
{:/}

## Before `cause`: hacky workarounds

Prior to `cause` being introduced (ES2022), developers relied on inconsistent workarounds: string concatenation, custom `.originalError` properties, or fully wrapping the error. These approaches overwrite valuable metadata, such as the original stack trace or error type.

The `cause` property solves this in a clean, standardized way.

## Works with custom errors, too

You can also use `cause` in your own error classes:

```js
class DatabaseError extends Error {
  constructor(message, { cause } = {}) {
    super(message, { cause });
    this.name = 'DatabaseError';
  }
}
```

If you're targeting ES2022+ runtimes, that's all you need: `super(message, { cause })` handles it automatically.

For **TypeScript** users, make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022"]
  }
}
```

Otherwise you might see a type error when passing `{ cause }` to the `Error` constructor.

## Better test assertions

Error chaining isn't just useful at runtime. It helps in tests, too.

Let's say your service throws a `UserCreationError`, caused by a `ValidationError`. Instead of checking only the top-level error, you can assert:

```js
expect(err.cause).toBeInstanceOf(ValidationError);
```

It makes your tests clearer and more robust.

## Gotchas and best practices

By default, `console.error(err)` logs only the top-level error. The `cause` chain isn't displayed automatically, so log it manually:

```js
console.error(err);
console.error('Caused by:', err.cause);
```

And don't overdo it. Chaining every minor error can make debugging *more* confusing. Use it where context really matters.

## Recursively log the full error chain

Here's a small helper that walks the chain safely:

```js
function logErrorChain(err, level = 0) {
  if (!err) return;
  console.error(' '.repeat(level * 2) + `${err.name}: ${err.message}`);

  if (err.cause instanceof Error) {
    logErrorChain(err.cause, level + 1);
  } else if (err.cause) {
    console.error(' '.repeat((level + 1) * 2) + String(err.cause));
  }
}
```

For full stack traces:

```js
function logFullErrorChain(err) {
  let current = err;
  while (current) {
    console.error(current.stack);
    current = current.cause instanceof Error ? current.cause : null;
  }
}
```

Great for deep systems where multiple things can go wrong at different layers.

## Chaining errors across layers

Imagine this flow:

- A database call fails with a `ConnectionTimeoutError`
- It's caught and re-thrown as a `DatabaseError`
- That's caught again and wrapped in a `ServiceUnavailableError`

```js
class ConnectionTimeoutError extends Error {}
class DatabaseError extends Error {}
class ServiceUnavailableError extends Error {}

try {
  try {
    try {
      throw new ConnectionTimeoutError('DB connection timed out');
    } catch (networkErr) {
      throw new DatabaseError('Failed to connect to database', { cause: networkErr });
    }
  } catch (dbErr) {
    throw new ServiceUnavailableError('Unable to save user data', { cause: dbErr });
  }
} catch (finalErr) {
  logErrorChain(finalErr);
}
```

Console output:

```js
ServiceUnavailableError: Unable to save user data
  DatabaseError: Failed to connect to database
    ConnectionTimeoutError: DB connection timed out
```

Error chaining gives you a clear view of what happened...and *where*.

## Browser and runtime support

The `.cause` parameter is supported in all modern environments:

- ✅ Chrome 93+, Firefox 91+, Safari 15+, Edge 93+
- ✅ Node.js 16.9+
- ✅ Bun and Deno (current releases)

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** DevTools might not display `cause` automatically. Log it explicitly (`console.error('Caused by:', err.cause)`). If you transpile with Babel or TypeScript, this feature isn't polyfilled.

{::nomarkdown}
</aside>
{:/}

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">📌 More modern patterns</div>

If you're all about writing cleaner async code, you'll love what [`Array.fromAsync()`]({% post_url 2025-07-14-modern-async-iteration-in-javascript-with-array-fromasync %}) brings to the table.

{::nomarkdown}
</aside>
{:/}

## Modern error chaining

- ✅ Use `new Error(message, { cause })` to preserve context
- ✅ Works with both built-in and custom error classes
- ✅ Supported in all modern runtimes (browsers, Node, Deno, Bun)
- ✅ Improves logs, debugging, and test assertions
- ✅ TypeScript: set `"target": "es2022"` and `"lib": ["es2022"]`
- ⚠️ Don't forget to log `err.cause` or walk the chain manually

Cleaner stack traces. Better context. Happier debugging.
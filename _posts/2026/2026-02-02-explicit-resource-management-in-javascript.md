---
layout: post
title: "Explicit resource management in JavaScript"
description: "I've forgotten to close files and release locks more than once. The new using keyword makes cleanup the runtime's job."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 3577
---

Writing JavaScript that opens something (a file, a stream, a lock, a database connection) also means remembering to clean it up. That cleanup doesn't always happen. I know I've missed it more than once.

JavaScript has always made this our problem. We use `try / finally`, tell ourselves we'll be careful, and hope we didn't miss an edge case. It usually works, but it's noisy and easy to get subtly wrong, especially with more than one resource.

That's finally starting to change. Explicit resource management gives JavaScript a language-level way to say, "This thing needs cleanup, and the runtime will guarantee it happens."

## We're bad at cleanup (and the language doesn't help)

This pattern should look familiar:

```js
const file = await openFile("data.txt");

try {
  // do something with file
} finally {
  await file.close();
}
```

This is fine, but it's verbose and easy to mess up during refactors.

Now add *another* resource:

```js
const file = await openFile("data.txt");
const lock = await acquireLock();

try {
  // work with file and lock
} finally {
  await lock.release();
  await file.close();
}
```

Now order matters. Error paths matter. It's a lot to keep in your head.

Other languages solved this years ago. JavaScript is (slowly) catching up.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">📌 More on async</div>

`await` in loops isn't always what you think. Here's where [things start to break down]({% post_url 2025-10-20-rethinking-async-loops-in-javascript %}).

{::nomarkdown}
</aside>
{:/}

## `using`: cleanup, but make it the runtime's job

`using` declares a resource that's automatically cleaned up when it goes out of scope.

```js
using file = await openFile("data.txt");

// do something with file

// file is automatically closed at the end of this scope
```

No `try`. No `finally`. No "did I remember to close this?"

The key shift is that cleanup is tied to lifetime, not control flow.

## How cleanup actually works

Resources opt in by implementing a well-known symbol:

- `Symbol.dispose` for synchronous cleanup
- `Symbol.asyncDispose` for asynchronous cleanup

For example:

```js
class FileHandle {
  async write(data) {
    /* ... */
  }

  async [Symbol.asyncDispose]() {
    await this.close();
  }
}
```

Once a value has one of these methods, it can be used with `using`.

`using` doesn't close anything on its own. It just standardizes cleanup so every library doesn't invent its own.

## When you need `await using`

If cleanup is asynchronous, you'll typically use `await using`:

```js
await using file = await openFile("data.txt");

// async work with file
```

When the scope ends, JavaScript will *await* disposal before continuing.

Synchronous resources (locks, in-memory structures) can use plain `using`.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">📌 Related</div>

`Array.fromAsync()` is another sign JavaScript is taking async seriously: [modern async iteration in JavaScript]({% post_url 2025-07-14-modern-async-iteration-in-javascript-with-array-fromasync %}).

{::nomarkdown}
</aside>
{:/}

## Stacking resources

Instead of:

```js
const file = await openFile("data.txt");
const lock = await acquireLock();

try {
  // work
} finally {
  await lock.release();
  await file.close();
}
```

You write:

```js
await using file = await openFile("data.txt");
using lock = await acquireLock();

// work
```

Cleanup runs in reverse order, like a stack (`lock` is released, then `file` is closed). Errors don't skip disposal.

## Scope is the point

A `using` declaration is scoped just like `const` or `let`:

```js
{
  await using file = await openFile("data.txt");
  // file is valid here
}

// file is disposed here
```

This pushes you toward tighter scopes and makes lifetimes visible, which JavaScript has never been good at.

## When `using` isn't enough

Not every resource fits neatly into a block. Sometimes acquisition is conditional, or you're refactoring older code and don't want to introduce new scopes everywhere.

That's where `DisposableStack` and `AsyncDisposableStack` come in:

```js
const stack = new AsyncDisposableStack();

const file = stack.use(await openFile("data.txt"));
const lock = stack.use(await acquireLock());

// work with file and lock

await stack.disposeAsync();
```

Same safety as `using`, more flexibility. Stacks are the escape hatch.

## It's not only for back-end code

At first glance this can feel like a server-side concern, but it applies just as much on the front end and in platform code:

- Web Streams
- `navigator.locks`
- Observers and subscriptions
- IndexedDB transactions

If you've written `subscribe()` / `unsubscribe()` or `open()` / `close()` pairs, this applies to you.

## What's the catch?

As of early 2026, Chrome 123+ and Firefox 119+ support all of these features. Node.js 20.9+, too. Safari support is still pending.

For now, it's something to experiment with, especially if you maintain libraries.

## A better default for cleanup

`using` doesn't replace `try / finally`. I'll still use that when I need finer control. But for the usual open-and-close cases, I'd rather the language handle it.
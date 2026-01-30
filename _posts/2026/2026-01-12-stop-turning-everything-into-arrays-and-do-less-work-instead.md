---
layout: post
title: "Stop turning everything into arrays (and do less work instead)"
description: "Do less work in JavaScript: lazy data pipelines with iterator helpers instead of arrays."
tags: [JavaScript]
comments: true
views:
  ga4: 8261
---

Most front-end code processes data long before it ever hits the screen. We fetch a list, tweak it, trim it down, and repeat. And usually without thinking too hard about how much work we're doing along the way.

For years, modern JavaScript has pushed us toward a familiar pattern:

```js
data
  .map(...)
  .filter(...)
  .slice(...)
  .map(...)
```

It's readable and expressive. It's also eager, allocates multiple arrays, and often does **unnecessary work**.

**Iterator helpers** in JavaScript gives us a native, lazy alternative that's especially relevant for dealing with large datasets, streams, and UI-driven logic.

## Arrays everywhere (and way more work than necessary)

Consider this UI scenario:

- You fetch a large dataset
- You filter it
- You take the first few results
- You render them

```js
const visibleItems = items
  .filter(isVisible)
  .map(transform)
  .slice(0, 10);
```

Looks harmless, right? I've written this exact chain more times than I want to admit. Under the hood:

1. `filter` creates a new array
2. `map` creates another array
3. `slice` creates yet another array

Even if you only need 10 items, you might've processed *thousands*. That mismatch is the whole problem. And it's where iterator helpers pay off.

## So, what are iterator helpers?

Iterator helpers are **chainable methods on iterator objects**, not arrays.

That distinction matters. And yeah, it's easy to miss at first: arrays don't magically gain these methods. You need an iterator from `values()`, `keys()`, `entries()`, or a generator. Then you can build a lazy pipeline on top of it.

They let you do things like:

{::nomarkdown}
<div class="multi-column">
{:/}

- `map`
- `filter`
- `take`
- `drop`
- `flatMap`
- `find`, `some`, `every`
- `reduce`
- `toArray`

{::nomarkdown}
</div>
{:/}

Most of these helpers are **lazy**, meaning they only pull values as needed.

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** `reduce` eagerly consumes the iterator, since it must see every value to produce a result.

{::nomarkdown}
</aside>
{:/}

In general, laziness means:

- No intermediate arrays
- No unnecessary work
- And most importantly, things stop as soon as they can

You describe *what* you want, and the runtime pulls values only when needed.

## Lazy by default

Here's the same logic with iterator helpers:

```js
const visibleItems = items
  .values()
  .filter(isVisible)
  .map(transform)
  .take(10)
  .toArray();
```

So what actually changed here?

- `items.values()` gives you an **iterator**, not an array
- Each step runs **only when the next value is requested**
- Processing stops after 10 matches

## What this buys you in real apps

It's not always about raw speed, it's about avoiding unnecessary work. Iterator helpers unlock **better UI patterns**.

### Rendering large lists

If you're dealing with:

- Virtualized lists
- Infinite scrolling
- Large tables

Lazy iteration means you don't process items that never reach the screen:

```js
function* rows(data) {
  for (const row of data) {
    yield renderRow(row);
  }
}

const visibleRows = rows(data)
  .filter(isInViewport)
  .take(20)
  .toArray();
```

You render exactly what you need and nothing more.

### Streaming & async data

**Async iterables** have their own iterator helpers, which makes them a great fit for paginated APIs and streams:

```js
async function* fetchPages() {
  let page = 1;
  while (true) {
    const res = await fetch(`/api/items?page=${page++}`);
    if (!res.ok) return;
    yield* await res.json();
  }
}

const firstTen = await fetchPages()
  .filter(isValid)
  .take(10)
  .toArray();
```

No buffering entire responses, no manual counters. Just describe the pipeline and let the runtime pull what's needed.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">💡 Ready for more?</div>

See how `await` works in loops and how to [structure async logic efficiently]({% post_url 2025-10-20-rethinking-async-loops-in-javascript %}).

{::nomarkdown}
</aside>
{:/}

### Cleaner data pipelines (without utility libraries)

Before iterator helpers, you might've reached for libraries just to get lazy pipelines. Now it's part of the language:

```js
const ids = users
  .values()
  .map(u => u.id)
  .filter(Boolean)
  .toArray();
```

Readable, native, zero dependencies.

## Iterator helpers vs. array methods

{::nomarkdown}
<div class="table-container">
{:/}

| Array methods            | Iterator helpers      |
| ------------------------ | --------------------- |
| Eager                    | Lazy                  |
| Allocate new arrays      | Minimal allocations   |
| Always process all items | Can stop early        |
| Familiar                 | Slight learning curve |

{::nomarkdown}
</div>
{:/}

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

**Rule of thumb:** if you don't need the whole array, don't create one.

{::nomarkdown}
</aside>
{:/}

## When *not* to use iterator helpers

Iterator helpers are powerful, but they're not a replacement for arrays everywhere. If you try to force them into every situation, you'll just make your code harder to read. They're a poor fit when:

- You need random access (`items[5]`)
- You rely heavily on array mutation
- Your data size is small and simplicity wins

## Gotchas you should know about

Iterator helpers behave differently than arrays in a few important ways.

{::nomarkdown}
<div class="table-container">
{:/}

| Gotcha                  | What it means                    | Why it matters                           |
| ----------------------- | -------------------------------- | ---------------------------------------- |
| One-shot iterators      | Once consumed, they're done      | You can't reuse the same pipeline twice  |
| Lazy execution          | Nothing runs until consumption   | Side effects may appear "missing"        |
| Sequential only         | No random access                 | Patterns like `items[5]` don't translate |
| Debugging consumes data | Logging can advance the iterator | `console.log` can change behavior        |

{::nomarkdown}
</div>
{:/}

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

Think of iterators as **work that hasn't happened yet**, not data you already have.

{::nomarkdown}
</aside>
{:/}

## Can I use this today?

Iterator helpers are supported in all modern browsers and Node 22+. If you're targeting anything current, you're fine.

## Doing less work on purpose

For a long time JavaScript trained us to eagerly turn everything into arrays. Iterator helpers give us another option:

- Do less work
- Allocate less memory
- Write pipelines that match how UIs actually behave

And once you get used to lazy iteration, going back to eager chains feels a bit wasteful.
---
layout: post
title: "The quiet problem with unnecessary async"
description: "Not every JavaScript function needs to be async. Unnecessary async boundaries can spread Promise-based complexity through an entire application."
tags: [JavaScript, React]
comments: true
views:
  ga4: 1227
---

There's a pattern in JavaScript codebases that quietly spreads complexity through entire applications. You've probably seen something like this:

```js
async function getConfig() {
  return defaultConfig;
}
```

At first glance, this barely feels like a decision.

Maybe one day `getConfig()` will fetch something remotely. Maybe it'll hit IndexedDB later. Making it `async` now can feel harmless, even responsible.

The problem is that `async` **changes the contract of the function**.

## What changes when a function becomes `async`

The moment a function becomes `async`, it stops returning a value directly and starts returning a Promise, even if there's no `await` inside.

That changes every caller downstream.

```js
const config = getConfig();
```

becomes:

```js
const config = await getConfig();
```

And once that happens, the surrounding code starts adapting, too:

- Callers become async-aware
- Tests become async-aware
- Composition utilities start propagating Promises

People sometimes call this the function coloring problem:

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

Async behavior tends to propagate outward through call chains.

{::nomarkdown}
</aside>
{:/}

Years ago I inherited a codebase where almost every helper returned a Promise. Tracing a request path meant following `await` after `await` before eventually discovering where the actual asynchronous work was happening. Most of those functions were just returning data that was already in memory.

What made it frustrating wasn't the syntax itself. It was the uncertainty. Every function looked equally "asynchronous" from the outside, so the signatures stopped telling me where the real I/O lived.

That's when I started paying more attention to where async boundaries actually belong.

## "We might need it later"

A common justification looks like this:

```js
async function getFeatureFlags() {
  return localFlags;
}
```

And the reasoning is usually:

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

"We might fetch these from the server later."

{::nomarkdown}
</aside>
{:/}

Sometimes that's a good reason.

Public libraries often expose async APIs early because changing them later can be painful. Consistency across implementations matters, too.

Application code tends to be different. Internal helpers often become `async` speculatively even when nothing asynchronous is happening yet.

Right now:

- There's no suspension point
- No I/O
- No asynchronous dependency

But every consumer still pays the async cost today.

## `async` communicates meaning

When I'm skimming code I'm unfamiliar with, I use **function signatures** as shortcuts.

If I see this:

```js
async function loadUser()
```

I assume there's a real boundary there somewhere:

- Network activity
- Storage access
- Background processing

Something that can't be produced immediately.

That's useful information. Function signatures help us build a mental model of a system. When a function returns synchronously available data, marking it `async` starts implying work that isn't actually happening.

## The mental overhead

Performance usually isn't the issue here. Modern JavaScript engines handle Promises well. The cost is mostly cognitive.

Compare:

```js
function getTheme() {
  return currentTheme;
}
```

with:

```js
async function getTheme() {
  return currentTheme;
}
```

Now compare the call sites:

```js
const theme = getTheme();
applyTheme(theme);
```

vs.:

```js
const theme = await getTheme();
applyTheme(theme);
```

One stays inside synchronous control flow. The other introduces async flow, even though the underlying data is already available.

Tests often make this especially noticeable. One unnecessary Promise can turn a simple test file into a chain of async setup and assertions.

## Async boundaries matter

Modern front-end systems are already heavily async:

- Streaming SSR
- React Server Components
- Edge runtimes
- Server actions
- Async routing
- Suspense-driven rendering

Async boundaries affect rendering behavior, composition, error handling, debugging, and the shape of an application. Because of that, I try to treat them as architectural decisions rather than implementation details.

A rough rule I follow: `async` should represent real async boundaries, not hypothetical future requirements. If a function doesn't await anything, it's worth asking why it's async in the first place.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">📌 On a related note...</div>

I've touched on this idea before. [Async loops and iteration patterns in JavaScript]({% post_url 2025-10-20-rethinking-async-loops-in-javascript %}) expose many of the same tradeoffs around async boundaries and control flow.

{::nomarkdown}
</aside>
{:/}

## Keep APIs honest

Instead of designing around what a function might someday become, design around what it is today.

If it's synchronous:

```js
function getConfig() {
  return defaultConfig;
}
```

keep it synchronous.

If real asynchronous work arrives later, introduce async semantics deliberately. Until then, smaller async boundaries are easier to reason about, easier to trace, and make function signatures more meaningful.

Because `async` doesn't just change a function implementation. **It changes the shape of the code around it.**

The biggest differences are:

- Added a concrete personal anecdote early.
- Removed some repeated "async propagates outward" explanations.
- Replaced a few generalized statements ("people rely on function signatures") with first-person observations ("when I'm skimming unfamiliar code...").
- Tightened the ending so it lands a little harder instead of re-explaining the thesis one more time.
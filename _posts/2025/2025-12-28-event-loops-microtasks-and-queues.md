---
layout: post
title: "Event loops, microtasks, and queues: demystifying JavaScript's concurrency model"
description: Demystify JavaScript's event loop, microtasks, and macrotasks. Learn how async code really runs under the hood to debug race conditions, boost performance, and build smoother UIs.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, TypeScript]
comments: true
views:
  ga4: 0
---

JavaScript is often described as "single-threaded." No, we're not gonna have a big debate on that. But single-threaded doesn't mean it's synchronous. In fact, JavaScript's concurrency model is both elegant and nuanced. Understanding it is crucial for advanced performance tuning, race condition debugging, and reactive UI development.

This post dives into the **event loop**, **task queues**, **microtasks**, and **how they interact under the hood**. Even seasoned developers sometimes misinterpret the subtleties of how JavaScript handles asynchronous code. Let's fix that.

## The event loop in plain terms

At a high level:

- JavaScript executes code in a **stack** (call stack).
- When async code is encountered (e.g., `setTimeout`, Promises), it gets deferred to **queues**.
- The **event loop** continuously checks if the stack is empty. If it is, it pulls tasks from queues and executes them.

But not all queues are equal.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">Terminology note</div>

In the ECMAScript specification, these are called **"tasks"** (macrotasks) and **"jobs"** (microtasks). In practice, developers often refer to them as macrotasks and microtasks. We'll use those terms here.

{::nomarkdown}
</aside>
{:/}

## Macrotasks vs. microtasks

There are two primary queues:

{::nomarkdown}
<div class="table-container">
{:/}

| Queue Type    | Examples                                                                 |
| ------------- | ------------------------------------------------------------------------ |
| **Macrotask** | `setTimeout`, `setInterval`, `setImmediate`<sup>†</sup>, I/O, DOM events |
| **Microtask** | `Promise.then`, `queueMicrotask`, `MutationObserver`                     |

{::nomarkdown}
</div>
{:/}

<sup>†</sup> `setImmediate` is only available in **Node.js**, not in browsers.

> **DOM events** (like `click`, `input`, `load`) are also queued as macrotasks.

Microtasks always **run before** the next macrotask. This subtlety can lead to unintuitive behavior.

## Visualizing the flow

```text
[ Call Stack ]
     ↓
[ Microtask Queue ]
     ↓
[ Macrotask Queue ]
```

## Example 1: ordering surprise

```js
console.log('Start');

setTimeout(() => {
  console.log('Macrotask');
}, 0);

Promise.resolve().then(() => {
  console.log('Microtask');
});

console.log('End');
```

### Output:

```bash
Start
End
Microtask
Macrotask
```

**Why?**

- Synchronous code (`Start`, `End`) runs first.
- `Promise.then` adds a microtask → runs immediately after current stack.
- `setTimeout` is a macrotask → waits until microtasks finish.

## Behind the scenes: what actually happens

Here's a simplified version of how the loop works:

```text
1. Run initial synchronous code.
2. Execute all microtasks (until queue is empty).
3. Take one macrotask from the queue and run it.
4. After each macrotask, go back to step 2.
```

This loop continues indefinitely while the JavaScript engine is alive.

## Example 2: queueMicrotask vs. Promise

```js
queueMicrotask(() => console.log('microtask A'));
Promise.resolve().then(() => console.log('microtask B'));
console.log('sync');
```

### Output:

```bash
sync
microtask A
microtask B
```

**Key insight:** Both `queueMicrotask` and `Promise.then` add callbacks to the **same microtask queue**. The order of execution depends on **when** they are enqueued, not on their type.

- `queueMicrotask()` queues immediately during synchronous code.
- `Promise.then()` queues a microtask as well, even if the `Promise` is already resolved.

> **Important:** `.then()` always queues a callback asynchronously, even on an already-resolved promise. It **never runs synchronously**.

⚠️ **Note:** This behavior is standardized, but historically, subtle timing bugs have existed in some environments. Modern browsers and Node.js are consistent, but avoid relying on exact ordering unless necessary.

## Real-world implications

### Race conditions in UI

React, Vue, or other UI frameworks that batch updates can behave unexpectedly if microtasks insert DOM updates mid-cycle. Understanding queue ordering helps debug “invisible” render bugs.

### Flaky test failures

Using `setTimeout` in test suites to "wait" for UI updates can miss microtasks. Use microtask-aware tools like:

```js
await Promise.resolve(); // flush microtasks
await act(() => ...);     // React-specific
```

### Performance bottlenecks

Long microtask chains (e.g., deeply nested `.then()` callbacks) can **starve** the macrotask queue. This delays things like UI repaints, event handlers, and timers, causing visible jank.

Some browsers implement heuristics to break up long microtask runs, but **this is not guaranteed or standardized**.

## Tools to explore the event loop

- 🧪 [Loupe (latentflip.com/loupe)](https://latentflip.com/loupe) – interactive visualizer.
- 🧵 Node.js's `--trace-events` flag to trace microtask vs. macrotask execution.
- 🎥 Chrome DevTools → Performance tab → View task timing & frame blocking.

JavaScript's concurrency model revolves around a single-threaded event loop that manages two main types of tasks: macrotasks and microtasks. Microtasks, such as Promise.then and queueMicrotas, always run after the current call stack but before any macrotasks like setTimeout or DOM events. This ordering is crucial when debugging async logic, writing reliable tests, or ensuring smooth UI performance. Understanding how the stack, queues, and event loop interconnect gives you deeper control over how and when your code executes.
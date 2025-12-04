---
layout: post
title: "Rethinking async loops in JavaScript"
description: Struggling with 'await' in loops? Explore common mistakes and modern solutions to optimize async code for performance.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 12230
---

Using `await` in loops seems intuitive until your code silently stalls or runs slower than expected. If you've ever wondered why your API calls run one-by-one instead of all at once, or why `map()` and `await` don't mix the way you'd expect, grab a chair. Let's chat.

## The problem: awaiting in a `for` loop

Suppose you're fetching a list of users one-by-one:

```js
const users = [1, 2, 3];

for (const id of users) {
  const user = await fetchUser(id);
  console.log(user);
}
```

This works, but it runs sequentially: `fetchUser(2)` doesn't start until `fetchUser(1)` finishes. That's fine if order matters, but it's inefficient for independent network calls.

## Don't `await` inside `map()` unless you mean to

A common point of confusion is using `await` inside `map()` without handling the resulting promises:

```js
const users = [1, 2, 3];

const results = users.map(async id => {
  const user = await fetchUser(id);
  return user;
});

console.log(results); // [Promise, Promise, Promise] – NOT actual user data
```

This works in terms of syntax and behavior (it returns an array of promises), but not in the way many expect. It doesn't wait for the promises to resolve.

To run the calls in parallel and get the final results:

```js
const results = await Promise.all(users.map(id => fetchUser(id)));
```

Now all the requests run **in parallel**, and `results` contains the actual fetched users.

## `Promise.all()` fails fast, even if just one call breaks

When using `Promise.all()`, a **single rejection** causes the entire operation to fail:

```js
const results = await Promise.all(
  users.map(id => fetchUser(id)) // fetchUser(2) might throw
);
```

If `fetchUser(2)` throws an error (e.g., 404 or network error), the entire `Promise.all` call will reject, and **none** of the results will be returned (including successful ones).

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** `Promise.all()` rejects on the first error, discarding other results. Remaining promises still run, but only the first rejection is reported unless you handle each one individually.

{::nomarkdown}
</aside>
{:/}

## Safer alternatives

### Use `Promise.allSettled()`

```js
const results = await Promise.allSettled(
  users.map(id => fetchUser(id))
);

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('✅ User:', result.value);
  } else {
    console.warn('❌ Error:', result.reason);
  }
});
```

Use this when you want to process **all results**, even if some fail.

### Handle errors inside the mapping function

```js
const results = await Promise.all(
  users.map(async id => {
    try {
      return await fetchUser(id);
    } catch (err) {
      console.error(`Failed to fetch user ${id}`, err);
      return { id, name: 'Unknown User' }; // fallback value
    }
  })
);
```

This also prevents **unhandled promise rejections**, which can trigger warnings or crash your process in stricter environments like Node.js with `--unhandled-rejections=strict`.

## Modern solutions

### Use `for...of` + `await` (sequential execution)

Use when the next operation depends on the result of the previous one, or when API rate limits require it:

```js
for (const id of users) {
  const user = await fetchUser(id);
  console.log(user);
}
```

Or if you're not in an `async` function context:

```js
(async () => {
  for (const id of users) {
    const user = await fetchUser(id);
    console.log(user);
  }
})();
```

- Maintains order
- Useful for rate-limiting or batching
- Slower for independent requests

### Use `Promise.all` + `map()` (parallel execution)

Use when operations are independent and can be performed simultaneously:

```js
const usersData = await Promise.all(users.map(id => fetchUser(id)));
```

- Much faster for network-heavy or CPU-independent tasks
- One rejection causes the whole batch to fail (unless handled)

Use `Promise.allSettled()` or inline `try/catch` for safer batch execution.

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

For short, CPU-bound tasks, parallelism may not make a noticeable difference. But for I/O-heavy operations like API calls, parallelism can dramatically reduce total execution time.

{::nomarkdown}
</aside>
{:/}

### Throttled parallelism (controlled concurrency)

When you need speed but must respect API limits, use a throttling utility like [`p-limit`](https://www.npmjs.com/package/p-limit){:target="_blank"}{:rel="noopener noreferrer"}:

```js
import pLimit from 'p-limit';

const limit = pLimit(2); // Run 2 fetches at a time
const limitedFetches = users.map(id => limit(() => fetchUser(id)));

const results = await Promise.all(limitedFetches);
```

- Balance between concurrency and control
- Prevents overloading external services
- Adds dependency

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">💡 Dig deeper</div>

If you want to see how `await` behaves outside functions altogether, check out my post about [using top-level `await`]({% post_url 2025-06-16-using-await-at-the-top-level-in-es-modules %}) in ES modules.

{::nomarkdown}
</aside>
{:/}

## Concurrency levels

{::nomarkdown}
<div class="table-container">
{:/}

| Goal                       | Pattern                        | Concurrency        |
| -------------------------- | ------------------------------ | ------------------ |
| Keep order, run one-by-one | `for...of` + `await`           | 1                  |
| Run all at once, no order  | `Promise.all()` + `map()`      | ∞ (unbounded) ✅    |
| Limit concurrency          | `p-limit`, `PromisePool`, etc. | N (custom-defined) |

{::nomarkdown}
</div>
{:/}

## Last tip: never use `await` in `forEach()`

This is a common trap:

```js
users.forEach(async id => {
  const user = await fetchUser(id);
  console.log(user); // ❌ Not awaited
});
```

The loop doesn't wait for your `async` function. These fetches run in the background with no guarantee on completion timing or order.

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** `forEach` doesn't wait for async callbacks. Your function may finish before the async work does, leading to silent bugs and missed errors.

{::nomarkdown}
</aside>
{:/}

Instead, use:

- `for...of` + `await` for sequential logic
- `Promise.all()` + `map()` for parallel logic

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">🙋🏻‍♂️ Ready for more?</div>

Looking for a more functional way to handle async iteration? [`Array.fromAsync()`]({% post_url 2025-07-14-modern-async-iteration-in-javascript-with-array-fromasync %}) is designed for consuming async data sources like streams and generators.

{::nomarkdown}
</aside>
{:/}

## Quick recap

JavaScript's async model is powerful, but using `await` inside loops requires intention. Here's the key: structure your async logic **based on your needs**.

- Order → `for...of`
- Speed → `Promise.all()`
- Safety → `allSettled()` / `try-catch`
- Balance → `p-limit`, etc.

With the right pattern, you can write faster, safer, more predictable asynchronous code.
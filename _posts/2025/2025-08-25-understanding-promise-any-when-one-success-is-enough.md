---
layout: post
title: "Understanding Promise.any(): when one success is enough"
description: Learn how Promise.any() helps you handle multiple promises by resolving with the first success, perfect for fallback APIs and progressive features in JavaScript.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 1601
---

Promises have long been our go-to when working with asynchronous code in JavaScript. If you've used `Promise.all()` or `Promise.race()` to coordinate async operations, you know the patterns. But what if you're only interested in the *first successful* result, ignoring failures? That's exactly what `Promise.any()` does: it **fulfills with the first resolved promise** and ignores any that reject (unless *all* reject).

## How it works

```js
Promise.any(iterable)
```

- Takes an iterable of promises.
- Resolves as soon as one fulfills.
- Rejects with an [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError){:target="_blank"}{:\rel="noopener noreferrer"} if *all* reject.

An **empty iterable** rejects immediately with an `AggregateError` whose `.errors` array is empty.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">📌 Performance tip</div>

Promises passed to `Promise.any()` are already running. It doesn't cancel the rest when one succeeds. Use [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController){:\rel="noopener noreferrer"} if cancellation is important.

{::nomarkdown}
</aside>
{:/}

## Everyday scenarios

### Fallback APIs

Imagine you're querying multiple third-party endpoints. You only care about the **first one that works**:

```js
const fetchWithCheck = (url) =>
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response;
    });

Promise.any([
  fetchWithCheck('https://mirror1.example.com/data'),
  fetchWithCheck('https://mirror2.example.com/data'),
  fetchWithCheck('https://mirror3.example.com/data')
])
  .then(response => response.json())
  .then(data => {
    console.log('Got data from the first responsive server:', data);
  })
  .catch(error => {
    if (error instanceof AggregateError) {
      console.error('All servers failed:', error.errors);
    } else {
      console.error('Unexpected error:', error);
    }
  });
```

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** `fetch()` only rejects on network errors (such as being offline) or CORS policy violations, which appear as generic network failures.

{::nomarkdown}
</aside>
{:/}

### Progressive enhancement with optional features

You're building a feature that tries multiple browser APIs. Only one of them needs to succeed for the feature to work:

```js
const tryClipboardAPI = () =>
  navigator.clipboard.readText().then(text => `Clipboard: ${text}`);

const tryLegacyPrompt = () =>
  new Promise((resolve, reject) => {
    const text = prompt('Paste your data:');
    if (text === null) {
      reject(new Error('User cancelled prompt'));
    } else {
      resolve(`Prompt: ${text}`);
    }
  });

Promise.any([
  tryClipboardAPI(),
  tryLegacyPrompt()
])
  .then(result => console.log('Got user input:', result))
  .catch(error => {
    if (error instanceof AggregateError) {
      console.error('No input methods available:', error.errors);
    } else {
      console.error('Unexpected error:', error);
    }
  });
```

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

The Clipboard API often requires explicit user interaction and permissions. It might also reject if called outside a user gesture context (like `click`). Using fallbacks like `prompt()` ensures your feature remains usable across a wider range of browsers and permissions scenarios.

{::nomarkdown}
</aside>
{:/}

Use this pattern to make your features flexible and user-friendly, even in older browsers that lack modern APIs.

## Remember these gotchas

- `Promise.any()` resolves with the **first fulfilled** promise and ignores the rest, even if they later reject.
- If **all promises reject**, it rejects with an `AggregateError`, which contains an `.errors` array of all rejection reasons.
- It **doesn't abort** remaining promises. Use `AbortController` if cancellation is needed.
- Promises are **already running** by the time `Promise.any()` is called. It doesn't defer execution.
- An **empty iterable** causes `Promise.any()` to reject immediately with an `AggregateError` (with an empty `.errors` array).

### Example: handling `AggregateError`

```js
Promise.any([
  Promise.reject(new Error('Error A')),
  Promise.reject(new Error('Error B'))
])
.catch(err => {
  console.log(err instanceof AggregateError); // true
  console.log(err.errors.map(e => e.message)); // ['Error A', 'Error B']
});
```

## Comparing `Promise.any()` with the rest

{::nomarkdown}
<div class="table-container">
{:/}

| Method                 | Resolves when...                       | Rejects when...            | Notes                                |
| ---------------------- | -------------------------------------- | -------------------------- | ------------------------------------ |
| `Promise.all()`        | ✅ All promises fulfill                | ❌ Any promise rejects     | Use when you need **all** results.   |
| `Promise.any()`        | 🟢 First promise fulfills              | 🔴 All promises reject     | Best when **any** success is enough. |
| `Promise.race()`       | 🏁 First promise settles (any outcome) | 👈🏻 Same                    | Returns first **settled** result.    |
| `Promise.allSettled()` | 👍🏻 All promises settle                 | 🚫 Never (always fulfills) | Gives full status of all results.    |

{::nomarkdown}
</div>
{:/}

## Browser support

`Promise.any()` is supported in all modern browsers (Chrome 85+, Firefox 79+, Safari 14+, Edge 85+) and Node.js 15+. For legacy support, you can use a polyfill like [`core-js`](https://www.npmjs.com/package/core-js){:target="_blank"}{:rel="noopener noreferrer"}.

## When not to use `Promise.any()`

Use `Promise.any()` when you're aiming for **at least one success**, and it's okay if some promises fail. But avoid it if:

- You need **all results** → use `Promise.all()`.
- You want the **first to settle**, regardless of success or failure → use `Promise.race()`.
- You need to **handle each outcome individually** → use `Promise.allSettled()` or manual `map()` + `.catch()` handling.

## Success-first async in action

`Promise.any()` is a modern, elegant solution for scenarios where **at least one success is enough**, and **failures are expected**. Whether you're optimizing API calls or enhancing UX with optional features, it's a powerful addition to your async toolkit.

Drop it into your next async workflow, especially where some failure is expected, and let your success come from whichever source gets there first.
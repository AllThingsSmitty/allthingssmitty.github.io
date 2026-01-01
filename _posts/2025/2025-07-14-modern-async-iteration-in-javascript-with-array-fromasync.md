---
layout: post
title: "Modern async iteration in JavaScript with Array.fromAsync()"
description: JavaScript's 'Array.fromAsync()' offers a concise alternative to 'for await...of' when working with async iterables and streams.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 3892
---

As front-end engineers, we frequently deal with asynchronous data, such as API responses, streams, lazy-loaded content, and more. JavaScript has long provided tools for managing async logic, but working with async iterables has often required verbose or manual handling.

Enter `Array.fromAsync()`, a modern addition to JavaScript that simplifies the process of converting async data sources into arrays. It's intuitive, powerful, and designed to work seamlessly with `async`/`await`.

## What's `Array.fromAsync()`?

`Array.fromAsync()` is a new (ES2024) method added to JavaScript that allows you to convert...

- **Async iterables**
- **Regular (sync) iterables**

...into arrays. It's similar to [`Array.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from){:target="_blank"}{:rel="noopener noreferrer"}, but built to handle asynchronous data sources:

```js
Array.fromAsync(source[, mapFn[, thisArg]]) // Returns a Promise<Array>
```

- `source`: An async iterable or a sync iterable.
- `mapFn` (optional): A mapping function applied to each item (can be async).
- `thisArg` (optional): Value to use as `this` inside `mapFn`.

`Array.fromAsync()` returns a **Promise** that resolves to the resulting array.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">✅ Helpful tip</div>

`Array.fromAsync()` expects an iterable. If you pass a single Promise (e.g., `Promise.resolve(1)`), it will throw a `TypeError`. The source must be iterable or async iterable.

{::nomarkdown}
</aside>
{:/}

## Why and when to use it

If you've ever needed to collect items from an async generator, fetch and transform paginated data, or convert a stream into an array, `Array.fromAsync()` is for you.

### Common use cases:

- Transforming data from async APIs or generators
- Flattening asynchronous streams of events or responses
- Replacing verbose `for await...of` loops with a single line
- Simplifying Promise arrays with optional async mapping

## You can...

### Convert an async generator to an array

```js
async function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

const result = await Array.fromAsync(generateNumbers());
console.log(result); // [1, 2, 3]
```

This converts values yielded from an async generator into an array in a single line. It's a concise alternative to manually iterating with `for await...of`.

### Apply a mapping function

```js
const result = await Array.fromAsync(generateNumbers(), x => x * 2);
console.log(result); // [2, 4, 6]
```

The second argument lets you transform each item as it's added to the array. Here, each number is doubled synchronously.

### Use an async mapping function

```js
const result = await Array.fromAsync(generateNumbers(), async x => {
  return x * 10;
});
console.log(result); // [10, 20, 30]
```

You can also use an async function as the mapper, enabling asynchronous operations like fetching or waiting during transformation.

## Compared to other patterns

Before `Array.fromAsync()`, you might have written:

```js
async function collect(generator) {
  const result = [];
  for await (const value of generator) {
    result.push(value);
  }
  return result;
}
```

Or used a Promise-based approach:

```js
const promises = [fetch(url1), fetch(url2)];
const results = await Promise.all(promises);
```

These patterns still work and are sometimes preferable. But `Array.fromAsync()` provides **a concise and expressive alternative**, especially when working with iterators or applying mapping functions.

## Error handling

Errors during iteration or mapping are automatically propagated, whether sync or async. Use `try...catch` to handle them:

```js
try {
  const result = await Array.fromAsync(faultyGenerator(), async x => {
    if (x === 'error') throw new Error('Something went wrong!');
    return x;
  });
} catch (err) {
  console.error('Caught an error:', err.message);
}
```

## From theory to practice

### Loading paginated data

```js
async function* fetchPaginatedData() {
  let page = 1;
  while (page <= 3) {
    const response = await fetch(`/api/data?page=${page}`);
    const data = await response.json();
    for (const item of data.items) {
      yield item;
    }
    page++;
  }
}

const allItems = await Array.fromAsync(fetchPaginatedData());
```

`Array.fromAsync()` collects all the items across pages into a single array, replacing manual loops and accumulation logic.

### Reading from a Stream (Web Streams API)

```js
async function* streamToAsyncIterator(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

const response = await fetch('/large-file.txt');
const chunks = await Array.fromAsync(streamToAsyncIterator(response.body));

// Optional: Decode chunks into text if the stream is textual (e.g., a .txt or JSON file)
const decoder = new TextDecoder();
const textChunks = chunks.map(chunk => decoder.decode(chunk));
```

`Array.fromAsync()` is especially useful when working with streamed file downloads, real-time data, or chunked responses.

## Browser support & polyfills

`Array.fromAsync()` is supported in all modern browsers (Chrome 121+, Firefox 115+, Safari 16.4+, Edge 121+) and in Node.js 22+.

### Polyfill option (simple version)

```js
async function arrayFromAsync(source, mapFn, thisArg) {
  const result = [];
  let i = 0;
  mapFn = typeof mapFn === 'function' ? mapFn : x => x;

  for await (const item of source) {
    result.push(await mapFn.call(thisArg, item, i++));
  }
  return result;
}
```

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** This polyfill covers most common use cases but may not match the ECMAScript spec exactly. For example, it doesn't handle iterator closing protocols or sparse arrays in the same way.

{::nomarkdown}
</aside>
{:/}

## Quick comparison

{::nomarkdown}
<div class="table-container">
{:/}

| Feature                      | `Array.from()` | `Array.fromAsync()`  |
| ---------------------------- | -------------- | -------------------- |
| Handles async iterables      | ❌              | ✅                   |
| Returns a Promise            | ❌              | ✅                   |
| Supports async mapping fn    | ❌              | ✅                   |
| Can replace `for await...of` | ❌              | ✅                   |

{::nomarkdown}
</div>
{:/}

## Dive in

`Array.fromAsync()` is a fantastic addition to JavaScript that front-end engineers can start using to simplify working with asynchronous iterables. It's elegant, native, and designed with modern async patterns in mind.

Next time you're fetching data, processing a stream, or working with async generators, reach for `Array.fromAsync()` and write cleaner, more expressive code.

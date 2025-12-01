---
layout: post
title: "How to group arrays in JavaScript without reduce()"
description: "Ditch the reduce() boilerplate! Learn how to use Object.groupBy() and Map.groupBy() in JavaScript to group data with cleaner, more expressive code."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 3776
---

Front-end developers frequently transform arrays: filtering, mapping, reducing. And sometimes grouping. Grouping used to require custom `reduce()` logic, which often felt like more boilerplate than it was worth.

But that's changing. JavaScript now has native support for grouping data with `Object.groupBy()` and `Map.groupBy()`. These static methods make grouping expressive, concise, and far more readable, **without the need** for external libraries or complex `reduce()` patterns.

## What are `Object.groupBy()` and `Map.groupBy()`?

Both of these methods were introduced in ES2024 and allow you to group elements of an array by a key generated from a callback function.

### `Object.groupBy(array, callback)`

This method returns a plain JavaScript object. The keys are strings **derived from your callback**, and the values are arrays of elements that match each key.

### `Map.groupBy(array, callback)`

This method returns a `Map`, which allows for **non-string keys** and maintains **insertion order**.

## Quick examples

### `Object.groupBy()`

```js
const items = ['apple', 'banana', 'orange', 'blueberry'];

const grouped = Object.groupBy(items, item => item[0]);

console.log(grouped);
// {
//   a: ['apple'],
//   b: ['banana', 'blueberry'],
//   o: ['orange']
// }
```

The callback returns the first letter of each fruit, grouping them accordingly.

### `Map.groupBy()`

```js
const items = [1.1, 2.3, 2.4, 3.5];

const grouped = Map.groupBy(items, Math.floor);

console.log(grouped);
// Map {
//   1 => [1.1],
//   2 => [2.3, 2.4],
//   3 => [3.5]
// }
```

Because `Map.groupBy()` can use non-string keys (like numbers or objects), it's more flexible in certain scenarios.

## Replacing `reduce()` with `groupBy()`

Before `groupBy()`, grouping required using `reduce()` manually:

```js
const grouped = items.reduce((acc, item) => {
  const key = item[0];
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(item);
  return acc;
}, {});
```

Now, with `Object.groupBy()`:

```js
const grouped = Object.groupBy(items, item => item[0]);
```

The `groupBy()` method reduces noise in your code. You write **what** you want to do, not **how** to do it. The result is more expressive and easier to reason about.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

This kind of workaround is similar to using `.reverse().find()` before `findLast()` became available. If you're still doing that, [here's why you should consider switching]({% post_url 2025-09-22-stop-using-reverse-find-meet-findlast %}).

{::nomarkdown}
</aside>
{:/}

## When should you use `Object.groupBy()` vs. `Map.groupBy()`?

Use `Object.groupBy()`:

- You only need **string keys**
- You want a **JSON-serializable** result
- You're working with plain objects

Use `Map.groupBy()`:

- You need **non-string keys** (numbers, objects)
- You care about **insertion order** of keys
- You need to use `.keys()`, `.values()`, `.entries()`

## Everyday use: organizing by status

Let's say you have a list of tasks, and you want to group them by status:

```js
const tasks = [
  { id: 1, title: 'Design', status: 'todo' },
  { id: 2, title: 'Develop', status: 'in-progress' },
  { id: 3, title: 'Test', status: 'todo' },
  { id: 4, title: 'Deploy', status: 'done' },
];

const grouped = Object.groupBy(tasks, task => task.status);

console.log(grouped);
// {
//   todo: [{...}, {...}],
//   in-progress: [{...}],
//   done: [{...}]
// }
```

Simple and readable.

## More practical use cases

### Group by computed range

```js
const products = [
  { name: 'Basic', price: 10 },
  { name: 'Pro', price: 50 },
  { name: 'Enterprise', price: 200 },
];

const grouped = Object.groupBy(products, product => {
  if (product.price < 20) return 'budget';
  if (product.price < 100) return 'mid-range';
  return 'premium';
});

console.log(grouped);
// {
//   budget: [...],
//   'mid-range': [...],
//   premium: [...]
// }
```

### Grouping logs by severity

```js
const logs = [
  { message: 'Login', severity: 'info' },
  { message: 'Crash', severity: 'error' },
  { message: 'Timeout', severity: 'warning' },
  { message: 'Load', severity: 'info' },
];

const grouped = Object.groupBy(logs, log => log.severity);
```

This pattern is super common in dashboards, dev tools, and analytics.

## Gotchas to watch out for

### `Object.groupBy()` always stringifies keys

That means:

```js
const result = Object.groupBy([1, '1'], x => x);
console.log(result); // { '1': [1, '1'] }
```

Both `1` and `'1'` end up under the string key `"1"`.

If you want distinct non-string keys, use `Map.groupBy()` instead.

### `Map.groupBy()` isn't JSON-serializable

If you try:

```js
JSON.stringify(Map.groupBy([1, 2, 3], x => x % 2));
// TypeError: Converting circular structure to JSON
```

Maps are great for runtime logic, but not suitable for API responses or `localStorage`. Use `Object.groupBy()` when working with JSON.

## Browser support

`groupBy()` is supported in all modern browsers (Chrome 117+, Firefox 119+, Safari 17.4+, Edge 117+) and in Node.js 21+.

Here's a basic `Object.groupBy()` polyfill for older environments:

```js
function groupByPolyfill(array, callback) {
  return array.reduce((acc, item) => {
    const key = callback(item);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});
}
```

This polyfill won't cover every edge case, but works well for most typical use cases.

## The next move is yours

`Object.groupBy()` and `Map.groupBy()` are elegant additions to JavaScript's standard library. They replace verbose `reduce()` patterns and make your data transformations more expressive and declarative.

Here's a quick comparison of when to use each:

{::nomarkdown}
<div class="table-container">
{:/}

| Use case                           | `Object.groupBy()` | `Map.groupBy()` |
| ---------------------------------- | ------------------ | --------------- |
| String keys only                   | ✅                 | ✅               |
| Non-string keys (numbers, objects) | ❌                 | ✅               |
| JSON serialization                 | ✅                 | ❌               |
| Preserving insertion order         | ❌                 | ✅               |
| Iteration with `.entries()`        | ❌                 | ✅               |
| Simplicity and readability         | ✅                 | ✅               |

{::nomarkdown}
</div>
{:/}

If you're still reaching for `reduce()`, give these a try. You might not look back.
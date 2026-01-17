---
layout: post
title: "Stop using .reverse().find(): meet findLast()"
description: Learn how Array.prototype.findLast() and findLastIndex() let you search JavaScript arrays from the end—no .reverse() required. Cleaner, safer, and perfect for UI logic.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, React]
comments: true
views:
  ga4: 4192
---

If you've ever needed to search an array from the end, you've probably reached for a combination of `.slice().reverse().find(...)`, or looped backward manually. It works, but it's not an elegant solution.

We now have a better way: `Array.prototype.findLast()` and `Array.prototype.findLastIndex()`. These features let you search arrays from the end **without reversing them**, which gives you cleaner and more intuitive code.

## The problem with reversing arrays

Working with lists in front-end apps (e.g., chat messages, activity logs, form history, etc.) often involves finding the **last matching item**. Prior to ES2023, you'd typically do something like:

```js
const lastError = [...logs].reverse().find(log => log.type === 'error');
```

- Reverses a cloned array, which is inefficient
- Risky if you forget to clone (`.slice()`)
- Less readable and more error-prone

Now, you can write:

```js
const lastError = logs.findLast(log => log.type === 'error');
```

- No copying or reversing
- Cleaner and clearer
- Safer and more performant, especially with large datasets

## `findLast(predicate)`

This method works just like `.find()`, but starts at the end of the array and moves backward. It takes a **predicate**, a function that returns `true` or `false`, for each item.

```js
const messages = [
  { id: 1, text: 'Hello', read: true },
  { id: 2, text: 'Hi', read: false },
  { id: 3, text: 'Hey', read: true },
];

const lastUnread = messages.findLast(msg => !msg.read);

console.log(lastUnread);
// { id: 2, text: 'Hi', read: false }
```

Like `.find()`, the predicate receives three arguments: `(element, index, array)`:

```js
array.findLast((element, index, array) => {
  // Use these if needed
});
```

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** `findLast()` skips empty slots (a.k.a. "holes") in sparse arrays, just like `.find()`:

{::nomarkdown}
</aside>
{:/}

```js
const arr = [1, , 3, , 5];
console.log(arr.findLast(x => true)); // 5
```

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** A "hole" is different from an `undefined` value. For example:

{::nomarkdown}
</aside>
{:/}

```js
const arr = [1, undefined, 3, , 5];
console.log(arr.findLast(x => x === undefined)); // This finds the actual `undefined`, not a hole
// Index 0: 1
// Index 1: undefined
// Index 2: 3
// Index 3: <hole>
// Index 4: 5
```

## `findLastIndex(predicate)`

If you need the index instead of the item, use `findLastIndex()`:

```js
const lastUnreadIndex = messages.findLastIndex(msg => !msg.read);

console.log(lastUnreadIndex); // 1
console.log(messages[lastUnreadIndex]); // { id: 2, text: 'Hi', read: false }
```

## Solving real problems

There are a number of practical scenarios and use cases that come up frequently in UI work where `findLast()` and `findLastIndex()` stand out.

### Find the last login event

```js
const events = [
  { type: 'login', user: 'A' },
  { type: 'logout', user: 'A' },
  { type: 'login', user: 'B' },
];

const lastLogin = events.findLast(e => e.type === 'login');
```

### Find the last unread message in a chat app

```js
const messages = [
  { id: 1, read: true },
  { id: 2, read: true },
  { id: 3, read: false },
];

const lastUnread = messages.findLast(msg => !msg.read);
```

### Find the last failed validation in a `<form>`

```js
const fields = [
  { name: 'email', valid: true },
  { name: 'password', valid: false },
  { name: 'username', valid: false },
];

const lastInvalid = fields.findLast(f => !f.valid);
```

### Find the last manual save in a document editor

```js
const versions = [
  { id: 1, type: 'auto-save' },
  { id: 2, type: 'manual-save' },
  { id: 3, type: 'auto-save' },
];

const lastManualSave = versions.findLast(v => v.type === 'manual-save');
```

## Perfect for React UIs

Let's say you're managing user actions in a React component:

```js
const actions = [
  { type: 'click', target: 'button' },
  { type: 'scroll' },
  { type: 'click', target: 'link' },
];

// Find the last click on a button
const lastButtonClick = actions.findLast(
  action => action.type === 'click' && action.target === 'button'
);
```

Instead of juggling reversed arrays or writing awkward loops, your logic stays focused on the intent.

## Common pitfalls & best practices

- `reverse()` **mutates** the original array:

  ```js
  const arr = [1, 2, 3];
  arr.reverse();
  console.log(arr); // [3, 2, 1] — original is changed!
  ```

  That's why `findLast()` and `findLastIndex()` are safer alternatives.

- Empty arrays return `undefined`, just like `.find()`:

  ```js
  [].findLast(() => true); // undefined
  ```

- These methods return **only the first match from the end**, not all matches.
- They **skip holes** in sparse arrays, but not values that are explicitly `undefined`.
- They **only work on real arrays**, not array-like objects like `arguments`, `NodeList`, or strings. 

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">✅ Array indexing made easier?</div>

Looking for cleaner ways to index arrays? Learn how the [`.at()` method]({% post_url 2025-05-19-how-javascript-at-method-makes-array-indexing-easier %}) in JavaScript simplifies array access. No more `length - 1` gymnastics!

{::nomarkdown}
</aside>
{:/}

- You can convert those real arrays with `Array.from()` or spread syntax:

  ```js
  const lastItem = [...nodeList].findLast(...);
  ```

- They work on **subclassed arrays** too:

  ```js
  class MyArray extends Array {}

  const arr = new MyArray(1, 2, 3, 4);
  const lastEven = arr.findLast(x => x % 2 === 0); // 4
  ```

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">💡 Level up</div>

Want to know why mutating array methods like `reverse()` can lead to bugs? Learn about [safer, non-mutating alternatives]({% post_url 2025-09-08-finally-safe-array-methods-in-javascript %}).

{::nomarkdown}
</aside>
{:/}

## Browser support

- ✅ Chrome 97+, Safari 16.4+, Edge 97+, Firefox 104+
- ✅ Node.js 18.12+

If you're supporting older environments, use a polyfill or transpile with [core-js](https://www.npmjs.com/package/core-js){:target="_blank"}{:rel="noopener noreferrer"}.

## Let's recap

`findLast()` and `findLastIndex()` are small additions, but they solve a long-standing gap in the language. They eliminate the need for patterns like `slice().reverse()`, lead to more readable and intent-driven code, and offer a safer, more performant approach for working with large datasets.

Try them out, see what you think!
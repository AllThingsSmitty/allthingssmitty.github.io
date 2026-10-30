---
layout: post
title: "Finally, safe array methods in JavaScript"
description: "toSorted(), toReversed(), and toSpliced() give you sort, reverse, and splice without mutating the original array. Handy in React."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, React]
comments: true
views:
  ga4: 7190
---

Many developers pause before using `.sort()`, `.reverse()`, or `.splice()` for a good reason: they *mutate* the original array. That one side effect causes subtle, hard-to-trace bugs, especially with shared or reactive state. The good news is that we now have non-mutating versions:

- `toSorted()`
- `toReversed()`
- `toSpliced()`

They return *copies* instead of changing the original array, which matters a lot if you work in React and rely on **immutability** for state.

## The problem with in-place array methods

In JavaScript, traditional methods like `.sort()`, `.reverse()`, and `.splice()` mutate the array they're called on:

```js
const numbers = [3, 1, 2];
numbers.sort(); // Mutates the array 😬
console.log(numbers); // [1, 2, 3]
```

In frameworks like React, this can lead to unexpected behavior when updating state, because mutating arrays directly doesn't trigger re-renders.

## Comparing old vs. new

{::nomarkdown}
<div class="table-container">
{:/}

| Operation | Mutating method | Non-mutating alternative |
| --------- | ---------------- | ------------------------- |
| Sort      | `arr.sort()`     | `arr.toSorted()`          |
| Reverse   | `arr.reverse()`  | `arr.toReversed()`        |
| Splice    | `arr.splice()`   | `arr.toSpliced()`         |

{::nomarkdown}
</div>
{:/}

These new methods behave similarly to their mutating counterparts, but return a **new array** instead of modifying the original.

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** These are [**shallow copies**](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy){:target="_blank"}{:rel="noopener noreferrer"}, so if your array contains objects, the objects themselves are still the same references.

{::nomarkdown}
</aside>
{:/}

## The solution: safe, non-mutating methods

ES2023 introduced *non-mutating* versions of these familiar array methods:

### `toSorted()`

Creates a **sorted copy** of the array without changing the original.

```js
const numbers = [3, 1, 2];
const sorted = numbers.toSorted();

console.log(sorted);  // [1, 2, 3]
console.log(numbers); // [3, 1, 2] ✅

// ‼️ Contrast: .sort() mutates the array
numbers.sort();
console.log(numbers); // [1, 2, 3] ❌
```

You can also pass a custom compare function, just like `.sort()`:

```js
const users = [
  { name: 'Kristen', age: 36 },
  { name: 'David', age: 34 },
];

const byAge = users.toSorted((a, b) => a.age - b.age);

console.log(byAge); // [ { name: 'David', age: 34 }, { name: 'Kristen', age: 36 } ]
console.log(users); // [ { name: 'Kristen', age: 36 }, { name: 'David', age: 34 } ] ✅
```

### `toReversed()`

Returns a **reversed copy** of the array:

```js
const names = ['Kristen', 'David', 'Ben'];
const reversed = names.toReversed();

console.log(reversed); // ['Ben', 'David', 'Kristen']
console.log(names);    // ['Kristen', 'David', 'Ben'] ✅

// ‼️ Contrast: .reverse() mutates the array
names.reverse();
console.log(names);    // ['Ben', 'David', 'Kristen'] ❌
```

Handy when you want to display a list in reverse *without* touching the source array.

### `toSpliced()`

A safer alternative to `.splice()`. It returns a new array with elements added/removed, but **doesn't touch the original**:

```js
const items = ['a', 'b', 'c', 'd'];

// Remove 1 item at index 1
const withoutB = items.toSpliced(1, 1);

console.log(withoutB); // ['a', 'c', 'd']
console.log(items);    // ['a', 'b', 'c', 'd'] ✅

// Add new element at index 2
const withX = items.toSpliced(2, 0, 'x');
console.log(withX); // ['a', 'b', 'x', 'c', 'd']

// ‼️ Contrast: .splice() mutates the array
const items2 = ['a', 'b', 'c', 'd'];
const removed = items2.splice(1, 1);
console.log(removed);  // ['b']
console.log(items2);   // ['a', 'c', 'd'] ❌
```

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

**Reminder:** `.splice()` returns the removed items, while `.toSpliced()` returns the updated array.

{::nomarkdown}
</aside>
{:/}

## Why this matters in React

In React, immutability is key for triggering component updates and preserving state predictability.

```js
// ❌ Mutating state directly (bad)
state.items.sort(); // No re-render

// ✅ Using toSorted (good)
const sortedItems = state.items.toSorted();
setState({ items: sortedItems }); // Triggers re-render
```

These new methods help ensure you're treating arrays as immutable, without needing [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone){:target="_blank"}{:rel="noopener noreferrer"} or deep-copy workarounds.

### Real-world example: sorting tasks in React

Here's how you might use `toSorted()` or `toReversed()` in a component to safely display dynamic lists:

```jsx
function TaskList({ tasks }) {
  // Show most recent tasks first
  const recentFirst = tasks?.toReversed() ?? [];

  return (
    <ul>
      {recentFirst.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
```

This avoids mutating `tasks`, which could cause bugs if it's a prop or derived from state.
The optional chaining (`?.`) and nullish coalescing (`??`) operators also help avoid errors if `tasks` is undefined.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">🙋🏻‍♂️ There's more!</div>

I've also written about [optional chaining]({% post_url 2025-06-02-write-more-reliable-javascript-with-optional-chaining %}) and [nullish coalescing]({% post_url 2025-04-10-mastering-default-values-in-javascript-with-the-nullish-coalescing-operator %}), which pair well with these.

{::nomarkdown}
</aside>
{:/}

## Using them today

These methods don't need a new mental model. They're the same methods you already use, minus the mutation. If you're in a modern environment, or have a build step like Babel or SWC, you can use them today.

## Browser support
`toSorted()`, `toReversed()`, and `toSpliced()` are supported in all modern environments (Chrome/Edge 110+, Safari 16+, Firefox 115+, Node.js 20+). For legacy environments, you can use a polyfill like [core-js](https://www.npmjs.com/package/core-js){:target="_blank"}{:rel="noopener noreferrer"}.

## At a glance

{::nomarkdown}
<div class="table-container">
{:/}

| Method          | What it does                                | Mutates original? |
| --------------- | ------------------------------------------- | ----------------- |
| `.toSorted()`   | Returns a sorted copy                       | ❌                 |
| `.toReversed()` | Returns a reversed copy                     | ❌                 |
| `.toSpliced()`  | Returns modified copy (add/remove elements) | ❌                 |

{::nomarkdown}
</div>
{:/}

These are not flashy next to something like [top-level `await`]({% post_url 2025-06-16-using-await-at-the-top-level-in-es-modules %}), but they remove a whole class of mutation bugs. Once you start using them, you'll never look at `.sort()` with the same trust again.
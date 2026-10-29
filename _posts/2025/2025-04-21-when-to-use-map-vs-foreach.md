---
layout: post
title: "When to use map() vs. forEach()"
description: "map() and forEach() look alike but do different jobs. Here's how I decide which one to use."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 3406
---

I saw [this post](https://www.reddit.com/r/Frontend/comments/1jt2nmh/just_failed_an_interview_because_i_could_not/){:target="_blank"}{:rel="noopener noreferrer"} on Reddit about a JavaScript coding assessment and it got me thinking about `map()` and `forEach()`. They look similar, but they do different jobs. Here's how I think about it, and why I usually go with `map()` when I'm transforming data.

## What's `map()`?

The `map()` method creates a new array that's populated with the results of calling a provided function on every element in the calling array. In other words, `map()` transforms an array into a new one:

```js
let numbers = [1, 2, 3, 4];

const squaredNumbers = numbers.map(num => num * num);
console.log(squaredNumbers); // [1, 4, 9, 16]
```

## What's `forEach()`?

The `forEach()` method executes a provided function once for each array element. It returns `undefined` instead of a new array like `map()` does. This makes `forEach()` useful for operations that involve side effects, like logging or updating external variables:

```js
let numbers = [1, 2, 3, 4];

numbers.forEach(num => console.log(num)); 
// Output: 1 2 3 4
```

## When to use `map()` instead of `forEach()`

### Creating a new array

```js
let products = [
  { name: "Apple", price: 1 },
  { name: "Banana", price: 2 }
];
const productNames = products.map(product => product.name);
console.log(productNames); // ["Apple", "Banana"]
```

### Avoiding side effects

If you're working with data that you want to transform, `map()` is the one to use:

```js
let numbers = [1, 2, 3, 4, 5];

// Use .map() to transform the numbers and double each one
const doubledNumbers = numbers.map(num => num * 2);
console.log(doubledNumbers); // [2, 4, 6, 8, 10]

// Notice that the original numbers array isn't modified
console.log(numbers); // [1, 2, 3, 4, 5]
```

### Chaining methods

Since `map()` returns a new array, you can chain it with other array methods like `filter()`, `reduce()`, or another `map()` call to perform complex transformations:

```js
let numbers = [1, 2, 3, 4, 5];

const result = numbers
  .map(num => num * 2) // [2, 4, 6, 8, 10]
  .filter(num => num > 5) // [6, 8, 10]
  .reduce((acc, num) => acc + num, 0); // Add up the remaining numbers, starting from 0

console.log(result); // 24
```

`map()` also fits functional-style code, since it doesn't mutate the original array.

One thing to watch for: if you're not using the return value, don't use `map()`. `forEach()` is the right call there.

## When to use `forEach()`

Use `forEach()` when you're performing side effects, like updating a variable, making API calls, or modifying external state.

```js
let numbers = [1, 2, 3, 4];
let sum = 0;

numbers.forEach(num => {
  sum += num;
});

console.log(sum); // 10
```

So: `map()` when I want a new array, especially if I'm chaining or want to leave the original alone. `forEach()` when I'm after side effects and don't need anything back.

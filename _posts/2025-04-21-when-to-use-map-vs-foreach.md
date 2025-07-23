---
layout: post
title: "When to use map() vs. forEach()"
description: Learn the key differences between 'map()' and 'forEach()' methods in JavaScript, when to use each, and why map() is often the better choice for transforming data and writing cleaner, more functional code. 
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 2758
---

I saw [this post](https://www.reddit.com/r/Frontend/comments/1jt2nmh/just_failed_an_interview_because_i_could_not/){:rel="external"} on Reddit about a JavaScript coding assessment and it got me thinking. A common task developers perform is iterating over arrays. And two of the most frequently used methods for this are `map()` and `forEach()`. Both seem similar, but the differences can significantly affect how your code behaves. Let's take a closer look at both and why I think `map()` wins out as the better choice when transforming data.

## What's `map()`?

The `map()` method creates a new array that's populated with the results of calling a provided function on every element in the calling array. Simply put, `map()` allows you to transform the data in an array and return a new array with the transformed values:

```js
let numbers = [1, 2, 3, 4];

const squaredNumbers = numbers.map(num => num * num);
console.log(squaredNumbers); // [1, 4, 9, 16]
```

## What's `forEach()`?

The `forEach()` method executes a provided function once for each array element. But `forEach()` doesn't return a new array like `map()` does; it returns `undefined`. This makes `forEach()` useful for operations that involve side effects, like logging or updating external variables:

```js
let numbers = [1, 2, 3, 4];

numbers.forEach(num => console.log(num)); 
// Output: 1 2 3 4
```

## When to use `map()` instead of `forEach()`

As with all things, deciding when to use `map()` instead of `forEach()` depends on what you're trying to do.

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

If you're working with data that you want to transform, `map()` is your go-to choice:

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

The `map()` method fits nicely into functional programming practices because it doesn't mutate the original array. It promotes immutability and works well with pure functions.

One common pitfall: avoid using `map()` if you're not using its return value. In those cases, `forEach()` is the more appropriate and semantically correct choice.

## When to use `.forEach()`

Use `forEach()` when you're performing side effects, like updating a variable, making API calls, or modifying external state.

```js
let numbers = [1, 2, 3, 4];
let sum = 0;

numbers.forEach(num => {
  sum += num;
});

console.log(sum); // 10
```

Both `map()` and `forEach()` are essential tools in your JavaScript toolbox. Use `map()` when you're transforming data and returning new arrays, especially when method chaining or preserving immutability is important. Go with `forEach()` when you're working with side effects and don't need a return value.

In short, use the right tool for the job. Your code (and team) will thank you.
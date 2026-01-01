---
layout: post
title: The power of the spread and rest syntax in JavaScript
description: Learn how the spread and rest syntax in JavaScript can power up the front-end, from array handling to React state updates, with tips every developer should know.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, React]
comments: true
views:
  ga4: 5703
---

It's a fair bet that most web developers regularly encounter the three dots (`...`) in their code. Sometimes it magically copies arrays, sometimes it gathers up function arguments, and sometimes it shows up in object literals like it's casting a spell.

Say hello to the **spread syntax** and **rest parameter**, two simple but powerful features that have helped me make JavaScript cleaner, more expressive, and less error-prone.

## What's the difference between the two?

Spread and rest might share the same `...` syntax, but they behave differently depending on where they're used.

{::nomarkdown}
<div class="table-container">
{:/}

| Syntax | Name   | Purpose                           | Example                 |
| ------ | ------ | --------------------------------- | ----------------------- |
| `...`  | Spread | Expands elements from an iterable | `const copy = [...arr]` |
| `...`  | Rest   | Gathers multiple elements         | `function(...args) {}`  |

{::nomarkdown}
</div>
{:/}

## Spread syntax: expanding things out

Spread is used to **unpack** values from arrays, objects, or other iterable structures. For instance:

### Cloning arrays (shallow copy)

```js
const numbers = [1, 2, 3];
const copy = [...numbers];
```

Now you have a *shallow* copy of `numbers`, not a reference, which is perfect for avoiding side effects.

### Combining arrays

```js
const more = [4, 5];
const all = [...numbers, ...more]; // [1, 2, 3, 4, 5]
```

No need for `.concat()` anymore!

### Spreading into function arguments

```js
const coords = [10, 20];
function move(x, y) {
  console.log(`Moving to (${x}, ${y})`);
}

move(...coords); // Same as move(10, 20)
```

Spread syntax works beautifully with arrays and DOM methods like `querySelectorAll`.

### Copying & updating objects (React devs, take note!)

```js
const user = { name: "Sam", age: 30 };
const updatedUser = { ...user, age: 31 };
```

This creates a new object where `age` is overridden, which is great for **immutable updates** in frameworks like React.

<aside class="message highlight" role="note">
Object spread (<code>{...obj}</code>) was introduced in ES2018 and works <strong>only on plain objects</strong>. Unlike arrays or strings, not all objects are iterable or safely spreadable.
</aside>

### Strings are iterable, too!

```js
const chars = [..."hello"]; // ['h', 'e', 'l', 'l', 'o']
```

## Rest parameters: gathering things up

Rest **collects** multiple values into an array or object. It's especially useful in function signatures and destructuring.

### In function parameters

```js
function logAll(...messages) {
  messages.forEach(msg => console.log(msg));
}

logAll("Hello", "World", "Again");
// logs each message
```

This replaces the old `arguments` object and is far more flexible.

### Array destructuring with rest

```js
const [first, ...others] = [1, 2, 3, 4];
console.log(first);  // 1
console.log(others); // [2, 3, 4]
```

### Object destructuring with rest

```js
const { id, ...info } = { id: 1, name: "Sam", age: 30 };
console.log(id);   // 1
console.log(info); // { name: "Sam", age: 30 }
```

<aside class="message highlight" role="note">
Rest in object destructuring collects <strong>remaining enumerable own properties</strong> only, not inherited ones.
</aside>

## Code meets reality

### React: updating state immutably

```js
setUser(prev => ({ ...prev, age: prev.age + 1 }));
```

Spread makes it easy to update state without mutating the original object.

### Form handling: merging fields

```js
const handleChange = (e) => {
  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
};
```

This pattern is everywhere in React forms.

### Utility functions

```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

Rest parameters let you accept any number of arguments. That's a perfect use for utilities like this.

## Watch out for these common pitfalls

### Shallow copies only

Spread copies only the top level of arrays and objects. Nested structures remain references.

```js
const nested = { a: { b: 2 } };
const copy = { ...nested };
copy.a.b = 99;
console.log(nested.a.b); // 99 - still linked!
```

### Order matters in object spread

```js
const user = { name: "Sam" };
const updated = { ...user, name: "Alex" }; // name is "Alex"
```

Properties on the right **override** those on the left. Always place updates last.

## Putting it all together

Spread and rest syntax may look small, but they unlock huge expressive power in JavaScript. From simplifying function arguments to immutably updating state, they help developers write cleaner, more predictable code.

You'll see `...` everywhere: in React, in utility libraries, and in vanilla JS. Understanding how and *where* to use it is a must for any JavaScript developer today.

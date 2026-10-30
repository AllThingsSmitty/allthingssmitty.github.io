---
layout: post
title: "Default parameters: your code just got smarter"
description: "Default parameters replace the old name = name || 'Guest' pattern, and they behave a little differently. Here's what to know."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, React]
comments: true
views:
  ga4: 1442
---

Optional function arguments come up constantly, whether it's UI components, API calls, or utility functions. The old way was an `if` statement or a logical OR to set a default, and that can lead to subtle bugs.

How often have you written code like this?

```js
function greet(name) {
  name = name || 'Guest';
  console.log(`Hello, ${name}`);
}
```

This old shortcut is easy to write, but it comes with a catch: it treats *any falsy value* as missing, including valid ones like `0` or an empty string, leading to unexpected behavior.

It's also a bit dated. **Default parameters** handle this better.

## What are default parameters?

Default parameters let you assign default values **directly in your function signature**. If a value isn't provided or is explicitly `undefined`, the default is used automatically.

```js
function greet(name = 'Guest') {
  console.log(`Hello, ${name}`);
}
```

Now you can do:

```js
greet();          // Hello, Guest
greet('Kristen'); // Hello, Kristen
```

No need for manual checks or fallback logic inside the function body.

## Beware: only `undefined` triggers the default

Default values apply **only** when a parameter is `undefined`, either because it was omitted or explicitly passed as `undefined`. Other falsy values like `null`, `0`, or `false` **don't** trigger the default.

```js
function showCount(count = 10) {
  console.log(count);
}

showCount();          // 10
showCount(undefined); // 10
showCount(null);      // null (default not used)
showCount(0);         // 0
```

If you want to treat values like `null` or `0` as missing, use the [nullish coalescing operator (`??`)]({% post_url 2025-04-10-mastering-default-values-in-javascript-with-the-nullish-coalescing-operator %}):

```js
function showCount(count) {
  count = count ?? 10;
  console.log(count);
}
```

This ensures that only `null` or `undefined` will trigger the fallback, leaving valid values like `0` untouched.

## Where you can use this IRL

### Setting API options

```js
function fetchUser(id, options = { cache: true, retries: 3 }) {
  // logic...
}
```

The function still works if the caller doesn't pass an options object.

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** Default parameter values are evaluated at call time. So a **new object** is created for `options` every time `fetchUser` is called without one. This means you're safe from shared state issues unless you move the object outside the function and reuse or mutate it:

{::nomarkdown}
</aside>
{:/}

```js
const defaultOptions = { cache: true, retries: 3 };

function fetchUser(id, options = defaultOptions) {
  // ‼️ defaultOptions could be mutated and shared
}
```

### Making utility functions flexible

```js
function multiply(a, b = 1) {
  return a * b;
}
```

This lets callers omit the second argument when they want to multiply by one, or just return `a` unchanged.

### React event handlers or utility wrappers

```js
const handleClick = (event = {}) => {
  const { target = null } = event;
  const id = event?.target?.id ?? 'default-id';
  console.log(`Clicked on element with id: ${id}`);
};
```

This pattern is especially helpful when event handlers are triggered in tests or wrapped in higher-order logic. Optional chaining (`?.`) combined with default parameters makes the code safer and more readable.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">🙈 Code confession</div>

Writing all those `&&` checks? Same...until I started using [optional chaining]({% post_url 2025-06-02-write-more-reliable-javascript-with-optional-chaining %}). Cleaner code, fewer bugs.

{::nomarkdown}
</aside>
{:/}

## Bonus: default parameters + destructuring 

Combining the two handles optional config objects nicely:

```js
function createUser({ name = 'Anonymous', age = 24 } = {}) {
  console.log(`${name} is ${age} years old.`);
}

createUser(); // Anonymous is 24 years old.
```

Without defaults, you'd write a pile of repetitive checks inside the function body. It's handy for libraries, form inputs, and component props.

## Extra tip: order matters

Default parameters are **positional**, meaning you can't skip a parameter unless you pass `undefined` explicitly:

```js
function log(a = 'A', b = 'B') {
  console.log(a, b);
}

log(undefined, 'Custom'); // A Custom
log(, 'Custom');          // ❌ SyntaxError
```

If you want to skip a defaulted argument, pass `undefined` to trigger the fallback.

## What to remember

Default parameters are a small syntax upgrade, and I'd take them over the old `||` fallback. Just remember that only `undefined` triggers them.

### One last thing: about the `arguments` object

Default parameters don't count toward the `arguments` object unless explicitly passed. So:

```js
function demo(a = 1) {
  console.log(arguments.length); // 0 if no argument passed
  console.log(arguments[0]);     // undefined, even though a === 1
}
```

Keep in mind that `arguments.length` reflects the number of arguments **actually passed**, not including defaults, and `arguments[i]` may be `undefined` even if the parameter has a default value applied.

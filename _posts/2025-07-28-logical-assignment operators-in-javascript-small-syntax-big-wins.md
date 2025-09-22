---
layout: post
title: "Logical assignment operators in JavaScript: small syntax, big wins"
description: "Logical assignment operators streamline conditional assignments in JavaScript, making your code cleaner, safer, and easier to read."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, React]
comments: true
views:
  ga4: 7284
---

In day-to-day JavaScript, we often write code that checks a variable before assigning it a new value. These checks can get repetitive, especially when working with component props, global configs, or state objects. That's where **logical assignment operators** come in, a compact ES2021 feature that simplifies common conditional assignments without changing the underlying logic.

## What are logical assignment operators?

Logical assignment operators combine a **logical operator** (`||`, `&&`, or `??`) with **assignment** (`=`) to create a shorthand form. These operators also **short-circuit** like regular logical expressions, meaning the right-hand side is only evaluated if the left-hand side fails the logical test (i.e., is falsy, truthy, or nullish).

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** Optional chaining (`?.`) isn't allowed on the left-hand side of a logical assignment. It throws a syntax error:

{::nomarkdown}
</aside>
{:/}

```js
// ❌ SyntaxError:
user?.settings ||= {};
```

Optional chaining returns the result of a property access, **not a reference** to the property itself. Since assignment targets must be references (i.e., a variable or object property), this isn't valid JavaScript.

### Logical OR assignment (`||=`)

Assign if **falsy**:

```js
user.theme ||= 'light';
```

Equivalent to:

```js
if (!user.theme) {
  user.theme = 'light';
}
```

This is useful for setting a default if a value hasn't been initialized. But it **overwrites values** like `0`, `''`, or `false`, which might be intentionally set.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

For another way to handle defaults --- this time with function parameters --- check out my post on [default parameters in JavaScript]({% post_url 2025-06-29-default-parameters-your-code-just-got-smarter %}).

{::nomarkdown}
</aside>
{:/}

### Logical AND assignment (`&&=`)

Assign if **truthy**:

```js
user.isLoggedIn &&= checkPermissions(user);
```

Equivalent to:

```js
if (user.isLoggedIn) {
  user.isLoggedIn = checkPermissions(user);
}
```

This is helpful for conditionally updating a value based on an existing truthy value.

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** With `&&=`, the right-hand side is only evaluated if the left-hand side is truthy, and its **actual result** is assigned, even if that result is falsy.

{::nomarkdown}
</aside>
{:/}

```js
let isEnabled = true;
isEnabled &&= false;
console.log(isEnabled); // false
```

The original value (`true`) acts as a gate, but it's the result of `checkPermissions` (or any right-hand expression) that becomes the new value. `&&=` doesn't preserve the old value, it replaces it.

### Nullish coalescing assignment (`??=`)

Assign if **nullish** (`null` or `undefined`):

```js
settings.timeout ??= 3000;
```

Equivalent to:

```js
if (settings.timeout === null || settings.timeout === undefined) {
  settings.timeout = 3000;
}
```

Use this when you want to assign defaults **only if the value is truly missing**, not just falsy. Unlike `||=`, it preserves valid values like `0`, `false`, and `''`.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">💡 Dig deeper</div>

If you want to learn more about the nullish coalescing operator, I wrote about [mastering default values]({% post_url 2025-04-10-mastering-default-values-in-javascript-with-the-nullish-coalescing-operator %}) that will definitely up your game.

{::nomarkdown}
</aside>
{:/}

## Why logical assignment matters in your code

These operators aren't just syntactic sugar. They solve real-world problems more safely and readably, especially when dealing with mutable state:

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

These operators mutate the original object or variable directly. This can be useful in stateful logic but might cause bugs in **immutable workflows** (e.g., Redux). Clone your objects first if you need to preserve state history.

{::nomarkdown}
</aside>
{:/}

### Defaulting component props

```js
props.showHelpText ??= true;
```

### Avoiding overwrites in global state or config

```js
config.apiBase ||= '/api/v1';
```

### Preventing accidental `null`/`undefined` assignments

```js
formData.username &&= formData.username.trim();
```

## But keep in mind

- `||=` assigns when the **left-hand side is falsy**, which includes `0`, `''`, and `false`, values you might want to keep.

  ```js
  let count = 0;
  count ||= 10; // overwrites count with 10, be careful!
  ```

- Use `??=` when you want to guard specifically against `null` or `undefined`, and preserve valid falsy values.
- **Right-hand expressions** are only evaluated if needed, preserving performance and avoiding side effects.

  ```js
  config.apiKey ||= fetchApiKey(); // fetchApiKey() only runs if apiKey is falsy
  ```

### Example with a side effect

```js
let calls = 0;
let obj = { val: 0 };

obj.val ||= ++calls;
console.log(obj.val); // 1, because 0 is falsy

obj.val ||= ++calls;
console.log(obj.val); // still 1, second increment never runs
```

Since `obj.val` is initially `0` (falsy), `++calls` is evaluated and assigned. On the second line, `obj.val` is now `1` (truthy), so `++calls` is skipped. The value of `calls` remains `1`.

## Browser support

Logical assignment operators are supported in all modern environments:

- ✅ Chrome 85+, Firefox 79+, Safari 14+, Edge 85+
- ✅ Node.js 15+
- ❌ Not supported in Internet Explorer

If you're targeting older environments, use a transpiler like [`@babel/preset-env`](https://babeljs.io/docs/babel-preset-env){:target="_blank"}{:rel="noopener noreferrer"} with ES2021 settings.

## Now you're ready!

Logical assignment operators are a small but powerful addition to JavaScript. They clarify your **semantic intent**, reduce boilerplate, and simplify common conditional logic. They're especially helpful in front-end workflows like:

- Prop and state management
- API defaults
- Form sanitization

If you're already comfortable using `||`, `&&`, and `??`, you're ready for `||=`, `&&=`, and `??=`. It's just muscle memory from here.

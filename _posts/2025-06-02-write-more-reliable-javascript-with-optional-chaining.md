---
layout: post
title: "Write more reliable JavaScript with optional chaining"
description: Avoid runtime errors and write cleaner JavaScript with optional chaining, a powerful way for safely accessing deeply nested properties.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, React]
comments: true
views:
  ga4: 3567
---

Let me know if this sounds familiar: you're deep into debugging or trying to access a deeply nested property in a JavaScript object. Suddenly you see this classic error:

```
TypeError: Cannot read property 'x' of undefined
```

This is a common pain point, especially when working with API responses, optional fields, or dynamic data structures.

Fortunately, JavaScript has a powerful feature to help with this: optional chaining (`?.`). Optional chaining has saved me from more than a few headaches, and I'm willing to bet it'll do the same for you.

## The problem with deep property access

Let's start with this snippet of code:

```js
if (user && user.profile && user.profile.avatar) {
  console.log(user.profile.avatar);
}
```

This pattern might look familiar. We're checking each level of the object to avoid accessing a property of `undefined` or `null`. It's not only verbose, but it's also easy to make mistakes with this approach, especially in large codebases where object structures can change frequently.

## Hello, optional chaining

Optional chaining (`?.`) provides a cleaner and safer way to access nested properties:

```js
console.log(user?.profile?.avatar);
```

If `user` or `profile` is `null` or `undefined`, JavaScript short-circuits the evaluation and returns `undefined` without throwing an error. Optional chaining keeps your code brief and easier to follow.

## Real-world use cases

Here are a few examples that help demonstrate why optional chaining is so powerful:

### Accessing API response data

```js
const name = response?.data?.user?.name;
```

No need to worry if one of the intermediate objects isn't present, you won't get a runtime error.

### Safely accessing DOM elements

```js
const value = document.querySelector("#myInput")?.value;
```

If the element doesn't exist, `value` will just be `undefined`.

### Optional method calls

```js
user?.sendMessage?.("Hello!");
```

This ensures that `user` exists *and* that `sendMessage` is a function before attempting to call it. Otherwise, it simply returns `undefined`.

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** `fn?.()` only short-circuits if `fn` is `null` or `undefined`. If `fn` is defined but not a function (e.g., a `string` or `object`), it will still throw a `TypeError`.

{::nomarkdown}
</aside>
{:/}

### In frameworks (React, Redux, etc.)

Optional chaining is especially helpful in component-based libraries like React:

```js
const title = props?.article?.data?.attributes?.title;
```

When `props` may be `undefined` during initial renders, this prevents crashes and keeps your components stable.

## Optional chaining vs. logical AND (`&&`)

Before optional chaining, a common pattern used looked like this:

```js
const avatar = user && user.profile && user.profile.avatar;
```

It works, but it's more verbose and harder to maintain. Optional chaining simplifies this:

```js
const avatar = user?.profile?.avatar;
```

It's more elegant and makes your intent clearer. Also, remember: `&&` checks for **truthiness**, while `?.` short-circuits only on `null` or `undefined`.

## Side-by-side comparison

Common patterns before and after optional chaining:

{::nomarkdown}
<div class="table-container">
{:/}

| Before                                      | After                            |
| ------------------------------------------- | -------------------------------- |
| `user && user.name`                         | `user?.name`                     |
| `user && user.getName && user.getName()`    | `user?.getName?.()` |
| `arr && arr[0]`                             | `arr?.[0]`                       |
| `fn && fn()`                                | `fn?.()`                         |
| `document && document.querySelector("#el")` | `document?.querySelector("#el")` |

{::nomarkdown}
</div>
{:/}

## Limitations and gotchas

Optional chaining is powerful, but not magic. Here are some important caveats:

- It only **short-circuits** if the value before `?.` is `null` or `undefined`. Other falsy values (`false`, `0`, `""`, etc.) still proceed to the next property.
- Optional chaining **doesn't prevent** passing `undefined` deeper into your logic. If you aren't careful, you might mask a bug.
- Overuse can hide underlying issues or suggest your data structures need clarification.

### Specific gotcha

Be careful:

```js
user?.profile.avatar
```

This only guards against `user` being `null` or `undefined`. It **still tries** to access `avatar` directly from `profile`, so if `profile` is `undefined`, this will still throw an error.

Instead use:

```js
user?.profile?.avatar
```

### Optional chaining with arrays

```js
const firstItem = myArray?.[0];
```

This prevents an error if `myArray` is `undefined`.

## Combine with nullish coalescing (`??`)

Want to provide a default value if the property is missing? Combine optional chaining with the nullish coalescing (`??`) operator:

```js
const avatar = user?.profile?.avatar ?? "default.png";
```

This returns `"default.png"` if `avatar` is `null` or `undefined`.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">💡 Ready for more?</div>

I wrote about [mastering default values with the nullish coalescing operator](https://allthingssmitty.com/2025/04/10/mastering-default-values-in-javascript-with-the-nullish-coalescing-operator/) that will definitely up your game.

{::nomarkdown}
</aside>
{:/}

## Browser support

Optional chaining is supported in all modern browsers (Chrome 80+, Firefox 74+, Safari 13.1+, Edge 80+), but not in Internet Explorer. Use a transpiler like [@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/babel-plugin-transform-optional-chaining){:rel="external"} if you need compatibility with legacy browsers.

## Try it out

Optional chaining is a game-changer for writing safer, cleaner JavaScript. It reduces boilerplate, improves readability, and helps you avoid those pesky runtime errors when accessing deeply nested properties.

By embracing optional chaining, you can focus more on what your code **should do**, not what it might crash on. Try refactoring a part of your codebase that relies on a lot of `&&` checks or manual `undefined` guards. You might be surprised at how much cleaner and more maintainable your code becomes.

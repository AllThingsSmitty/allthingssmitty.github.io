---
layout: post
title: "Sometimes three boring statements beats one clever expression"
description: "I used to pack as much JavaScript as I could into one expression. Lately I'd rather write three boring statements."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 0
---

Modern JavaScript gives us a lot of expressive tools. Sometimes a little *too* many.

Optional chaining, nullish coalescing, ternaries, spread, template literals. I like all of them and use them every day. But together, they make it really easy to cram a lot of logic into a single expression.

I used to think that was a sign of good JavaScript. I'm not so sure anymore.

## When one more `??` is too many

Take something like this:

```js
const theme =
  config?.theme ??
  user?.preferences?.theme ??
  defaults.theme;
```

I've written this plenty of times. It's short and it works.

But once these expressions start growing, they read more like puzzles than code:

```js
const theme =
  config?.theme ??
  user?.preferences?.theme ??
  getFallbackTheme() ??
  defaults.theme;
```

I can follow it, but I have to stop and parse it.

Compare that to this:

```js
let theme = config?.theme;

if (theme == null) {
  theme = user?.preferences?.theme;
}

if (theme == null) {
  theme = getFallbackTheme();
}

return theme ?? defaults.theme;
```

More lines? Sure. But it's a lot more obvious. Yes, I give up `const` and reassign a variable. I'll take that trade.

## Long expressions hide decisions

Longer expressions squeeze several decisions into one piece of syntax. The more you chain, the more you have to work out at once:

- What happens if `config` is undefined?
- Where does the fallback come from?
- Which value wins?
- What if `getFallbackTheme()` throws?

Chaining saves some vertical space, but you have to hold more in your head.

It's a practical problem, too. You can't put a breakpoint on one fallback in the middle of a `??` chain, and you can't log a single step without rewriting the expression. With separate statements, every step gets its own line to stop on or log.

The diffs are nicer, as well. Adding a fallback means adding a block, not editing one dense line.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading bookmark">Same problem, different syntax</div>

I made the same argument about method chains: [why I don't chain everything in JavaScript anymore]({% post_url 2026-04-20-why-i-dont-chain-everything-in-javascript-anymore %}).

{::nomarkdown}
</aside>
{:/}

## Plain statements are fine

A lot of us started treating plain `if` statements as something to avoid.

So we'd rather write this:

```js
return user?.isAdmin
  ? getDashboard(user)
  : getLandingPage(user);
```

than this:

```js
if (user?.isAdmin) {
  return getDashboard(user);
}

return getLandingPage(user);
```

Neither one is objectively better. The second isn't "less modern," it's often just easier to read.

A single ternary like that is fine. It's when they nest that I stop:

```js
return isLoading
  ? "Loading"
  : error
    ? "Failed to load"
    : items.length === 0
      ? "Nothing here yet"
      : `${items.length} items`;
```

The same thing with plain statements:

```js
if (isLoading) return "Loading";
if (error) return "Failed to load";
if (items.length === 0) return "Nothing here yet";

return `${items.length} items`;
```

## Clever code gets old fast

Over the past couple of years I've found myself chaining less and writing fewer nested ternaries. I don't mind adding another `if` anymore.

I care more about readability than being clever. When I'm debugging production code or reviewing a pull request, I can't remember ever wishing something had been written as one bigger expression.

My rule of thumb is simple. A chain of plain values is fine. Once there's a function call in it, or I'd want to log one of the steps, I split it up.

## More options aren't always better

I like having options in modern JavaScript: [optional chaining]({% post_url 2025-06-02-write-more-reliable-javascript-with-optional-chaining %}), [nullish coalescing]({%  post_url 2025-04-10-mastering-default-values-in-javascript-with-the-nullish-coalescing-operator%}), [logical assignment operators]({% post_url 2025-07-28-logical-assignment operators-in-javascript-small-syntax-big-wins %}). But using all of them at once isn't automatically an improvement.

Sometimes the right answer is one tidy expression. Other times it's three boring statements. Lately, those boring statements are the ones I understand fastest six months later.

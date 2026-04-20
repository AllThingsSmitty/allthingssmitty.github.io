---
layout: post
title: "Why I don't chain everything in JavaScript anymore"
description: "JavaScript chaining looks clean at first, but it can hurt readability and hide extra work. Here's when to break chains into simpler steps."
tags: [JavaScript]
comments: true
views:
  ga4: 0
---

I used to write a lot of JavaScript like this:

```js
const result = users
  .filter(user => user.active)
  .map(user => user.name)
  .sort()
  .slice(0, 5);
```

Nothing here is wrong. I wrote code like this all the time. But this is exactly the kind of thing that feels fine at first, then slowly gets harder to work with.

## Chaining is great...until it isn't

The issue isn't `.map()` or `.filter()`. It's what happens when you stack them. You stop writing steps and start writing pipelines.

Pipelines look clean, but you still have to walk through them in your head: filter → map → sort → slice.

That's fine once or twice. Do it all over a file and it starts to wear on you.

Compare that to this:

```js
const activeUsers = users.filter(user => user.active);
const names = activeUsers.map(user => user.name);

names.sort();

return names.slice(0, 5);
```

Yeah, it's more lines. But each step is just sitting there. No decoding required.

## Same problem, three ways to write it

Here's the same intent written three different ways.

**If I'm chaining:**

```js
users.filter(u => u.active).map(u => u.name)[0]
```

It looks neat. I used to reach for this a lot. But it processes everything, even though I only need one result.

**If I'm writing it in steps:**

```js
const user = users.find(u => u.active);
const name = user?.name;
```

This is usually where I land. It stops early, and if something feels off I can check each piece.

**If I want full control:**

```js
for (const u of users) {
  if (u.active) return u.name;
}
```

This is the most explicit and, honestly, sometimes the clearest when I really care about what's happening.

## Where things get a little messy

This shows up fastest when you try to debug.

Say something feels off and you want to check the filtered results. With a chain, you end up doing this:

```js
const result = users
  .filter(user => {
    console.log(user);
    return user.active;
  })
  .map(user => user.name);
```

Now your logic is mixed with debugging code. Or you give up and break the chain apart anyway.

## You can end up doing more work than you need

Chaining nudges you toward "process everything," even when that's not what you meant to do.

```js
const firstActiveUser = users
  .filter(user => user.active)
  .map(user => user.name)[0];
```

This filters the entire array, maps the result, and then grabs one item.

When what you actually wanted was:

```js
const user = users.find(user => user.active);
const name = user?.name;
```

Or:

```js
for (const user of users) {
  if (user.active) {
    return user.name;
  }
}
```

## Where this starts to hurt

This isn't just about readability. That extra work adds up with large arrays or hot paths. And long chains can be surprisingly annoying to debug in production.

I've written some pretty gnarly chains before. Coming back to them later is...humbling.

## Fluent doesn't always mean clear

There's a reason chaining is popular: it reads nicely at first.

```js
data
  .transform()
  .normalize()
  .validate()
  .save();
```

But now you're wondering what each step returns, where you'd even put a breakpoint, or whether any of it is reusable.

Breaking it into steps answers those questions right away.

### Async chains have the same problem

Chaining promises can look sleek:

```js
const data = await fetchUsers()
  .then(res => res.json())
  .then(users => users.filter(u => u.active))
  .then(users => users.map(u => u.name));
```

But now you're mixing async control flow (fetching, parsing) with data transformation in one chain.

Splitting it up is usually easier to follow:

```js
const res = await fetchUsers();
const users = await res.json();
const activeNames = users.filter(u => u.active).map(u => u.name);
```

## A rough rule I follow

{::nomarkdown}
<div class="table-container line-wrap line-break">
{:/}

| Chain length | Recommendation              | Example                                           |
| ------------ | --------------------------- | ------------------------------------------------- |
| 1 step       | Perfectly fine              | `users.map(u => u.name)`                          |
| 2 steps      | Usually fine                | `users.filter(u => u.active).map(u => u.name)`    |
| 3–4 steps    | Pause, consider breaking up | `users.filter(...).map(...).sort(...).slice(...)` |
| 5+ steps     | Definitely break into steps | Complex transformations or async chains           |

{::nomarkdown}
</div>
{:/}

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">🙋🏻‍♂️ Clean code that's secretly doing too much</div>

Interested in doing even less work with sequences of data? [Stop turning everything into arrays]({% post_url 2026-01-12-stop-turning-everything-into-arrays-and-do-less-work-instead %}).

{::nomarkdown}
</aside>
{:/}

## I'm not saying never chain

Short chains are fine. I still write them. Once I hit three or four steps, I pause.

### How I think about this now

Chaining is great when you're writing code quickly. Breaking things into steps is better when that code has to be read later.

Those aren't the same thing.

### How I usually untangle these

{::nomarkdown}
<div class="table-container line-wrap">
{:/}

| Step | What to do                         | Example                                           |
| ---- | ---------------------------------- | ------------------------------------------------- |
| 1    | Name intermediate values           | `const activeUsers = users.filter(u => u.active)` |
| 2    | Separate transformations logically | `const names = activeUsers.map(u => u.name)`      |
| 3    | Only chain what's clear            | `names.sort()`                                    |

{::nomarkdown}
</div>
{:/}

This has saved me from a lot of headaches.

JavaScript gives you a lot of tools, but you don't need to use all of them at once.
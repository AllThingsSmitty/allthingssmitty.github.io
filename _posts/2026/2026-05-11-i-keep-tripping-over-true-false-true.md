---
layout: post
title: "I keep tripping over \"true, false, true\""
description: "createUser(user, true, false) works. It's also surprisingly hard to read. Here's why I've stopped writing APIs like this in JavaScript."
tags: [JavaScript, TypeScript]
comments: true
views:
  ga4: 3212
---

Every so often I open a PR and see something like this:

```js
deployFeature(flag, true, false, true);
```

I run into it more often than I'd like.

Not because it's complicated. Just because I have no idea what I'm looking at.

So I click into the function definition, scroll a bit, lose my place, jump back, re-read the line...and only then does it click.

Tiny interruption. Still annoying every time.

## I'm not reading code anymore, I'm decoding it

Here's a simpler one:

```js
createUser(user, true, false);
```

What does that mean? Is the user an admin? Are we sending a welcome email, or skipping validation?

I don't know. And at that point I'm not really reading code anymore, **I'm decoding it.**

There's a name for this ("flag arguments," sometimes "boolean blindness"), but honestly I don't really need the term to feel the problem.

## This is where the comment sneaks in

I've definitely written this before:

```js
createUser(user, true, false); // isAdmin, sendWelcomeEmail
```

Which kind of gives the whole thing away. If the function call needs a comment to explain the arguments, the API's probably working against me.

## Why this feels fine at the time

Because when I'm writing the function, it feels perfectly reasonable:

```js
function createUser(user, isAdmin, sendWelcomeEmail) {
  // ...
}
```

No extra objects. No extra structure, just pass the values in and move on.

I've done this plenty of times without thinking twice about it. It's only later when I'm reading the call site that it starts to feel off.

The convenience usually gets paid for later by whoever has to read it. Including me two weeks from now.

## What I use now

Most of the time, **I just use an object instead**:

```js
createUser(user, {
  isAdmin: true,
  sendWelcomeEmail: false,
});
```

Now I can actually tell what's happening without jumping back to the function definition. And it scales pretty naturally:

```js
createUser(user, {
  isAdmin: true,
  sendWelcomeEmail: false,
  skipValidation: true,
});
```

Try stretching positional booleans that far without things getting awkward.

## Sometimes the boolean is hiding a different action

```js
createUser(user, true);
```

If `true` really means "create an admin user," that's probably not a flag anymore. That's a different action.

So I'll usually just make it explicit:

```js
createAdminUser(user);
createRegularUser(user);
```

Now there's not much left to interpret.

## To be fair, this isn't always bad

Sometimes this is completely fine:

```js
toggleMenu(true);
```

That's clear enough. This tends to work when:

- the meaning is obvious
- the function is small and local
- there's only one flag

But once I add a second boolean, readability usually drops pretty fast.

## TypeScript doesn't really save this

TypeScript tells me the values are booleans. That's not really the problem.

```ts
createUser(user, true, false);
```

The types are technically correct. I still have to remember what the arguments mean.

What helped more for me was switching to options objects:

```ts
createUser(user, {
  isAdmin: true,
  sendWelcomeEmail: false,
});
```

Or sometimes just replacing the boolean entirely:

```ts
createAdminUser(user);
```

Usually that's a sign the flag was hiding two different actions anyway.

## Same behavior, much easier to read

Before:

```js
fetchData(url, false, true, 3);
```

After:

```js
fetchData(url, {
  useCache: false,
  retryOnFail: true,
  retries: 3,
});
```

And I've seen real calls like this in production code:

```js
updateSettings(user, true, false, true, false);
```

At that point I'm back to counting arguments with my finger. Same behavior. A lot less mental overhead.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">📣 Worth mentioning</div>

I've noticed the [same tradeoff with method chaining]({% post_url 2026-04-20-why-i-dont-chain-everything-in-javascript-anymore %}). The code gets shorter, but not always easier to follow.

{::nomarkdown}
</aside>
{:/}

## Why this keeps costing me time

Most of the time, I'm not writing code. I'm trying to understand it. And yes, sometimes that code is mine from a few weeks ago.

And every time I run into something like:

```js
updateSettings(user, true, false, true, false);
```

I end up doing the same thing: stopping for a second and trying to remember what each argument was supposed to mean.

It's a tiny speed bump. Just one I seem to hit over and over again.
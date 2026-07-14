---
layout: post
title: "I stopped destructuring everything"
description: "I used destructuring every object in JavaScript. Here's why keeping objects intact often makes code easier to read, debug, and maintain."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, React]
comments: true
views:
  ga4: 0
---

For a few years I destructured almost everything.

Objects, props, parameters, return values. If there was an object, I destructured it. It wasn't a conscious decision anymore, it was just what modern JavaScript looked like.

I still use destructuring, but it's not an automatic go-to for me now. Mainly because I'd come back to older code and spend more time than I expected figuring out where variables came from.

I had to mentally reconstruct the original object before I could understand what was happening.

Eventually what dawned on me: I was optimizing for writing the code, not reading it. Saving keystrokes now meant spending more time understanding it later.

## I don't mind repeating myself

This pattern is everywhere:

```jsx
const { title, author, publishedAt } = post;

return (
  <Article
    title={title}
    author={author}
    publishedAt={publishedAt}
  />
);
```

There's nothing wrong with this. But now I'm more likely to write this instead:

```jsx
return (
  <Article
    title={post.title}
    author={post.author}
    publishedAt={post.publishedAt}
  />
);
```

Yes, it repeats `post`.

But when I come back to this later, I don't have to remember where `title` or `author` came from.

## Objects carry context

It's more noticeable in larger functions.

```js
const {
  id,
  status,
  owner,
  createdAt,
  updatedAt,
} = project;
```

A hundred lines later:

```js
const { id, status, owner, createdAt, updatedAt } = project;

// ...many lines...

saveAuditLog(owner);

// ...many more lines...

if (status === "archived") {
  ...
}
```

I pause for a second. Archived...what?

Compare that to:

```js
if (project.status === "archived") {
  archive(project);
}

logger.info(project.status);
```

The object is still carrying useful context.

A few extra characters rarely slows me down. Having to remember what a variable belongs to does.

## I don't unpack everything anymore

I used to think nested destructuring was elegant. Now it often feels like I'm trying to understand the entire shape of an object before I've even started solving the problem.
 
```js
const {
  user: {
    profile: { name, email },
  },
} = data;
```

I'd rather write:

```js
const profile = data.user.profile;

const { name, email } = profile;
```

That mirrors the way I think about the data. First I care about the profile. Then, if I need to, I'll destructure it.

## I destructure later, not sooner

Parameter destructuring is another place where my habits have changed.

For small components, it gets a ton of mileage:

```jsx
function UserCard({ user }) {
  ...
}
```

But as components grow, I'm more likely to write:

```jsx
function UserCard(props) {
  if (!props.user) {
    return null;
  }

  const { user } = props;

  ...
}
```

I like keeping the original object around until I actually need something from it.

It also makes it easier to see what the component received.

## Every variable has a cost

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

**Every local variable asks the reader to remember another name.** Sometimes that's worth it and sometimes it isn't.

{::nomarkdown}
</aside>
{:/}

If a new variable represents an idea that's meaningful on its own, I'll happily introduce it.

A name like `billingAddress` becomes part of the function's vocabulary.

But if all I'm doing is turning `project.status` into `status`, I'm not convinced I've made the code easier to read.

That's become a useful rule of thumb for me: **If destructuring gives the code a better vocabulary, I do it.**

If it only saves a few characters, I usually don't.

## When I do destructure

None of this is an argument against destructuring. I still use it all the time.

```js
const { currentTarget } = event;

const { data } = response;
```

These are local, focused, and they remove noise.

And there are exceptions. If I'm mapping over an array, I'll write something like this:

```js
posts.map(({ id, title }) => (
  <Post key={id} title={title} />
));
```

The object only exists for a few lines, so I don't feel like I'm losing much context.

Sometimes I'll even rename a destructured property:

```js
const { status: projectStatus } = project;
```

That definitely keeps more context than just `status`.

But if I'm going to carry the object's name into the variable anyway, I often find `project.status` reads more naturally. I don't have to invent another name, and the relationship stays obvious wherever it's used.

The difference is that I no longer destructure simply because an object exists.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">💡 Does this seem familiar?</div>

This reminds me a lot about [why I stopped chaining everything in JavaScript]({% post_url 2026-04-20-why-i-dont-chain-everything-in-javascript-anymore %}). Different feature, same lesson.

{::nomarkdown}
</aside>
{:/}

## The question I ask now

I still like destructuring. There are plenty of places where it makes code noticeably cleaner. I just don't automatically reach for it anymore.

Before I remove the object, I ask myself: does removing the object actually make this easier to understand, or does it just make it shorter?
---
layout: post
title: "You probably don't need to lift state"
description: "A quick React tip: don't lift state by default. Keep it close to where it's used unless you actually need to share it."
image: img/posts/sunset-home-office-min.jpg
tags: [React]
comments: true
views:
  ga4: 561
---

This comes up a lot, and it's easy to get wrong. It's really easy to default to "lift state up" in React. I'm guilty. But that's not always the right move.

## Quick rule of thumb

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

Keep state as close as possible to where it's actually used.

{::nomarkdown}
</aside>
{:/}

Lift it when:

- Multiple components need it
- You need to coordinate behavior between components

### Too much

```jsx
function App() {
  const [open, setOpen] = useState(false);
  return <Modal open={open} setOpen={setOpen} />;
}
```

### Just enough

```jsx
function Modal() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(true)}>Open</button>;
}
```
(when it doesn't need to be controlled externally)


{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">📌 Same instinct, different problem</div>

The same instinct shows up elsewhere too, like [restructuring everything into arrays]({% post_url 2026-01-12-stop-turning-everything-into-arrays-and-do-less-work-instead %}) when you don't actually need to.

{::nomarkdown}
</aside>
{:/}

## Why this helps (most of the time)

- Less prop drilling
- Way easier to follow what's going on
- Fewer accidental re-renders

## If you remember one thing

If only one component cares, keep the state there.
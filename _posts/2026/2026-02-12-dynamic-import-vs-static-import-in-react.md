---
layout: post
title: "Dynamic import() vs. static import in React"
description: "Static vs. dynamic imports in React: Learn how React.lazy, import(), and Suspense affect performance, SSR, and code splitting in Vite, Next.js, and more."
image: img/posts/sunset-home-office-min.jpg
tags: [React, TypeScript]
comments: true
views:
  ga4: 0
---

If you've built React apps for a while, you've probably reached a point where you think:
**“Should I load this thing up front, or just pull it in when I actually need it?”**

That question is basically the heart of the static `import` vs. dynamic `import()` discussion.

Static imports are the bread and butter of most codebases. Dynamic imports give you more control when performance, hydration cost, or bundle size start to matter. Let's walk through what each one does, how they behave in React, and when you'd realistically reach for one over the other.

## Static `import`: the default

```js
import { formatDate } from './utils/date.js';
```

Static imports are:

- **Eager & hoisted**: They're resolved before the rest of the module runs.
- **Resolved at build / load time**: The module must be known up front.
- **Tree-shakable**: Ideal for removing unused code during builds.
- **Top-level only**: You can't drop them inside functions or components.

### When static imports work best

- The code is **critical for the first render**
- You want full **TypeScript autocomplete** and validation
- The module is **small** and not worth splitting
- You're pulling in **hooks, context, or providers** used immediately

Most of your app should live here. If you're unsure, static imports are usually the right default.

## Dynamic `import()`: lazy & conditional loading

```js
async function loadFormatter() {
  const { formatDate } = await import('./utils/date.js');
}
```

Dynamic imports load code **on demand**, which means:

- They're **async** and return a Promise
- You can load modules **based on props, state, or user actions**
- Bundlers automatically create **separate chunks**
- ⚠️ **Tree-shaking and preloading can become less predictable**, especially with variable paths

In React, we usually pair dynamic imports with `React.lazy()`:

```js
const Chart = React.lazy(() => import('./components/Chart'));
```

And render them inside a `Suspense` boundary:

```jsx
<Suspense fallback={<Spinner />}>
  <Chart />
</Suspense>
```

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

**Heads up:** `React.lazy()` requires a **default export** and must always be rendered inside a `Suspense` boundary.

{::nomarkdown}
</aside>
{:/}

## Real-world React use cases

Everything below is about improving **initial load time**, **first paint**, or **client-side hydration cost**.

### Heavy components (modals, charts, maps, editors)

```jsx
const Modal = React.lazy(() => import('./Modal'));

{showModal && (
  <Suspense fallback={<div>Loading...</div>}>
    <Modal />
  </Suspense>
)}
```

This is ideal for UI that's:

- Rarely opened
- Visually heavy
- Dependent on large third-party libraries

If it's not visible on first paint, it probably doesn't need to be there yet.

### Route-based splitting (React Router)

```js
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
```

```jsx
<Route
  path="/admin"
  element={
    <Suspense fallback={<Spinner />}>
      <AdminPage />
    </Suspense>
  }
/>
```

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">✅ Tip</div>

React Router v6.4+ includes a `lazy()` API for route modules, which gives you tighter control over data loading and code splitting together.

{::nomarkdown}
</aside>
{:/}

### Load logic based on props or user input

```js
async function loadLocale(locale) {
  const messages = await import(`./i18n/${locale}.js`);
  return messages.default;
}
```

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** Unconstrained dynamic paths limit bundler optimizations and can cause SSR issues.
In SSR setups (including Vite), a static map of known imports is usually safer than interpolated paths.

{::nomarkdown}
</aside>
{:/}

## Static vs. dynamic in React (quick comparison)

{::nomarkdown}
<div class="table-container">
{:/}

| Feature              | Static `import`        | Dynamic `import()` / `React.lazy`       |
| -------------------- | ---------------------- | --------------------------------------- |
| Timing               | Build / module load    | Runtime                                 |
| Tree-shaking         | ✅ Reliable             | ⚠️ Depends on usage                     |
| Code splitting       | Manual or router-level | Built-in with `React.lazy`              |
| Where you can use it | Top-level only         | Anywhere (functions, effects, handlers) |
| TypeScript support   | Strong                 | Requires some manual typing             |
| Suspense             | Not used               | Required                                |
| Best for             | Core logic, hooks      | Heavy or optional UI                    |

{::nomarkdown}
</div>
{:/}

## React-specific gotchas

### `React.lazy()` requires a default export

```js
// Works
const Modal = React.lazy(() => import('./Modal'));

// Breaks
const { Modal } = React.lazy(() => import('./Modal'));
```

If you need a named export, wrap it:

```js
const LazyModal = React.lazy(() =>
  import('./Modal').then((module) => ({
    default: module.Modal,
  }))
);
```

### `Suspense` isn't optional

Rendering a lazy component without `Suspense` will throw at runtime.

```jsx
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### TypeScript + dynamic imports

```ts
async function loadFormatter() {
  const { formatDate }: typeof import('./utils/date') =
    await import('./utils/date');
}
```

For components:

```ts
type ChartModule = { default: React.FC };
const Chart = React.lazy(
  () => import('./Chart') as Promise<ChartModule>
);
```

This works, but it's a **type assertion**, not validation. You're telling TypeScript to trust you — use this sparingly.

## How tooling behaves (Vite, Webpack, Rollup)

- Dynamic imports create separate chunks automatically
- Static imports are tree-shaken when modules are ESM and side-effect free
- Plugins can hint preloading or prefetching
- ⚠️ Overusing dynamic imports or dynamic paths can bloat bundles or break SSR assumptions

A quick bundle analysis often reveals that fewer, intentional splits beat lots of tiny ones.

## Framework notes: Next.js and Remix

### Next.js: `dynamic()`

```js
const Chart = dynamic(() => import('./Chart'), { ssr: false });
```

This is useful when:

* The component is **client-only**
* `React.lazy()` doesn't cooperate with SSR
* You want a custom loading fallback

```js
const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => <Spinner />,
});
```

> In the App Router world, this mostly applies to **Client Components**.
> Server Components have different constraints and don't support `React.lazy()`.

## Best practices for React developers

{::nomarkdown}
<div class="table-container">
{:/}

| Use case                     | Best practice                               |
| ---------------------------- | ------------------------------------------- |
| Core rendering logic         | Stick with **static imports**               |
| Large or rarely opened UI    | Use **`React.lazy`** or dynamic `import()`  |
| Lazy-loaded components       | Always wrap them in **`<Suspense>`**        |
| Bundle size tuning           | Use **bundle analyzers** regularly          |
| Code splitting strategy      | Fewer intentional splits > many tiny chunks |
| TypeScript + dynamic imports | Prefer `typeof import()` when possible      |

{::nomarkdown}
</div>
{:/}

## TL;DR for React devs

- **Static imports** are your default for anything used on first render
- **Dynamic imports** shine when something is big, optional, or user-triggered

Optimize the first paint. Load the rest only when it earns its keep.
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

If you've built React apps for a while, you've probably reached a point where you think: "Should I load this thing up front, or just pull it in when I actually need it?" That's basically the heart of the static `import` vs. dynamic `import()` discussion.

Static imports are the bread and butter of most codebases, but dynamic imports give you more control, especially when performance and bundle size matter. Let's walk through what each one does, how they behave in React, and when you might reach for one over the other.

## Static `import`: the default

```js
import { formatDate } from './utils/date.js';
```

Static imports are:

- **Eager & hoisted**: They run before anything else in the file.
- **Synchronous**: The file must be present at load time.
- **Tree-shakable**: Great for removing unused code in builds.
- **Top-level only**: No dropping them inside a function or component.

### When static imports work best

- The code is **critical** for rendering.
- You want full **TypeScript autocomplete** and type checking.
- The module is **tiny** and won't impact your initial bundle.
- You're pulling in **hooks**, **context**, or **providers** you use right away.

Most of your app probably fits here.

## Dynamic `import()`: lazy & conditional loading

```js
async function loadFormatter() {
  const { formatDate } = await import('./utils/date.js');
}
```

Dynamic imports bring in code **on demand**, which means:

- They're **async** and return a Promise.
- They let you load modules **only when needed**, based on props, state, user actions, anything.
- They create **separate chunks** automatically.
- ⚠️ Tree-shaking can get tricky, especially if you use variable paths.

And of course, we often pair them with `React.lazy()`:

```js
const Chart = React.lazy(() => import('./components/Chart'));
```

With a `Suspense` boundary:

```jsx
<Suspense fallback={<Spinner />}>
  <Chart />
</Suspense>
```

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Heads up:** `React.lazy()` needs a **default export** and always has to live inside a `Suspense` boundary.

{::nomarkdown}
</aside>
{:/}

## Real-world React use cases

Everything below is about optimizing **initial load time** and **first paint**.

### Heavy components (modals, charts, maps, editors)

```jsx
const Modal = React.lazy(() => import('./Modal'));

{showModal && (
  <Suspense fallback={<div>Loading...</div>}>
    <Modal />
  </Suspense>
)}
```

Great for rarely opened UI or anything big and expensive.

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

React Router v6.4+ has a `lazy()` utility for route modules if you want more control over data loading.

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

⚠️ **Note:** Dynamic paths can limit bundler optimizations and sometimes break SSR (e.g., in Vite). A static map of known imports is safer when SSR is in the mix.

{::nomarkdown}
</aside>
{:/}

## Static vs. dynamic in React (quick comparison)

{::nomarkdown}
<div class="table-container">
{:/}

| Feature              | Static `import`        | Dynamic `import()` / `React.lazy`       |
| -------------------- | ---------------------- | --------------------------------------- |
| Timing               | At module load         | At runtime                              |
| Tree-shaking         | ✅ Reliable             | ⚠️ Depends on usage                     |
| Code splitting       | Manual or router-level | Built-in with `React.lazy`              |
| Where you can use it | Top-level only         | Anywhere (functions, handlers, effects) |
| TypeScript support   | Strong                 | Needs light manual typing               |
| Suspense             | Not used               | Required                                |
| Best for             | Core logic, hooks      | Heavy/optional UI                       |

{::nomarkdown}
</div>
{:/}

## React-specific gotchas

### Default exports only for `React.lazy()`

```js
// Works
const Modal = React.lazy(() => import('./Modal'));

// Breaks
const { Modal } = React.lazy(() => import('./Modal'));
```

If you need a named export, just wrap it:

```js
const LazyModal = React.lazy(() =>
  import('./Modal').then((module) => ({
    default: module.Modal,
  }))
);
```

### `Suspense` isn't optional

Without it, you'll get runtime errors.

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

Or for components:

```ts
type ChartModule = { default: React.FC };
const Chart = React.lazy(() => import('./Chart') as Promise<ChartModule>);
```

Just keep in mind: `as Promise<{ default: ... }>` is a type assertion. TypeScript won't validate the shape for you.

## How tooling behaves (Vite, Webpack, Rollup)

- Dynamic imports create separate chunks automatically.
- Static imports get tree-shaken as long as the module is ESM and side-effect free.
- Plugins can hint preloading/prefetching.
- ⚠️ Dynamic paths make bundlers lose track of what's needed, which can bloat bundles or cause SSR issues (very common in Vite).

## Framework notes: Next.js and Remix

**Next.js: `dynamic()`**

```js
const Chart = dynamic(() => import('./Chart'), { ssr: false });
```

Useful when:

- The component is **client-only**.
- `React.lazy()` doesn't cooperate with SSR.
- You want a custom loading fallback:

```js
const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => <Spinner />,
});
```

## Best practices for React developers

{::nomarkdown}
<div class="table-container">
{:/}

| Use case                     | Best practice                                    |
| ---------------------------- | ------------------------------------------------ |
| Core rendering logic         | Stick with **static imports**                    |
| Large or rarely opened UI    | Use **`React.lazy`** or dynamic `import()`       |
| Lazy-loaded components       | Always wrap them in **`<Suspense>`**             |
| Bundle size tuning           | Use **bundle analyzers** to find heavy modules   |
| Code splitting strategy      | Don't go wild, too many chunks can slow you down |
| TypeScript + dynamic imports | Use manual types or `typeof import()`            |

{::nomarkdown}
</div>
{:/}

## TL;DR for React devs

- **Static imports** are your go-to for anything used on the first render.
- **Dynamic imports** shine when something is big, optional, or user-triggered.

Basically: make the first paint fast, and save the rest for later.
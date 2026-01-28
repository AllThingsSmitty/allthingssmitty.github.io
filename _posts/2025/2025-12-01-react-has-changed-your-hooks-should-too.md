---
layout: post
title: "React has changed, your Hooks should too"
description: "Modern React has moved beyond overusing useEffect. Discover the Hook patterns that enable cleaner logic, fewer bugs, and scalable architecture in 2026."
tags: [React]
comments: true
views:
  ga4: 8318
---

React Hooks have been around for years, but most codebases still use them the same way: a bit of `useState`, an overworked `useEffect`, and a lot of patterns that get copy-pasted without much thought. We've all been there.

But Hooks were never meant to be a simple rewrite of lifecycle methods. They're a design system for building more expressive, modular architecture.

And with Concurrent React (React 18/19 era), the way React handles data, especially **async data**, has changed. We now have Server Components, `use()`, server actions, framework-based data loading...and even some async capabilities inside Client Components depending on your setup.

So let's walk through what modern Hook patterns look like today, where React is nudging developers, and the pitfalls the ecosystem keeps running into.

## The `useEffect` trap: doing too much, too often

`useEffect` is still the most commonly misused hook. It often becomes a dumping ground for logic that doesn't belong there, e.g., data fetching, derived values, even simple state transformations. That's usually when components start feeling "haunted": they re-run at odd times, or more often than they should.

```jsx
useEffect(() => {
  fetchData();
}, [query]); // Re-runs on every query change, even when the new value is effectively the same
```

Most of this pain comes from mixing **derived state** and **side effects**, which React treats very differently.

### Using effects the way React intended

React's rule here is surprisingly straightforward:

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

**Only use effects for actual side effects**, things that touch the outside world.

{::nomarkdown}
</aside>
{:/}

Everything else should be derived during render.

```jsx
const filteredData = useMemo(() => {
  return data.filter(item => item.includes(query));
}, [data, query]);
```

When you *do* need an effect, React's [`useEffectEvent`](https://react.dev/reference/react/useEffectEvent){:target="_blank"}{:rel="noopener noreferrer"} is your friend. It lets you access the latest props/state inside an effect *without* blowing up your dependency array.

```jsx
const handleSave = useEffectEvent(async () => {
  await saveToServer(formData);
});
```

Before reaching for `useEffect`, ask yourself:

- Is this driven by something external (network, DOM, subscriptions)?
- Or can I compute this during render?

If it's the latter, tools like `useMemo`, `useCallback`, or framework-provided primitives will make your component a lot less fragile.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">🙋🏻‍♂️ Quick note</div>

Don't treat `useEffectEvent` as a cheat code to avoid dependency arrays. It's specifically optimized for work *inside* effects.

{::nomarkdown}
</aside>
{:/}

## Custom Hooks: not just reusability, but true encapsulation

Custom Hooks aren't just about reducing duplication. They're about pulling domain logic out of components so your UI stays focused on...well, UI.

For example, instead of cluttering components with setup code like:

```jsx
useEffect(() => {
  const listener = () => setWidth(window.innerWidth);
  window.addEventListener('resize', listener);
  return () => window.removeEventListener('resize', listener);
}, []);
```

You can move that into a Hook:

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const listener = () => setWidth(window.innerWidth);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('change', listener);
  }, []);

  return width;
}
```

Much cleaner. More testable. And your components stop leaking implementation details.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">👉🏻 SSR tip</div>

Always start with a deterministic fallback value to avoid hydration mismatches.

{::nomarkdown}
</aside>
{:/}

## Subscription-based state with `useSyncExternalStore`

React 18 introduced [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore){:target="_blank"}{:rel="noopener noreferrer"}, and it quietly solves a huge class of bugs around subscriptions, tearing, and high-frequency updates.

If you've ever fought with `matchMedia`, scroll position, or third-party stores behaving inconsistently across renders, this is the API React wants you to reach for.

Use it for:

- Browser APIs (`matchMedia`, page visibility, scroll position)
- External stores (Redux, Zustand, custom subscription systems)
- Anything performance-sensitive or event-driven

```jsx
function useMediaQuery(query) {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false // SSR fallback
  );
}
```

{::nomarkdown}
<aside class="message memo" role="note">
{:/}

⚠️ **Note:** `useSyncExternalStore` gives you synchronous updates. It's not a drop-in replacement for `useState`.

{::nomarkdown}
</aside>
{:/}

## Smoother UIs with transitions & deferred values

If your app feels sluggish when users type or filter, React's concurrency tools can help. These aren't magic, but they help React prioritize urgent updates over expensive ones.

```jsx
const [searchTerm, setSearchTerm] = useState('');
const deferredSearchTerm = useDeferredValue(searchTerm);

const filtered = useMemo(() => {
  return data.filter(item => item.includes(deferredSearchTerm));
}, [data, deferredSearchTerm]);
```

Typing stays responsive, while the heavy filtering work gets pushed back.

Quick mental model:

- `startTransition(() => setState())` → defers *state updates*
- `useDeferredValue(value)` → defers *derived values*

Use them together when needed, but don't overdo it. These aren't for trivial computations.

## Testable and debuggable Hooks

Modern React DevTools make it dead simple to inspect custom Hooks. And if you structure your Hooks well, most of your logic becomes testable without rendering actual components.

- Keep domain logic separate from UI
- Test Hooks directly where possible
- Extract provider logic into its own Hook for clarity

```jsx
function useAuthProvider() {
  const [user, setUser] = useState(null);
  const login = async (credentials) => { /* ... */ };
  const logout = () => { /* ... */ };
  return { user, login, logout };
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const value = useAuthProvider();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
```

You'll thank yourself the next time you have to debug it.

## Beyond Hooks: toward data-first React apps

React is shifting toward **data-first render flows**, especially now that Server Components and action-based patterns are maturing. It's not aiming for fine-grained reactivity like Solid.js, but React is leaning heavily into async data and server-driven UI.

APIs worth knowing:

- [`use()`](https://react.dev/reference/react/use){:target="_blank"}{:rel="noopener noreferrer"} for async resources during render (mostly Server Components; limited Client Component support via server actions)
- `useEffectEvent` for stable effect callbacks
- `useActionState` for workflow-like async state
- Framework-level caching and data primitives
- Better concurrent rendering tooling and DevTools

The direction is clear: React wants us to rely less on "Swiss Army knife" `useEffect` usage and more on clean render-driven data flows.

Designing your Hooks around derived state and server/client boundaries makes your app naturally future-proof.

## Hooks as architecture, not syntax

Hooks aren't just a nicer API than classes, they're an architecture pattern.

- Keep derived state in render
- Use effects only for actual side effects
- Compose logic through small, focused Hooks
- Let concurrency tools smooth out async flows
- Think across both client *and* server boundaries

React is evolving. Our Hooks should evolve with it.

And if you're still writing Hooks the same way you did in 2020, that's fine. Most of us are. But React 18+ gives us a much better toolbox, and getting comfortable with these patterns pays off quickly.
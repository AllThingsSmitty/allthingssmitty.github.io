---
layout: post
title: "Proxy and Reflect: building dynamic APIs and metaprogramming constructs in JavaScript"
description: ... 
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, TypeScript]
comments: true
views:
  ga4: 0
---

Since ES2015, JavaScript has included one of its most powerful features: **metaprogramming**. The `Proxy` and `Reflect` APIs allow developers to intercept and redefine fundamental object behaviors, from property access to function invocation.

Together, these tools make it possible to build **dynamic APIs**, **self-aware objects**, and even **domain-specific languages**, techniques more commonly seen in languages like Ruby or Lisp. This isn't about syntactic sugar; it's about giving your objects *runtime intelligence*.

## What are Proxy and Reflect?

- **`Proxy`** lets you create a wrapper around an object to intercept low-level operations like `get`, `set`, `has`, `deleteProperty`, and more.
- **`Reflect`** provides methods that mirror the default behavior of those operations—so you can extend or augment them without losing native behavior.

Used together, they unlock some of the most dynamic features in the JavaScript language.

## Core concept: intercepting behavior

### Basic proxy example

```js
const user = { name: 'Alice', role: 'admin' };

const userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    console.log(`Getting property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
});

console.log(userProxy.name); // Logs: Getting property: name → Returns: Alice
```

⚠️ **Note:** Proxies don't mutate the original object, they wrap it. The original remains untouched.

## Example 1: Auto-validating object

Let's create an object that **rejects invalid values at runtime** using the `set` trap and `Reflect.set`.

```js
const config = {
  port: 3000,
  env: 'production'
};

const configProxy = new Proxy(config, {
  set(target, prop, value) {
    if (prop === 'port' && (typeof value !== 'number' || value <= 0)) {
      throw new Error('Port must be a positive number');
    }
    return Reflect.set(target, prop, value);
  }
});

configProxy.port = 8080;  // ✅ Works
configProxy.port = -1;    // ❌ Throws error
```

Your object now validates itself without needing explicit setters.

## Example 2: Dynamic API generator

Imagine building a client SDK where endpoints are defined on the fly. Proxies make this elegant:

```js
const api = new Proxy({}, {
  get(_, endpoint) {
    return (params = {}) =>
      fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      }).then(res => res.json());
  }
});

api.createUser({ name: 'Alice' });
api.getUser({ id: 42 });
```

You didn't define `createUser` or `getUser`, but they behave like real functions. That's the power of dynamically intercepted property access.

## Example 3: Command routing via DSL

Let's say you want to build a lightweight game engine command system:

```js
const commandBus = new Proxy({}, {
  get(_, action) {
    return (...args) => {
      console.log(`Dispatching ${action} with`, args);
      // Imagine sending this to a reducer or event system
    };
  }
});

commandBus.movePlayer('north');
commandBus.pickItem('sword');
```

This enables **free-form DSL-style commands** without boilerplate.

## Reflect: Why it matters

Without `Reflect`, you'd have to reimplement the default behavior of every operation inside a trap. With `Reflect`, you can delegate seamlessly:

```js
const obj = new Proxy({}, {
  get(target, prop, receiver) {
    // Custom behavior here…
    return Reflect.get(target, prop, receiver); // Default behavior
  }
});
```

✅ Always pass the `receiver` when using `Reflect.get()` to preserve correct behavior—especially important when working with class inheritance or prototype chains.

This keeps your code clean and ensures edge cases (like prototype lookups or `super` access) continue working correctly.

## When to use (and when not to)

### ✅ Great for:

Here's a concise table that combines the “Great for” and “Avoid for” sections from your blog post for easier comparison:

You can embed this table under the "When to use (and when not to)" section to improve readability and emphasize trade-offs at a glance. Let me know if you'd like a styled HTML version or Markdown-compatible version for a specific platform.

* **Public API wrappers** (e.g., GraphQL/REST clients)
* **Validation, security, or logging**
* **Fluent interfaces and DSLs**
* **Legacy APIs** where behavior is unpredictable or undocumented

### ❌ Avoid for:

- **Performance-critical code** — Proxy traps add runtime overhead
- **Business logic that requires clarity or strict typing**
- **Large TypeScript projects** where autocomplete, type inference, and tooling are essential

💡 **TypeScript caveat:** Proxies break static type inference. You can mitigate this by writing type-safe factory functions or using manual annotations—but editor support may still be limited.

## Bonus: Enforcing read-only objects

```js
function makeReadOnly(obj) {
  return new Proxy(obj, {
    set() {
      throw new Error('This object is read-only');
    },
    deleteProperty() {
      throw new Error('Cannot delete from a read-only object');
    }
  });
}

const settings = makeReadOnly({ theme: 'dark' });
settings.theme = 'light'; // ❌ Throws
```

Optional: For extra safety, consider adding traps for `defineProperty` and `setPrototypeOf`.

## Gotcha to watch for

Some operations (like serialization or property enumeration) use traps you may not expect:

```js
const proxy = new Proxy({}, {
  get(target, prop) {
    return 42;
  }
});

console.log(JSON.stringify(proxy)); // "{}"
console.log(Object.keys(proxy));    // []
```

💡 `JSON.stringify` uses internal operations like `ownKeys` and `getOwnPropertyDescriptor`. Since we haven't defined them, the proxy returns an empty object.

To control this behavior, define additional traps like:

- `ownKeys`
- `getOwnPropertyDescriptor`
- `has`
- `defineProperty`

We'll explore these in the next post.

## TL;DR

- **`Proxy`** intercepts low-level operations on objects.
- **`Reflect`** mirrors native behavior so you can extend it safely.
- Together, they enable **dynamic behaviors**, **flexible APIs**, and **powerful metaprogramming** patterns.
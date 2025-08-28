---
layout: post
title: "Using await at the top level in ES modules"
description: Modern JavaScript is evolving. Learn how top-level 'await' works, where to use it, and when to avoid it in your modules.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 4510
---

Writing asynchronous code in JavaScript used to come with a limitation: the `await` keyword could only be used inside an `async` function. That changed when ES2022 introduced **top-level `await`**, a modern ES module feature that enables new patterns for asynchronous code at the module level.

## What's top-level `await`?

Traditionally `await` was only valid inside `async` functions:

```js
// ❌ SyntaxError outside async function
const result = await fetchData();
```

Top-level `await` now makes this valid **at the top level of ES modules**:

```js
// ✅ This works in an ES module
const result = await fetchData();
```

In the past, you'd need to wrap this logic in an **async immediately invoked function expression (IIFE)** just to use `await` at the top level:

```js
(async () => {
  const result = await fetchData();
})();
```

With top-level `await`, you can say **goodbye to boilerplate** like this. Your asynchronous code can now live directly in the module's top scope, making things simpler, cleaner, and easier to read.

{::nomarkdown}
<aside class="message" role="note">
{:/}

<div class="note-heading">🚨 Important</div>

Top-level `await` only works in JavaScript **modules**, not in CommonJS (`require`) or traditional `<script>` tags without `type="module"` (those run in classic script mode). Also, `.cjs` files in Node.js **don't** support top-level `await`.

{::nomarkdown}
</aside>
{:/}

## Real-world use cases

### Fetching remote configuration at startup

```js
const config = await fetch('/config.json').then(res => res.json());
initializeApp(config);
```

No more nesting or wrapping, just straightforward async logic.

### Dynamic imports before running code

```js
const dbDriver = await import('./drivers/postgres.js');
await dbDriver.connect();
```

Top-level `await` pairs naturally with **dynamic `import()`** for conditionally loading code based on runtime factors.

⚠️ **Note:** Static `import` statements are resolved before module execution. If an imported module contains top-level `await`, the importing module will **wait for the awaited code to finish executing before it starts**.

```js
import { settings } from './config.js'; // Waits for config.js to finish evaluating
```

Use dynamic `import()` when you need to load modules *asynchronously at runtime*.

### Waiting for initialization (e.g., WebAssembly)

```js
const wasm = await WebAssembly.instantiateStreaming(fetch('lib.wasm'));
wasm.instance.exports.main();
```

In performance-critical codebases you can now `await` WASM modules without async wrappers.

⚠️ **Note:** Make sure your server serves `.wasm` files with the correct `application/wasm` MIME type, otherwise `instantiateStreaming()` will fail. In that case, fall back to:

```js
const response = await fetch('lib.wasm');
const buffer = await response.arrayBuffer();
const wasm = await WebAssembly.instantiate(buffer);
```

## Constraints and gotchas

### Module execution is paused

When a module uses top-level `await`, **any modules that import it will pause execution** until the awaited code completes:

```js
// config.js
export const settings = await fetchSettings();

// main.js
import { settings } from './config.js'; // waits for config.js to finish
```

This pauses module evaluation, not the entire application. But it can still introduce **hidden load-order dependencies** if not managed carefully.

### Cyclic dependencies can break

Top-level `await` can cause runtime errors in cyclic dependencies **if both modules depend on each other's awaited exports during evaluation**:

```
Error: Circular dependency involving module with top-level await
```

### Browser and runtime support

Top-level `await` is supported in **all modern browsers** and in **Node.js**:

- **Node.js v16+**: fully supported in `.mjs` or in `.js` files with `"type": "module"`
- **Dedicated Web Workers**: supports top-level `await` when launched as a module (`type: "module"`):

  ```js
  new Worker('worker.js', { type: 'module' });
  ```

Keep in mind that top-level `await` only works in **ES modules**:

- Files with the `.mjs` extension, or
- `.js` files when `"type": "module"` is specified in your `package.json`

Babel can't transpile top-level `await` on its own because it lacks control over module execution order. However, modern bundlers like **Vite**, **Webpack (5+)**, or **Rollup** can support it through native ES module output, dynamic imports, and code splitting.

## Best practices

Here's how to use top-level `await` responsibly:

{::nomarkdown}
<div class="table-container">
{:/}

| Use case                    | Recommendation                                 |
| --------------------------- | ---------------------------------------------- |
| Fetch remote config         | ✅ Good use case                               |
| Load feature modules        | ✅ Great with `await import()`                 |
| Computation-heavy logic     | 🚫 Move to a background thread or worker       |
| Public/shared modules       | ⚠️ Avoid using it to prevent dependency delays |
| Large apps with shared deps | ⚠️ Be careful with circular imports            |

{::nomarkdown}
</div>
{:/}

**Pro tip:** If your module is meant to be reused (like a library or shared utility), avoid top-level `await` to prevent blocking downstream consumers. Even a small delay in a shared module can cascade and slow down multiple parts of an application.

## Want to try it?

Create a `.mjs` file in Node.js or add `type="module"` to your `<script>` tag in HTML:

```html
<script type="module">
  const result = await fetch('/api/data');
  console.log(result);
</script>
```

Make sure your site is served over HTTPS (or `localhost`) for fetch and module scripts to work correctly in modern browsers.

Top-level `await` gives you cleaner, more direct async code in modules. But it comes with trade-offs around blocking and module dependencies. Use it where it simplifies logic, and avoid it in libraries or shared modules that others depend on.

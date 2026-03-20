---
layout: post
title: "Native JSON modules are finally real"
description: "JSON imports finally work natively. Learn how import ... with { type: 'json' } changes runtime behavior, caching, and makes bundlers optional."
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 841
---

For years we've been writing this:

```js
import config from "./config.json";
```

It *looked* like native JavaScript module syntax. But it wasn't.

Your bundler stepped in at build time, read the JSON file, turned it into a JavaScript module, and made it feel native. The browser itself wasn't treating JSON as a first-class module type, the tooling was.

That's finally changed.

With **import attributes**, the platform can handle JSON modules directly. No transforms, no custom loaders, no build-time sleight of hand. Just the runtime:

```js
import config from "./config.json" with { type: "json" };
```

And dynamically:

```js
const mod = await import("./config.json", {
  with: { type: "json" }
});

console.log(mod.default);
```

That `with { type: "json" }` clause is the key. It's more explicit and a little more verbose. That can feel slightly redundant at first.

## Why do we need `with { type: "json" }`?

JavaScript modules execute, but JSON doesn't. If the platform allowed this:

```js
import data from "./data.json";
```

the engine would have to guess what you meant. Execute it as JavaScript? Parse it as data? Trust the file extension? Trust the server's `Content-Type` header?

Guessing gets messy quickly, especially once security and cross-origin rules get involved.

By requiring:

```js
import data from "./data.json" with { type: "json" };
```

we're making a clear contract with the runtime:

{::nomarkdown}
<aside class="message notification" role="note">
{:/}

This file is structured data. Parse it as JSON. Don't execute it.

{::nomarkdown}
</aside>
{:/}

Removing that guesswork is what makes this behave the same way everywhere.

## What you actually get when you import JSON

When you import JSON with attributes:

```js
import config from "./config.json" with { type: "json" };
```

you get a default export containing the parsed JSON. It behaves like any other ES module:

- Parsed once
- Cached like any other module
- Added to the module graph
- Shared across every place that imports it

Given:

```json
{
  "featureFlag": true,
  "apiBase": "https://example.com"
}
```

you can write:

```js
console.log(config.featureFlag); // true
```

No `fetch()` or manual `JSON.parse()`.

In browsers, the server still needs to send `Content-Type: application/json`. Import attributes don't override headers, and JSON modules follow normal CORS rules. Just like JavaScript modules.

The difference now is simply **that the responsibility moves to the platform**.

## Bundlers vs. native JSON modules

Here's what we've historically relied on compared to what the platform now provides:

{::nomarkdown}
<div class="table-container line-wrap">
{:/}

| Behavior                 | Bundler-based JSON import            | Native JSON module                                         |
| ------------------------ | ------------------------------------ | ---------------------------------------------------------- |
| Syntax                   | `import config from "./config.json"` | `import config from "./config.json" with { type: "json" }` |
| When parsing happens     | Build time                           | Runtime                                                    |
| Requires build step      | Yes                                  | No                                                         |
| Works in raw browser ESM | No                                   | Yes                                                        |
| Module caching           | Simulated by bundler                 | Standard ESM caching                                       |
| Security model           | Tooling-dependent                    | Explicit type contract                                     |
| Inlining into bundle     | Usually                              | Not by default                                             |

{::nomarkdown}
</div>
{:/}

With bundlers, JSON is usually converted at build time and often inlined, so there's no runtime fetch.

With native JSON modules, the runtime fetches the file on first import. Normal HTTP caching applies. That shift from build-time convenience to a runtime primitive is the interesting part.

## Module caching

JSON modules follow normal ESM caching semantics. If you write:

```js
import a from "./config.json" with { type: "json" };
import b from "./config.json" with { type: "json" };

console.log(a === b); // true
```

Both imports reference the same parsed object. The module is evaluated once and cached, just like any other ES module.

That's different from calling `fetch()` multiple times, where caching is your responsibility.

In larger applications, that shared module instance matters, especially when configuration or static data should stay consistent. It's one of those moments where you remember why the module system exists in the first place.

## Do we still need bundlers for JSON?

Modern browsers, Node, Deno, and Bun all support JSON modules with import attributes now, so if you're writing native ES modules this just works:

```js
import config from "./config.json" with { type: "json" };
```

No loaders, no transforms, and no bundler required.

That doesn't make bundlers obsolete. They still provide things the platform doesn't, like:

- Inlining small JSON files into bundles
- Asset hashing
- Code splitting
- Build-time optimization pipelines

But for the act of **importing JSON as a module**, the platform has largely caught up with what tooling used to simulate.

{::nomarkdown}
<aside class="message highlight" role="note">
{:/}

<div class="note-heading">Speaking of ES modules</div>

If you're already using [top-level `await` in ES modules]({% post_url 2025-06-16-using-await-at-the-top-level-in-es-modules %}), importing JSON dynamically becomes even cleaner.

{::nomarkdown}
</aside>
{:/}

## Why this matters beyond JSON

This is bigger than configuration files.

Import attributes establish a pattern: instead of guessing what a module is based on file extensions or loader config, the importing code declares what it expects.

Today that means JSON. Tomorrow it could mean other structured module types. For example, modern browsers support CSS module scripts:

```js
import styles from "./styles.css" with { type: "css" };

document.adoptedStyleSheets = [styles];
```

The module system becomes more explicit and extensible, and a little less dependent on build-time magic.

For a long time, JSON imports felt native because our tools smoothed over the gap. Now they actually are. It doesn't look dramatic now, but changes like this tend to age well.
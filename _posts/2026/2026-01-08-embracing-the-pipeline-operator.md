---
layout: post
title: "Embracing the pipeline operator"
description: Discover how the upcoming JavaScript pipeline operator (|>) brings cleaner, more readable function chaining to your code
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ga4: 0
---

JavaScript is always evolving, and functional programming continues to shape front-end development. As a result, the language is exploring more expressive, composable syntax. One of the most anticipated upcoming features is the **pipeline operator** (`|>`), which offers a more straightforward, readable way to chain function calls.

If you've used functional libraries like **Ramda**, or languages like **Elixir** or **F#**, pipelines will feel familiar. And if not, now's a great time to get acquainted—because this operator could soon become a first-class part of JavaScript.

## What's the pipeline operator?

The pipeline operator (`|>`) lets you **chain function calls in a readable, left-to-right order**. It passes the output of one expression as input to the next, much like Unix pipes or fluent method chaining.

### Without pipelines:

```js
const result = double(square(trim(input)));
```

### With pipelines:

```js
const result = input
  |> trim
  |> square
  |> double;
```

Much easier to read—especially as the logic grows.

## Pipeline syntax at a glance

As of **September 2025**, the pipeline operator is at **Stage 2** in the [TC39 proposal process](https://github.com/tc39/proposal-pipeline-operator). This means it's under active development but not yet finalized or implemented in JavaScript engines. Two competing proposals have emerged:

### Minimal pipeline (preferred)

- Simple left-to-right syntax for **unary functions** (functions that take a single argument).
- Gaining traction due to its simplicity and clear semantics.

```js
const result = input
  |> trim
  |> square
  |> double;
```

> ⚠️ **Note:** Minimal pipeline syntax works **only with unary functions**. If your functions accept multiple arguments, you'll need to curry them or use arrow functions like `x => fn(x, arg2)`.

### Smart pipeline (with `%` placeholder)

- Supports multiple arguments and complex expressions.
- More flexible, but currently less likely to be adopted by TC39 due to increased complexity.

```js
const result = input
  |> trim(%)
  |> square(%)
  |> double(%);
```

In this syntax:

- `%` is a placeholder for the piped value.
- Useful when the piped value isn't the first argument or when you need side effects or inline expressions.

#### Smart pipeline: practical example

```js
const result = users
  |> filter(%, user => user.active)
  |> map(%, user => user.name)
  |> sort(%, (a, b) => a.localeCompare(b));
```

## Why front-end devs should care

### Improved readability

Nested function calls can be mentally taxing. Pipelines make the data flow explicit, reducing cognitive overhead and improving maintainability.

### Functional composition for UIs and state

Libraries like **React**, **Zustand**, and **Jotai** rely heavily on functional logic for managing state and props. Pipelines allow you to compose transformations more declaratively and elegantly:

```js
const finalProps = rawData
  |> sanitize
  |> normalize
  |> extractProps;
```

### Easier debugging and instrumentation

It's easy to insert logging or side effects between steps without breaking the flow:

#### Smart syntax:

```js
const result = input
  |> validate(%)
  |> (x => { console.log(x); return x; })
  |> normalize(%);
```

#### Minimal syntax:

```js
const result = input
  |> validate
  |> (x => { console.log(x); return x; })
  |> normalize;
```

## Caveats and considerations

- **Still experimental**: As of mid-2025, no version of JavaScript includes the pipeline operator. It's not available in browsers or Node.js—even behind flags.
- **Requires transpilation**: To use it today, you'll need **Babel** or a compatible bundler like **Vite** or **Bun** with the appropriate plugin.
- **Limited IDE and linter support**: Some editors and tools support the syntax; others don't. Expect tooling to improve as the proposal advances.
- **No native TypeScript support**: TypeScript doesn't yet parse the pipeline operator. You'll need to let Babel handle the JavaScript transformation and configure `allowJs` or other workarounds.

## Babel setup

To experiment with the pipeline operator today, install the Babel plugin:

```bash
npm install --save-dev @babel/plugin-proposal-pipeline-operator
```

### For minimal pipeline (recommended):

```json
{
  "plugins": [
    ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]
  ]
}
```

### For smart pipeline:

```json
{
  "plugins": [
    ["@babel/plugin-proposal-pipeline-operator", { "proposal": "smart" }]
  ]
}
```

## The future of JavaScript pipelines

As JavaScript embraces more **functional and declarative** patterns, the pipeline operator fits naturally. Whether you're transforming props, composing styles, or chaining animations, a pipeline can make your logic easier to reason about and test.

It's more than syntactic sugar — it encourages a mindset shift toward **streamlined data flow** and reduced nesting.

## Further reading

- [TC39 Pipeline Operator Proposal](https://github.com/tc39/proposal-pipeline-operator)
- Babel Plugin: [`@babel/plugin-proposal-pipeline-operator`](https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator)
- [Functional Programming with Ramda](https://ramdajs.com)
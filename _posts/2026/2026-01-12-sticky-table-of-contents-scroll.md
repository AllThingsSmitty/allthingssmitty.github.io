---
layout: post
title: "Sticky table of contents & Scroll-Spy UX Patterns: A Micro-UX Deep Dive"
description: ...
image: img/posts/sunset-home-office-min.jpg
tags: [CSS, JavaScript]
comments: true
views:
  ga4: 5206
---

**Micro-UX** is often where delight and usability meet. It's not about sweeping redesigns—it's about the little touches that improve user experience in meaningful ways. One excellent case study in micro-UX design is the **Sticky Table of Contents (ToC)** combined with a **Scroll-Spy** pattern.

Used effectively, this duo guides readers through long-form content, improves navigation, and provides a sense of place within a page. Think documentation sites, blog posts (like this one), or tutorials where readers may need to jump between sections quickly.

In this post, we'll explore:

* Why these patterns matter
* Design considerations
* How to implement them with HTML, CSS, and JavaScript
* Accessibility and performance tips

## Why use a sticky table of contents?

A Sticky Table of Contents offers persistent navigation without interrupting the reading flow. It allows users to:

* **See the structure** of your content at a glance
* **Jump between sections** without scrolling
* **Track their reading progress** through scroll-spy highlights

It's especially helpful for:

* Long blog posts
* Developer documentation
* Case studies or product feature walkthroughs

> 🧠 **Micro-UX Win:** The user always knows “where they are” on the page and “what's next.”

## ✍️ Designing a Good Sticky ToC

Before jumping into code, a few key design principles:

### ✅ Keep It Lightweight

Avoid overwhelming the user with too many links. Prioritize top-level headings or key sections.

### 🎯 Focus on Readability

The ToC should be easy to scan. Use a clear hierarchy and adequate spacing.

### 📱 Mobile Responsiveness

Sticky ToCs can be a burden on mobile. Consider collapsing them into an accordion or using a floating button.

### 🖼️ Placement Matters

- **Left sidebar** for desktop (common in documentation)
- **Right sidebar** if content is centered and there's whitespace
- **Inline** or hidden under a button on mobile

## 🧑‍💻 Implementation: Sticky ToC + Scroll-Spy

Let's walk through a simple implementation using vanilla HTML, CSS, and JavaScript. You can adapt this to frameworks like React, Vue, or Svelte easily.

### HTML Structure

```html
<aside class="toc">
  <nav>
    <ul>
      <li><a href="#intro">Introduction</a></li>
      <li><a href="#ux">Micro-UX Principles</a></li>
      <li><a href="#design">Design Considerations</a></li>
      <li><a href="#code">Implementation</a></li>
      <li><a href="#accessibility">Accessibility</a></li>
    </ul>
  </nav>
</aside>

<main>
  <section id="intro">...</section>
  <section id="ux">...</section>
  <section id="design">...</section>
  <section id="code">...</section>
  <section id="accessibility">...</section>
</main>
```

### CSS: Sticky Positioning

```css
.toc {
  position: sticky;
  top: 2rem;
  max-height: 90vh;
  overflow-y: auto;
}
```

> 💡 Sticky positioning is perfect for this—it keeps the ToC in view as you scroll, without using `position: fixed`, which detaches it from the content flow.

### JavaScript: Scroll-Spy Logic

Basic scroll-spy behavior highlights the active section as the user scrolls:

```js
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".toc a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
```

Add a style for the active state:

```css
.toc a.active {
  font-weight: bold;
  color: var(--accent-color);
}
```

---

## 🦽 Accessibility Considerations

* Use semantic markup (`<nav>`, `<ul>`, `<a>`) for screen readers.
* Ensure skip-link functionality or keyboard shortcuts to jump between sections.
* Make sure active states are visible for both sighted users and screen reader users (e.g., use `aria-current="true"`).

Example:

```html
<a href="#design" aria-current="true">Design Considerations</a>
```

---

## ⚡ Performance & UX Enhancements

* **Throttle/debounce scroll events** for performance.
* **Smooth scrolling** for a better experience:

```css
html {
  scroll-behavior: smooth;
}
```

* Optionally, use **IntersectionObserver** for a more efficient scroll-spy:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const link = document.querySelector(`.toc a[href="#${id}"]`);
    if (entry.isIntersecting) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}, {
  rootMargin: "-50% 0px -50% 0px"
});

sections.forEach(section => observer.observe(section));
```

## 🧪 In the Wild: Real-Life Examples

* **MDN Web Docs**: A textbook use of a sticky ToC on the left.
* **Notion**: Auto-generated in-page navigation with scroll-spy.
* **CSS-Tricks**: Great mobile behavior with collapsible ToC.

## ✨ Final Thoughts

Sticky ToCs with scroll-spy behavior may seem minor, but they significantly boost **usability**, **readability**, and **reader confidence**—all essential traits of well-crafted content.

As a front-end developer, these micro-UX patterns are low-hanging fruit that can elevate your site's perceived quality with just a bit of thoughtful design and a few lines of code.

---

### 📎 Resources

* [MDN: `position: sticky`](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
* [WAI: Navigation Techniques](https://www.w3.org/WAI/tutorials/page-structure/regions/#navigation)
* [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

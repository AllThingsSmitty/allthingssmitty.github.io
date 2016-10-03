---
layout: post
title: Responsive table layout
description: Data tables on the web are used to communicate important information to a user. Yet so many of these aren't mobile-optimized. Here's one easy way to do just that.
image: img/posts/sunset-home-office-min.jpg
tags: [css, responsive, tables]
comments: true
---

One of my pet peeves in web design is how tables are often not optimized for non-desktop experiences. Let's say I'm viewing Wikipedia on my iPhone, I'm looking through the episode list for _Star Trek: The Next Generation_ (I grew up in the late 80's --- deal), and the table has a lot of columns and data. There ends up being a lot of back-and-forth side scrolling, device flipping, and general annoyance as I muddle through that user experience.

It's an issue that exists broadly across the web, even though there are several [responsive table solutions](https://www.sitepoint.com/responsive-data-tables-comprehensive-list-solutions/){:rel="external"} available, including this simple, CSS-only pattern:

<div class="embed">
  <blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">A simple <a href="https://twitter.com/hashtag/responsive?src=hash">#responsive</a> table in <a href="https://twitter.com/hashtag/CSS?src=hash">#CSS</a>, in case you forgot we can do this. <a href="https://t.co/U7QOetqzOr">https://t.co/U7QOetqzOr</a> <a href="https://twitter.com/hashtag/RWD?src=hash">#RWD</a> <a href="https://twitter.com/CodePen">@CodePen</a> <a href="https://t.co/M2gkg0Gq4k">pic.twitter.com/M2gkg0Gq4k</a></p>&mdash; Matt Smith (@AllThingsSmitty) <a href="https://twitter.com/AllThingsSmitty/status/753943893834473472">July 15, 2016</a></blockquote>
  <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

So what's the roadblock for using this or another pattern? Time? Effort? How about quick run-through so we can see for ourselves?

### Where to start?

We'll create the same table above with some generic HTML:

```html
<table>
  <caption>Statement Summary</caption>
  <thead>
    <tr>
      <th scope="col">Account</th>
      <th scope="col">Due Date</th>
      <th scope="col">Amount</th>
      <th scope="col">Period</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">Visa - 3412</td>
      <td>04/01/2016</td>
      <td>$1,190</td>
      <td>03/01/2016 - 03/31/2016</td>
    </tr>
  </tbody>
</table>
```

Our table has four columns. Let's add some basic CSS to better define the table layout:

```css
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  width: 100%;
}
table tr {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}
table th,
table td {
  padding: .625em;
  text-align: center;
}
```

This might look like many other HTML tables you've worked with. And probably about now you're asking, "But how do I get this responsive?"


### Gettin' responsive!

First, we'll add a `aria-label` attribute to each data cell with a value that represents that column's name. That will be used for labeling purposes in the responsive layout. Using `aria-label` will also provide accessibility support for screen readers.

```html
  <td scope="row" aria-label="Account">Visa - 3412</td>
  <td aria-label="Due Date">04/01/2016</td>
  <td aria-label="Amount">$1,190</td>
  <td aria-label="Period">03/01/2016 - 03/31/2016</td>
```

Now we can begin writing a CSS media query:

```css
@media screen and (max-width: 600px) {
  table thead {
    display: none;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    text-align: right;
  }
  table td:before {
    content: attr(aria-label);
    float: left;
  }
}
```

In smaller viewports the `<tr>` and `<td>` elements will display as block-level and not as table rows and cells. And the `:before` pseudo-class now serves as a label.

Here's our table (flip your device screen between portrait and landscape view):

<div class="embed">
  <p data-height="500" data-theme-id="0" data-slug-hash="MyqmdM" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/MyqmdM/">Simple Responsive Table in CSS</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>


### That's it? 😳

Yep, pretty much. At least for this example. Keep in mind that this is just one responsive table layout with relatively simple data content. You may have different use cases and more complex data to manage, so YMMV. But always [consider the options](https://www.sitepoint.com/responsive-data-tables-comprehensive-list-solutions/){:rel="external"} for a better user experience.

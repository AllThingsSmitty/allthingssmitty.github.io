---
layout: page
title: Style guide
---

<div class="disqus-comment-count" data-disqus-url="/2020/05/11/css-fix-for-100vh-in-mobile-webkit/">First article</div>

## Markdown

Use Markdown syntax by default before using inline HTML elements.

Create HTML `<div>` elements by inserting `{:}` above the text block. CSS classes can be applied to the syntax: `{:.class-name}`, `{:.class-one .class-two}`

[Images](#images) can also be inserted without markdown.

###  Syntax tips 

Kramdown lets you avoid paragraph tags for images. Using Markdown like this...

```html
this is
{::nomarkdown}
<img class="test" />
{:/}
this
```

...results in this output:

```html
<p>this is</p>
<img class="test" />
<p>this</p>
```

<div class="border-rule"></div>

## Headings

There are three primary heading styles used:

# Heading 1 (h1)
## Heading 2 (h2)
### Heading 3 (h3)

<div class="border-rule"></div>

## Code

Inline code is available with the `<code>` element. Snippets of multiple lines of code are supported through Prism.js. Longer lines will automatically scroll horizontally when needed.

```javascript
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those arguments
let adder = new Function('a', 'b', 'return a + b');

// Call the function
adder(2, 6);
// > 8
```

<!--
You may also optionally show code snippets with line numbers. Add `linenos` to the Prism tags.

```javascript
{% highlight javascript linenos %}
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those arguments
let adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
<!--{% endhighlight %}
```
-->

<div class="border-rule"></div>

## Media

### Images

There are two main image sizes, medium and large.

#### Medium

{::nomarkdown}
<div class="page__image--center page__image--md">
  <img src="https://dummyimage.com/600x400/eee/999" alt="Large example image">
</div>
{:/}

#### Large

{::nomarkdown}
<div class="page__image--center page__image--lg">
  <img src="https://dummyimage.com/600x400/eee/999" alt="Large example image">
</div>
{:/}

### Tweets

Wrap the embedded tweet markup in `<div class="embed"></div>` for proper spacing. Also, use  `tw-align-center` class on the blockquote provided by Twitter:

<div class="embed">
  <blockquote class="twitter-tweet tw-align-center"><p lang="en" dir="ltr">I snuck this little <a href="https://twitter.com/hashtag/CSS?src=hash&amp;ref_src=twsrc%5Etfw">#CSS</a> gem into a project stylesheet to help the team remember <a href="https://twitter.com/hashtag/accessibility?src=hash&amp;ref_src=twsrc%5Etfw">#accessibility</a>. 😎 <a href="https://twitter.com/hashtag/WebDev?src=hash&amp;ref_src=twsrc%5Etfw">#WebDev</a> <a href="https://t.co/48kMmTaPoW">pic.twitter.com/48kMmTaPoW</a></p>&mdash; Matt Smith (@AllThingsSmitty) <a href="https://twitter.com/AllThingsSmitty/status/930617039085035520?ref_src=twsrc%5Etfw">November 15, 2017</a></blockquote>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

### CodePen

Wrap the embedded CodePen markup in `<div class="embed"></div>` for proper spacing.

<div class="embed">
  <p data-height="500" data-theme-id="0" data-slug-hash="bpmZpK" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Jurassic Ipsum Generator in JS" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/bpmZpK/">Jurassic Ipsum Generator in JS</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

<div class="border-rule"></div>

## Notes

#### Notification

{::nomarkdown}
<aside class="message notification" role="note">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis ut purus ultricies euismod. Fusce malesuada gravida pretium. Integer et velit in orci imperdiet dictum
</aside>
{:/}

#### Message

{::nomarkdown}
<aside class="message" role="note">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis ut purus ultricies euismod. Fusce malesuada gravida pretium. Integer et velit in orci imperdiet dictum
</aside>
{:/}

<div class="border-rule"></div>

### Emoji

Emoji will be depicted using the hexadecimal representation of the [Unicode character](https://unicode.org/emoji/charts/full-emoji-list.html):

```html
<span>&#x1F600;</span>
```

For accessibility purposes, emoji will be give the ARIA landmark role `img` and `aria-label` with the [CLDR short name](https://unicode.org/emoji/format.html#col-name) value. Screen readers will understand the emoji is an image and can read it's value.

```html
<span role="img" aria-label="emoji grinning face">&#x1F600;</span>
```
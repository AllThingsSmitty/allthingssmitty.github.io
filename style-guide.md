---
layout: page
title: Style guide
tags: [code, markdown, 'style guide']
---

* [Markdown tips](#markdown-tips)
  * [Helpful syntax tips](#helpful-syntax-tips)
* [Headings](#headings)
* [Code](#code)
* [Notes](#notes)
* [Embedding media](#embedding-media)
  * [Tweets](#tweets)
  * [CodePen](#codepen)
  * [Images](#images)
  * [Images with captions](#images-with-captions)
* [Emoji](#emoji)
<!-- * [Tables](#tables) -->

-----

I can't get <a href="https://codepen.io/AllThingsSmitty/pen/bpmZpK" rel="external">Jurassic Park</a> back online without Dennis Nedry. Now eventually you do plan to have _dinosaurs_ on your dinosaur tour? I thought you were one of your big brothers. There's no unauthorized breeding in Jurassic Park.

> Amphibian DNA. When you gotta go, you gotta go. I bring scientists, you bring a rockstar. Uh uh uh!...You didn't say the magic word! That is one big pile of shit.

Boy, do I **hate being right** all the time. T-Rex doesn't want to be fed. I'm gonna run you over when I come back down! Clever girl.

<!--## Inline HTML elements

- **To bold text**, use `**` around words. Always use `<strong>` over `<b>` when using straight HTML.
- _To italicize text_, use `_` around words. Always use `<em>` over `<i>`.
- Abbreviations, like <abbr title="HyperText Markup Langage">HTML</abbr> should use `<abbr>`, with an optional `title` attribute for the full phrase.
- Citations, like <cite>&mdash; Matt Smith</cite>, should use `<cite>`.
- <del>Deleted</del> text should use `<del>` and <ins>inserted</ins> text should use `<ins>`.
- Superscript <sup>text</sup> uses `<sup>` and subscript <sub>text</sub> uses `<sub>`.

-----

Most of these elements are styled by browsers with few custom modifications done here.-->

## Markdown tips

Use Markdown syntax by default before using inline HTML elements.

Create HTML `<div>` elements by inserting `{:}` above the text block. CSS classes can be applied to the syntax: `{:.class-name}`, `{:.class-one .class-two}`

Images can also be inserted without markdown. See [Images with captions](#images-with-captions) for examples on how Kramdown outputs the HTML.

###  Helpful syntax tips 

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

And you can already use `<figure>` and `<figcaption>`...

```html
<figure markdown="1">
<figcaption>
test
</figcaption>
![test](img.jpg)
</figure>
```

...which will output:

```html
<figure>
  <figcaption>
  test
  </figcaption>
  <p><img src="img.jpg" alt="test" /></p>
</figure>
```

{::nomarkdown}
<img src="/img/posts/2020-05-11-css-fix-for-100vh-in-mobile-webkit-02.png" alt="Mobile screen showing sticky footer at the bottom of the viewport above Safari's menu bar" height="auto" width="auto" class="center" />
{:/}

-----

## Headings

Hold onto your butts. What about the lysine contingency? Are these characters...auto...erotica? They show extreme intelligence, even problem-solving intelligence. Dinosaurs eat man; woman inherits the earth.

# Heading (h1)
## Heading (h2)
### Heading (h3)
#### Heading (h4)

-----

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

Don't get cheap on me, Dodgson. Ian, freeze! Dr. Wu inserted a gene that makes a single faulty enzyme in protein metabolism. 

-----

## Notes

{:.message}
How do you know they're all female? Bloody move! We spared no expense.

-----

## Embedding media

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

<!--
### Lists

I can't get Jurassic Park back online without Dennis Nedry. I really hate that man. It's a Unix system, I know this! When you gotta go, you gotta go. Boy, do I hate being right all the time. Don't get cheap on me, Dodgson. Now eventually you do plan to have dinosaurs on your dinosaur tour?

* White rabbit object: whatever it did, it did it all.
* Dennis, our lives are in your hands and you've got butterfingers?
* I'm always on the lookout for a future ex-Mrs. Malcolm. 

Dr. Wu inserted a gene that makes a single faulty enzyme in protein metabolism.

1. The only one I've got on my side is the blood-sucking lawyer.
2. Hold onto your butts.
3. I'm gonna run you over when I come back down!

Remind me to thank John for the wonderful weekend. He's gonna eat the goat?

<dl>
  <dt>HyperText Markup Language (HTML)</dt>
  <dd>The language used to describe and define the content of a Web page</dd>

  <dt>Cascading Style Sheets (CSS)</dt>
  <dd>Used to describe the appearance of Web content</dd>

  <dt>JavaScript (JS)</dt>
  <dd>The programming language used to build advanced Web sites and applications</dd>
</dl>

The only one I've got on my side is the blood-sucking lawyer. I'm gonna run you over when I come back down! He's gonna eat the goat? Must go faster! I really hate that man.
-->

### Images

Look at all the blood. I told you, how many times, we needed locking mechanisms on the vehicle doors! Don't you see the danger, John, inherent in what you're doing here?

![placeholder](http://placehold.it/800x400 "Large example image")
![placeholder](http://placehold.it/400x200 "Medium example image")
![placeholder](http://placehold.it/200x200 "Small example image")

###  Images with captions

<figure>
  <picture class="cover-image">
    <source srcset="http://placehold.it/800x400" type="image/webp">
    <source srcset="http://placehold.it/800x400" type="image/jpeg">
    <img src="http://placehold.it/800x400" alt="cover image">
  </picture>
  <figcaption>
    I told you, how many times, we needed locking mechanisms on the vehicle doors! Because we're being hunted.
  </figcaption>
</figure>

-----

### Emoji

Emoji will be depicted using the hexadecimal representation of the [Unicode character](https://unicode.org/emoji/charts/full-emoji-list.html):

```html
<span>&#x1F600;</span>
```

For accessibility purposes, emoji will be give the ARIA landmark role `img` and `aria-label` with the [CLDR short name](https://unicode.org/emoji/format.html#col-name) value. Screen readers will understand the emoji is an image and can read it's value. Additionally, the `.emoji` class will be added.

```html
<span class="emoji-md" role="img" aria-label="emoji grinning face">&#x1F600;</span>
```

<span class="emoji-md" role="img" aria-label="emoji grinning face">&#x1F600;</span>


-----
<!-- 
## Tables

You bred raptors? I told you, how many times, we needed locking mechanisms on the vehicle doors!

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Upvotes</th>
      <th>Downvotes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alan Grant</td>
      <td>10</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Ellie Satler</td>
      <td>7</td>
      <td>5</td>
    </tr>
    <tr>
      <td>Ian Macolm</td>
      <td>8</td>
      <td>4</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Totals</td>
      <td>25</td>
      <td>11</td>
    </tr>
  </tfoot>
</table> -->

I can afford more glasses! Amphibian DNA. Are these characters...auto...erotica? Amphibian DNA. Check the vending machines. It's...it's a dinosaur.

<!--
## Footnotes

Clicking this number[^fn-sample_footnote] will lead you to a footnote. The syntax looks like:

```text
Clicking this number[^fn-sample_footnote]
```

Each footnote needs the `^fn-` prefix and a unique ID to be referenced for the footnoted content. The syntax for that list looks something like this:

```text
[^fn-sample_footnote]: Handy! Now click the return link to go back.
```

You can place the footnoted content wherever you like. Markdown parsers should properly place it at the bottom of the post.
-->


<!--
[^fn-sample_footnote]: Handy! Now click the return link to go back.
-->
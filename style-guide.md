---
layout: page
title: Style guide
tags: [code, markdown, 'style guide']
---

I can't get <a href="http://codepen.io/AllThingsSmitty/pen/bpmZpK" rel="external">Jurassic Park</a> back online without Dennis Nedry. Now eventually you do plan to have *dinosaurs* on your dinosaur tour? I thought you were one of your big brothers. There's no unauthorized breeding in Jurassic Park.

> Amphibian DNA. When you gotta go, you gotta go. I bring scientists, you bring a rockstar. Uh uh uh!...You didn't say the magic word! That is one big pile of shit.

Boy, do I **hate being right** all the time. T-Rex doesn't want to be fed. I'm gonna run you over when I come back down! Clever girl.

## Inline HTML elements

HTML defines a long list of available inline tags, a complete list of which can be found on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).

- **To bold text**, use `<b>`.
- *To italicize text*, use `<i>`.
- Abbreviations, like <abbr title="HyperText Markup Langage">HTML</abbr> should use `<abbr>`, with an optional `title` attribute for the full phrase.
- Citations, like <cite>&mdash; Matt Smith</cite>, should use `<cite>`.
- <del>Deleted</del> text should use `<del>` and <ins>inserted</ins> text should use `<ins>`.
- Superscript <sup>text</sup> uses `<sup>` and subscript <sub>text</sub> uses `<sub>`.

-----

Most of these elements are styled by browsers with few custom modifications done here.

## Footnotes

Footnotes are supported as part of the Markdown syntax. Here's one in action. Clicking this number[^fn-sample_footnote] will lead you to a footnote. The syntax looks like:

```text
Clicking this number[^fn-sample_footnote]
```

Each footnote needs the `^fn-` prefix and a unique ID to be referenced for the footnoted content. The syntax for that list looks something like this:

```text
[^fn-sample_footnote]: Handy! Now click the return link to go back.
```

You can place the footnoted content wherever you like. Markdown parsers should properly place it at the bottom of the post.

## Heading

Hold onto your butts. What about the lysine contingency? Are these characters...auto...erotica? They show extreme intelligence, even problem-solving intelligence. Hold onto your butts. Dinosaurs eat man; woman inherits the earth.

### Code

Inline code is available with the `<code>` element. Snippets of multiple lines of code are supported through Prism.js. Longer lines will automatically scroll horizontally when needed.

```javascript
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those arguments
var adder = new Function('a', 'b', 'return a + b');

// Call the function
adder(2, 6);
// > 8
```

You may also optionally show code snippets with line numbers. Add `linenos` to the Prism tags.

```javascript
<!--{% highlight javascript linenos %}-->
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those arguments
var adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
<!--{% endhighlight %}-->
```

That is one big pile of shit. Don't get cheap on me, Dodgson. Ian, freeze! Because we're being hunted. Dr. Wu inserted a gene that makes a single faulty enzyme in protein metabolism. 

### Tweets

Wrap the embedded tweet markup in `<div class="embed"></div>` for proper spacing.

Also, use CSS class `tw-align-center` on the blockquote:

<div class="embed">
  <blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">A simple <a href="https://twitter.com/hashtag/responsive?src=hash">#responsive</a> table in <a href="https://twitter.com/hashtag/CSS?src=hash">#CSS</a>, in case you forgot we can do this. <a href="https://t.co/U7QOetqzOr">https://t.co/U7QOetqzOr</a> <a href="https://twitter.com/hashtag/RWD?src=hash">#RWD</a> <a href="https://twitter.com/CodePen">@CodePen</a> <a href="https://t.co/M2gkg0Gq4k">pic.twitter.com/M2gkg0Gq4k</a></p>&mdash; Matt Smith (@AllThingsSmitty) <a href="https://twitter.com/AllThingsSmitty/status/753943893834473472">July 15, 2016</a></blockquote>
  <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

### CodePen

I thought you were one of your big brothers. Well, at least you're out of the tree. Hold onto your butts.

<div class="embed">
  <p data-height="500" data-theme-id="0" data-slug-hash="bpmZpK" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Jurassic Ipsum Generator in JS" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/bpmZpK/">Jurassic Ipsum Generator in JS</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

### GitHub gists

I told you, how many times, we needed locking mechanisms on the vehicle doors! Check the vending machines. T-Rex doesn't want to be fed. 

{% gist baa63ae500c54018ae76b1c7e9e700e9 gist.md %}

We spared no expense. I'm gonna run you over when I come back down! Don't you see the danger, John, inherent in what you're doing here? Dinosaurs eat man; woman inherits the earth. Why didn't I build it in Orlando? It's...it's a dinosaur... Well, at least you're out of the tree.

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

### Images

Look at all the blood. I told you, how many times, we needed locking mechanisms on the vehicle doors! Don't you see the danger, John, inherent in what you're doing here?

![placeholder](http://placehold.it/800x400 "Large example image")
![placeholder](http://placehold.it/400x200 "Medium example image")
![placeholder](http://placehold.it/200x200 "Small example image")

### Tables

You bred raptors? I told you, how many times, we needed locking mechanisms on the vehicle doors!

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Upvotes</th>
      <th>Downvotes</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <td>Totals</td>
      <td>25</td>
      <td>11</td>
    </tr>
  </tfoot>
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
</table>

I can afford more glasses! Amphibian DNA. Are these characters...auto...erotica? Amphibian DNA. Check the vending machines. It's...it's a dinosaur...

### Emoji

<span aria-label="grinning face">&#x1F600;</span>

-----

[^fn-sample_footnote]: Handy! Now click the return link to go back.
---
layout: post
title: Math.floor, Math.random, and Jurassic Park
description: If you're new to math methods in JavaScript here are a few words about Math.floor and Math.random and a fun way to use them to build a custom text generator.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript]
comments: true
views:
  ua: 2512
  ga4: 55
---

In JavaScript, the `Math` object is something developers work with a lot. And two methods in particular, `Math.floor()` and `Math.random()`, are often utilized together. Let's take a quick look at both to see how we might use them to create a random text engine.

The [`Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random){:target="_blank"}{:rel="noopener noreferrer"} method generates a number between 0 and 1 that isn't a whole number (integer) and also isn't 1. For example, to get a number between 0 and 10, we multiply our answer by 10:

```javascript
Math.random() * 10;
```

To get generate a whole number, we apply the [`Math.floor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor){:target="_blank"}{:rel="noopener noreferrer"} method which rounds down to the nearest whole number:

```javascript
Math.floor(Math.random() * 10);
```

To get a whole number between 1 and 10, we add 1 to the answer:

```javascript
Math.floor(Math.random() * 10 + 1);
```

Now that we have a general idea about how these two methods work in producing random numbers, let's take it a step further.


## Did someone say dinosaurs?

[Lorem Ipsum](https://en.wikipedia.org/wiki/Lorem_ipsum){:target="_blank"}{:rel="noopener noreferrer"}-style generators produce randomized blocks of text with varieties ranging from [cupcakes](http://cupcakeipsum.com){:target="_blank"}{:rel="noopener noreferrer"}, to [bacon](http://baconipsum.com){:target="_blank"}{:rel="noopener noreferrer"}, even [Hodor](hodoripsum.com){:target="_blank"}{:rel="noopener noreferrer"}. So let's create one of our own based on quotes from the movie "Jurassic Park", because who doesn't like dinosaurs?

First we need to create an array of quotes that will be randomly put together:

```javascript
let quotes = [
  'You bred raptors?',
  'There\'s no unauthorized breeding in Jurassic Park.',
  'How do you know they\'re all female?',
  // add more quotes...
];
```

The more quotes we have in our array, the more random the generated text block will be. Now we'll create a function to randomly select quotes in the array:

```javascript
function generateIpsum(e) {
  let minCount = 5,
    maxCount = 13,
    ipsum = Math.floor(Math.random() * (maxCount - minCount)) + minCount,
    ret = '';
  
  for (i = 0; i < ipsum; i++) {
    let newIpsum = quotes[Math.floor(Math.random() * (quotes.length - 1))];
    ret += ' ' + newIpsum;
  }
}
```

As you can see, we're being a little more creative with the `Math` methods in looping through the array and determining the size of text block. Now we'll create a button that will execute this function:

```html
<button onclick="generateIpsum('ipsum');">Hold onto your butts</button>
<div id="ipsum"></div>
```

And lastly, we'll add the following to the end of the function to display the block of quotes:

```javascript
document.getElementById(e).innerHTML = document.getElementById(e).innerHTML + '<p>' + ret.substring(0, ret.length + 1) + '</p>';
```

<div class="embed">
  <p class="codepen" data-height="450" data-slug-hash="bpmZpK" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" data-pen-title="Jurassic Ipsum Generator in JS" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/bpmZpK/">Jurassic Ipsum Generator in JS</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

We've really only scratched the surface of `Math.floor()` and `Math.random()`. And now you can use them to generate random text, color, emoji 🦄, whatever you want. Have fun.

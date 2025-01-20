---
layout: post
title: Show my password, please
description: Allowing users to view the password they've entered helps avoid frustration and improve engagement. This is a quick JavaScript example.
image: img/posts/sunset-home-office-min.jpg
tags: [JavaScript, UX]
comments: true
views:
  ua: 14012
  ga4: 137
---

Stop me if this sounds familiar: you're logging into a site or app on your phone, carefully entering your password, you tap the sign-in button, and... "Incorrect password, please try again."

Ohhh, snap!

You didn't enter the wrong password, you simply tapped a wrong key. It's something you likely would've caught if the login control provided a feature allowing you to view the password you entered.

Here's what I mean:

<div class="embed">
  <blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">A “show password” feature on every <a href="https://twitter.com/hashtag/mobile?src=hash">#mobile</a> login? 🤔 Well, a few lines of <a href="https://twitter.com/hashtag/JavaScript?src=hash">#JavaScript</a> and YAAAS! 💃🏻 <a href="https://t.co/haSRgjkq3t">https://t.co/haSRgjkq3t</a> <a href="https://twitter.com/CodePen">@CodePen</a> <a href="https://twitter.com/hashtag/UX?src=hash">#UX</a> <a href="https://t.co/MrbG8kT9Ql">pic.twitter.com/MrbG8kT9Ql</a></p>&mdash; Matt Smith (@AllThingsSmitty) <a href="https://twitter.com/AllThingsSmitty/status/787857275859898368">October 17, 2016</a></blockquote>
  <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>


## Why do we need this?

For a number of years we've seen [mobile trends](http://www.lukew.com/ff/entry.asp?1653){:rel="external"} that suggest users are okay with the idea of [removing password masking](http://passwordmasking.com/){:rel="external"}, at least to be able to see if the input is correct. Incorrectly entering lengthy, mixed-case, alphanumeric passwords on tiny virtual keypads can become a source of user frustration. That frustration can result in abandon rates going up.

Sites like Amazon, Reddit, LinkedIn, <nobr>et al.</nobr>, have implemented some form of "show password" option (usually for just mobile users). Yet it still feels like an overlooked and optional part of user experience design. So let's fix that by building our own.


## "Unmasking" the password

In the context of a web page, the input type of the password field is changed from `type="password"` to `type="text"`. A toggle function would allow a user to remove masking to see if the password was entered correctly, as well as turn masking back on.

So, given:

```html
<input type="password" id="txtPassword" />
<button id="btnToggle">show</button>
```

We can create a basic function that changes the input type of the password field:

```javascript
let passwordInput = document.getElementById('txtPassword'),
  toggle = document.getElementById('btnToggle');

function togglePassword() {  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggle.innerHTML = 'hide';
  } else {
    passwordInput.type = 'password';
    toggle.innerHTML = 'show';
  }
}
```

Now we'll call the toggle function when the "show/hide" button is clicked:

```javascript
(function () {
  toggle.addEventListener('click', togglePassword, false);
})();
```

<div class="embed">
  <p class="codepen" data-height="450" data-theme-id="light" data-slug-hash="KgxmXv" data-default-tab="result" data-user="AllThingsSmitty" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/AllThingsSmitty/pen/KgxmXv/">Show Password</a> by Matt Smith (<a href="http://codepen.io/AllThingsSmitty">@AllThingsSmitty</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

You can refactor this further or implement a completely different solution, but you have the general idea.

From a usability perspective, this kind of feature makes total sense. Being able to view if you entered a password correctly before attempting to sign-in is a significant improvement to the user experience.

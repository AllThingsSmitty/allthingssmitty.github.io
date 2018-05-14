---
layout: post
title: A quick lesson about jQuery noConflict()
description: 
image: img/posts/sunset-home-office-min.jpg
tags: [jQuery]
comments: true
---


Here's a tip that you might not use very often but is handy to have in your back pocket. When you're dealing with a web page that's loading multiple versions of jQuery (yes, that does happen), you can target a specific version to use to run your code with the `noConflict()` method.

Here's how.

Let's say you have the following jQuery libraries loading on the page:

```html
<script src="jquery-1.5.js"></script>
<script src="jquery-1.7.2.js"></script>
<script src="jquery-1.5.2.js"></script>
<script src="jquery-1.6.js"></script>
```

<del>This was actually something I encountered recently working on a set of legacy web apps. Whatever happened in the past that got us to this wasn't my concern. All jQuery code was running against version 1.6 (the last version that is loaded) and I needed to use version 1.7.2.</del>


### noConflict() is your friend

Other JavaScript libraries use `$` variable. If you use these along side jQuery, the [`noConflict()`](https://api.jquery.com/jquery.noconflict/) method release jQuery's control of the `$` variable so those libraries can use it. But you can set a variable  


```html
<script src="/js/jquery-1.7.2.js"></script>
<script>
  let $x = jQuery.noConflict();
</script>
```

ddasdsad
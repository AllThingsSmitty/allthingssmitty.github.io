---
layout: page
title: Tags
---

[//]: # (Get the tag name for every tag on the site and set them to the site_tags variable.)
{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}

[//]: # (tag_words is a sorted array of the tag names.)
{% assign tag_words = site_tags | split:',' | sort %}

[//]: # (Build the Page)

[//]: # (List of all tags)
<section class="tags">
  <ul>
    {% for item in (0..site.tags.size) %}{% unless forloop.last %}
      {% capture this_word %}{{ tag_words[item] }}{% endcapture %}
      <li>
        <a href="#{{ this_word | cgi_escape }}" class="tag">{{ this_word }}
          <span>({{ site.tags[this_word].size }})</span>
        </a>
      </li>
    {% endunless %}{% endfor %}
  </ul>
</section>

[//]: # (Posts by tags)
<section class="tags">
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] }}{% endcapture %}
    <h3 id="{{ this_word | cgi_escape }}">{{ this_word }}</h3>
    {% for post in site.tags[this_word] %}{% if post.title != null %}
      <div class="row">
        <span>
          <a href="{{ post.url }}">{{ post.title }}</a>
        </span>
        <span class="archive-date">
          {{ post.date | date: "%b %-d, %Y" }}
        </span>
      </div>
    {% endif %}{% endfor %}
  {% endunless %}{% endfor %}
</section>
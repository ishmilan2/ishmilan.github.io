---
layout: page
title: Blog
permalink: /blog/
---

<div class="posts">

  {% assign posts_es = site.posts | where:"lang","es" %}
  {% for post in posts_es %}
    <article class="post">

      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

      <div class="entry">
        {{ post.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leer más ...</a>
    </article>
  {% endfor %}
</div>
---
layout: page_en
title: Blog
permalink: /en/blog/
---

This is where I share my thoughts on Configuration Management.

<div class="posts">

  {% assign posts_en = site.posts | where:"lang","en" %}
  {% for post in posts_en %}
    <article class="post">

      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

      <div class="entry">
        {{ post.excerpt }}
      </div>

      <div class="date">
        Escrito el {{ post.date | date: "%d/%m/%Y" }}
      </div>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leer más ...</a>
    </article>
  {% endfor %}
</div>
---
layout: page
title: Blog
permalink: /blog/
sidebar: yes
translate_en: /en/blog/
---

Aquí publicaré (en muy raras ocasiones) algunas cosillas relacionadas con la informática.

<div class="posts">

  {% assign posts_es = site.posts | where:"lang","es" %}
  {% for post in posts_es %}
    <article class="post">

      <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>

      <div class="entry">
        {{ post.excerpt }}
      </div>

      <div class="date">
        Publicado el {{ post.date | date: "%d/%m/%Y" }}
      </div>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leer más ...</a>
    </article>
  {% endfor %}
</div>

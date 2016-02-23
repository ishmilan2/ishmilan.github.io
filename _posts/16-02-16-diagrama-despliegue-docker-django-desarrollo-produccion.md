---
layout: post
title: Diagrama de Despliegue - Django con Docker
permalink: /blog/diagrama-despliegue-docker-django-desarrollo-produccion/
translate_en: /en/blog/deployment-diagram-docker-development-production/
lang: es
sidebar: yes
category: [diagrama]
tags: [django, uml, docker]
image: /images/banners/docker-og.png
excerpt: Hola Django.
---

<img src="{{ site.baseurl }}/images/banners/django-docker.png" title="Docker - Django" name="Docker - Django" />

## Diagrama de Despliegue para Desarrollo
____
<img src="{{ site.baseurl }}/images/diagrams/docker-django-development.png" title="Docker - Django" name="Docker - Django" />

## Diagrama de Despliegue para Producción
____
<img src="{{ site.baseurl }}/images/diagrams/docker-django-wsgi-production.png" title="Docker - Django" name="Docker - Django" />

### Análisis

* Se muestra la estrucutra de imágenes necesarias para establecer el servicio de la aplicación en su primera versión (**_App:1.0_**). Durante la evolución del sistema la versión debe ir incrementando.
* El 

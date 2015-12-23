---
layout: post
title: Diagrama de Despliegue - PhpMyAdmin como Servicio en Docker
permalink: /blog/diagrama-despliegue-phpmyadmin-docker/
translate_en: /en/blog/deployment-diagram-phpmyadmin-docker/
category: [diagrama]
tags: [phpmyadmin, uml, docker]
image: /images/banners/docker-og.png
excerpt: <strong><em>Diagrama de Despliegue</em></strong> estableciendo a <strong><em>PhpMyAdmin como Servicio</em></strong> dentro de la <strong><em>infraestructura</em></strong> que nos propone <strong><em>Docker</em></strong>.
---

<img src="{{ site.baseurl }}/images/banners/docker-lamp-phpmyadmin.png" title="Docker - PhpMyAdmin" name="Docker - PhpMyAdmin" />

## Diagrama de Despliegue
<img src="{{ site.baseurl }}/images/diagrams/docker-phpmyadmin.png" title="Docker - PhpMyAdmin" name="Docker - PhpMyAdmin" />

## Servicios de Docker
Cada servicio representa un **_contenedor en ejecución_**. **_PhpMyAdmin y MySQL son los servicios_** que se muestran dentro del **_Host de Docker_**. PhpMyAdmin es el único servicio que puede ser accedido desde fuera del Host de Docker. Los servicios de **_PhpMyAdmin y MySQL_** se comunican entre si utilizando un **_link_**.

## Imágenes de Docker
**_Las imágenes_** creadas para establecer los servicios se encuentran ubicadas dentro de cada uno de los servicios.

## Volumen de Docker
**_El servicio de MySQL_** utiliza un **_volumen_** para almacenar todas **_las bases de datos_**.
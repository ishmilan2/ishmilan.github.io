---
layout: post_en
title: Deployment Diagram - PhpMyAdmin as a Service in Docker.
permalink: /en/blog/deployment-diagram-phpmyadmin-docker/
translate_es: /blog/diagrama-despliegue-phpmyadmin-docker/
lang: en
sidebar: yes
category: [diagram]
tags: [phpmyadmin, uml, docker]
image: /images/banners/docker-og.png
excerpt: <strong><em>Deployment Diagram</em></strong> setting up <strong><em>PhpMyAdmin as a Service</em></strong> inside the <strong><em>Docker infrastructure</em></strong>.
---

<img src="{{ site.baseurl }}/images/banners/docker-lamp-phpmyadmin.png" title="Docker - PhpMyAdmin" name="Docker - PhpMyAdmin" />

## Deployment Diagram
<img src="{{ site.baseurl }}/images/diagrams/docker-phpmyadmin.png" title="Docker - PhpMyAdmin" name="Docker - PhpMyAdmin" />

## Docker Services
Each service represent a **_container in execution_**. **_PhpMyAdmin and MySQL are the services_** showed inside the **_Docker Host_**. PhpMyAdmin is the only service that can be accessed from outside the Docker Host. Both services, **_PhpMyAdmin and MySQL_** are communicate using a **_link_**.

## Docker Images
**_The images_** that were created to stablish the services are located inside of each one.

## Docker Volume
**_The service of MySQL_** use a **_volume_** to store all **_data bases_**.
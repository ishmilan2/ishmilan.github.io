---
layout: post_en
title: Start Django project with Docker
permalink: /en/blog/start-django-project-with-docker/
translate_es: /blog/iniciar-proyecto-en-django-con-docker/
lang: en
sidebar: yes
category: [articulo]
tags: [django, docker]
image: /images/banners/docker-og.png
excerpt: Steps to start <strong><em>Django</em></strong> projects using <strong><em>Docker</em></strong> as a part of the <strong><em>workflow</em></strong>.
---
<img src="{{ site.baseurl }}/images/banners/django-docker.png" title="Docker - Django" name="Docker - Django" />

Steps to start Django projects using Docker as a part of the workflow. We use `projectname` to refer the project name.

### Prerequisite

* Having **Docker** installed. If you ar using on Mac OS X or Windows you should install **Docker Toolbox**.

### Source Code

You can download <a href="https://github.com/mmorejon/docker-django" target="_blank">the source code using this link</a>.

### UML Diagrams

You can consult deployment diagrams related with this post in this <a href="{{ site.baseurl }}/en/blog/deployment-diagram-docker-django/">link</a>.

## Step One - Setup the Structure.

**_Download the project structure_**

The project containing the general structure is discharged.

```
git clone https://github.com/mmorejon/docker-django.git projectname
```

**_Remove Git folder_**

The folder `.git` is removed in order to create a new repository.

```
cd projectname
rm -rf .git/
```

**_Initialize new repository inside the project_**

Initialize a new version control over the folder to track all changes.

```
git init
```

## Step Two - Create Docker Image

**_Create Docker image_**

You must create the Docker image for the project. The image contain the instalation requirements established into `requirements.txt` file.

The file `requirements.txt` include basic requirements to start and deploy our Django application. If you need add new elements now is a good moment.

```
docker build -t projectname:1.0 .
```

Every time thay you modify the elements inside `requirements.txt` file you should repeat this step.

**_Docker Compose configuration_**

En el fichero `docker-compose.yml` se modifica el nombre de la imagen que será utilizada. El nombre de la imagen se ha establecido en el paso anterior. La zona que se modifica dentro del fichero es la siguiente:

```
image: projectname:1.0
```

## Step Three - Create Django Project

**_Create project_**
Se crea el proyecto utilizando los mismos comandos descritos por el sitio Django.

```
docker-compose run web django-admin startproject projectname .
```

**_Probar el sistema_**
Para probar si el sistema está funcionando correctamente se ejectua el siguiente comando. En el navegador se puede revisar la aplicación en la siguiente dirección `http://<ip-máquina:8000>`. El puerto de salida puede ser configurado en el fichero `docker-compose.yml`.

```
docker-compose up
```

**_Para el sistema_**
Se detiene el sistema de ser necesario para continuar con las configuraciones.
```
Ctrl-C
```

## Step Four - Create Application

Para crear una aplicación dentro del proyecto Django se utiliza el siguiente comando:
```
docker-compose run web python manage.py startapp app
```

## Step Five - Create User

Los usuarios se crean utilizando el mismo comando descrito en la documentación de Django.

```
docker-compose run web python manage.py createsuperuser
```

## Step Six - Production Environment

Para utilizar la aplicación en el entorno de producción se debe configurar el fichero `docker-compose.yml`. En este fichero se agrega el comando a ejecutar para que utilice la configuración del entorno de producción.

La línea que se adiciona es `command: ./run-production.sh` quedando el fichero de la siguiente forma:

```
web:
  image: projectname:1.0
  command: ./run-production.sh
  volumes:
    - .:/code
  ports:
    - "8000:80"
```

### Significant Revisions

* <a target="_blank" href="https://docs.docker.com/compose/django/">Docker Compose with Django projects</a>
* <a target="_blank" href="https://docs.djangoproject.com/es/1.9/intro/tutorial01/">First steps in Django projects</a>

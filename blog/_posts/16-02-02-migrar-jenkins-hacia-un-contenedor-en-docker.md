---
layout: post
title: Migrar Jenkins hacia un contenedor en Docker es muy sencillo.
permalink: /blog/migrar-jenkins-hacia-un-contenedor-en-docker/
translate_en: /en/blog/migrate-jenkins-to-a-docker-container/
category: [articulo]
tags: [docker, jenkins, ubuntu]
image: /images/banners/docker-jenkins-og.png
excerpt: Migrar tu actual servicio de Jenkins hacia un contenedor en Docker es bien sencillo.
---

<img src="{{ site.baseurl }}/images/banners/jenkins-docker.png" title="Migrar Jenkins hacia Docker" name="Migrar Jenkins hacia Docker" />

### Introducción
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Pre requisitos

Para realizar los pasos del artículo deberá cumplir con los siguientes requerimientos:

- Tener instalado Jenkins.

### Entorno

La configuración del entorno donde fue desarrollado el artículo es la siguiente:

```
### Sistema de integración continua ###
         SO: Ubuntu 14.04
    Jenkins: 1.645

### Dominios ###
jenkins.example.com
docker.example.com
```

## Paso Uno – Instalar Docker.

Muestra la ubicación de las páginas para instalar Docker en Ubuntu. Se toman de referencia del sitio oficial de Docker.

## Paso Dos – Iniciar el contenedor de Jenkins.

- Ejecutar la imagen oficial de Jenkins.
- Comprobar que funciona correctamente.

## Paso Tres – Crear contenedor de datos.

- Mostar el lugar donde Jenkins guarda sus datos.
- Seguiremos las buenas prácticas de crear un contenedor para los datos.

## Paso Tres – Migrar la información hacia el contendor.

- Copiar los ficheros del Jenkins actual.
- Reiniciar servicio y revisar que los datos estén correctos.

## Paso Cuatro – Utilizar Docker Compose en el proceso.

- Instalar docker compose.
- Crear fichero YAML.
- Iniciar servicio.

## Reflexiones finales
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Revisiones significativas
- Sitio oficial del Docker.
- Sitio oficial de Jenkins.
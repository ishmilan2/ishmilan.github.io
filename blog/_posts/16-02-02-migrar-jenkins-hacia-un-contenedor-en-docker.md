---
layout: post
title: Migrar Jenkins hacia un Contenedor en Docker.
permalink: /blog/migrar-jenkins-hacia-un-contenedor-en-docker/
translate_en: /en/blog/migrate-jenkins-to-a-docker-container/
category: [articulo]
tags: [docker, jenkins, ubuntu]
image: /images/banners/docker-jenkins-og.png
excerpt: Migrar tu actual servicio de Jenkins hacia un contenedor en Docker es bien sencillo.
---

<img src="{{ site.baseurl }}/images/banners/jenkins-docker.png" title="Migrar Jenkins hacia Docker" name="Migrar Jenkins hacia Docker" />

### Introducción

Jenkins es un sistema de integración continua ampliamente utilizado por los grupos de desarrollo de software. Según el sitio web <a href="https://wappalyzer.com/">Wappalyzer</a>, existen más de X servidores con instancias de Jenkins ejecutándose. Por otra parte, Docker nos brinda una nueva forma muy novedosa de estructurar nuestros servicios.

Migrar nuestro sistema Jenkins hacia la filosofía brindada por Docker puede ser un deseo o una meta de nuestro grupo de desarrollo. Sin embargo, existen preguntas a responder: 

- _¿Se perderán las configuraciones establecidas hasta el momento?_
- _¿Se perderán las estadísticas de las rutinas establecidas?_

La respuesta a ambas preguntas es no. El objetivo del presente artículo es mostrar cómo modificar la estructura del sistema Jenkins sin tener que empezar desde cero. Todas las modificaciones fueron realizadas en el mismo servidor.

**_El sistema Jenkins solo dejó de brindar servicios 5 segundos._**

### Pre requisito

Para realizar los pasos del artículo deberá cumplir con el siguiente requerimiento:

- Tener instalado Jenkins.

### Entorno

La configuración del entorno donde fue desarrollado el artículo es la siguiente:

```
### Sistema de integración continua ###
         SO: Ubuntu 14.04
    Jenkins: 1.645
    Dominio: jenkins.example.com
```

En el dominio **_jenkins.example.com_** se encuentra el sistema Jenkins brindando servicios.

## Paso Uno – Instalar Docker.

La información referente a la instalación de Docker se encuentra claramente descrita en su <a href="https://docs.docker.com/engine/installation/ubuntulinux/">Sitio Web Oficial</a>. Durante la instalación de Docker hay que tener en cuenta el sistema operativo instalado en nuestro servidor.

## Paso Dos – Iniciar el contenedor de Jenkins.

- Ejecutar la imagen oficial de Jenkins.
    + Crear carpeta para las configuraciones de jenkins llamada /home/user/docker-services/jenkins
    + Para iniciar el servicio de jenkins utilizando docker se escribe: docker run -p 8080:8085 --name jenkins jenkins
- Comprobar que funciona correctamente.
    + el sito fue puede ser accedido a través de la siguiente dirección: jenkins.example.com:8085
- Se detiene el servicio para continuar con las configuraciones. Ctrl-C

## Paso Tres – Establecer un volumen para los datos.

- Mostar el lugar donde Jenkins guarda sus datos.
- Se crea la carpeta donde serán almacenados los datos de las configuraciones.
- Se le dan los permisos de escritura a la carpeta.
- Se inicia el servicio con utilizando el volumen de datos
    + docker run -p 8080:8085 --name jenkins - v /home/user/docker-services/data:/.... jenkins
- Se detiene el servicio.
- Se puede observar que el contenido creado dentro de la carpeta son los ficheros de configuración de Jenkins.

## Paso Cuatro – Migrar la información hacia el contendor.

- Copiar los ficheros del Jenkins actual.
- Reiniciar servicio y revisar que los datos estén correctos.

## Paso Cinco – Utilizar Docker Compose en el proceso.

La información referente a la instalación de Docker Compose se encuentra claramente descrita en su <a href="">Sitio Web Oficial</a>.

- Crear fichero YAML.
    + Descripción de las secciones en el fichero yml.
    + Se inserta el fichero.
- Iniciar servicio.
- Chequear que exista el contenedor de jenkins funcionando
    + docker ps

## Paso Seis – Establecer solamente Jenkins como Servicio en Docker.

- Modificar el puerto en el fichero yml.
- Detener el servicio de Jenkins.
- Reiniciar el servicio Jenkins en Docker.

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
---
layout: post_en
title: Migrate Jenkins to a Docker Service.
permalink: /en/blog/migrate-jenkins-to-a-docker-container/
translate_es: /blog/migrar-jenkins-hacia-un-contenedor-en-docker/
category: [article]
tags: [docker, jenkins, ubuntu]
image: /images/banners/docker-jenkins-og.png
excerpt: Migrate your Jenkins Service from physical installation to a Docker container is very easy. 
---

<img src="{{ site.baseurl }}/images/banners/jenkins-docker.png" title="" name="" />

### Introduction

**_Jenkins_** es un sistema de integración continua utilizado ampliamente por los **_grupos de desarrollo de software_**. Por otra parte, **_Docker_** nos brinda una nueva forma de estructurar nuestros servicios.

Migrar nuestro sistema **_Jenkins_** hacia la filosofía brindada por **_Docker_** puede ser un deseo o una meta de nuestro **_grupo de desarrollo_**. Sin embargo, existen preguntas a responder: 

- _¿Se perderán las configuraciones establecidas hasta el momento?_
- _¿Se perderán las estadísticas de las rutinas establecidas?_

La respuesta a ambas preguntas es **_no_**. El objetivo del presente artículo es mostrar cómo modificar la estructura del sistema **_Jenkins_** sin tener que empezar desde cero. 

Las modificaciones mostradas en el artículo fueron realizadas todas en el mismo servidor aunque se puede utilizar un segundo alojamiento para el cambio.

**_El sistema Jenkins solo dejó de brindar servicios 5 segundos._**

### Prerequisite

Para realizar los pasos del artículo deberá cumplir con el siguiente requerimiento:

- Having **_Jenkins_** installed.

### Environment

La configuración del entorno donde fue desarrollado el artículo es la siguiente:

```
### Continuous Integration System ###
         OS: Ubuntu 14.04
    Jenkins: 1.645
     Domain: jenkins.example.com
```

En el dominio **_jenkins.example.com_** se encuentra el sistema **_Jenkins_** brindando servicios.

## Step One – Install Docker.

La información referente a la instalación de **_Docker_** se encuentra claramente descrita en su <a target="_blank" href="https://docs.docker.com/engine/installation/ubuntulinux/">Sitio Web Oficial</a>. Durante la instalación de **_Docker_** hay que tener en cuenta el sistema operativo instalado en nuestro servidor.

## Step Two – Start the Jenkins service.

**_Iniciar Jenkins_**

Para iniciar **_Jenkins_** utilizando **_Docker_** se escribe lo siguiente:

```
docker run -p 8085:8080 --name jenkins jenkins
```

- _-p 8085:8080_: enlaza el puerto 8080 del contenedor jenkins al puerto 8085 del host.
- _--name jenkins_: establece el nombre _jenkins_ al contenedor creado.

**_Comprobar que funciona_**

Para comprobar que Jenkins funciona correctamente accediendo a la siguiente dirección web:

```
http://jenkins.example.com:8085
```

<img src="{{ site.baseurl }}/images/migrate-docker-jenkins/welcome-jenkins.png" title="Bienvenido Jenkins" name="Bienvenido Jenkins" />

**_Detener el servicio_**

Es necesario detener el servicio para continuar con las configuraciones.

```
Ctrl-C
```

## Step Three – Establecer un volumen para los datos.

**_Crear estructura_**

Crear las carpetas donde se almacenan los datos y configuraciones del servicio. Estas carpetas tienen que tener permisos **_777_** para permitir que el usuario **_jenkins_** escriba dentro de ellas.

```
sudo mkdir -p ~/jenkins/data
sudo chmod -R 777 ~/jenkins/
```

- _carpeta jenkins_: almacena las configuraciones para Docker.
- _carpeta data_: almacena los datos de Jenkins.

**_Iniciar servicio con el volumen de datos_**

Para iniciar el servicio utilizando la carpeta de volumen de datos creada se escribe lo siguiente:

```
docker run -d -p 8085:8080 --name jenkins-with-volume -v ~/jenkins/data:/var/jenkins_home jenkins
```

- _-d_: se utiliza para iniciar Jenkins como servicio.

Se puede observar que el contenido creado dentro de la carpeta `~/jenkins/data` son los ficheros de configuración de Jenkins.

**_Detener el servicio_**

Es necesario detener el servicio para continuar con las configuraciones.

```
docker stop jenkins-with-volume
```


## Step Four – Migrar la información hacia el contendor.

Después de creada la estructura de carpetas es muy sencillo migrar la infomación del sistema **_Jenkins_** que se encuentra actualmente en uso.

Primero se borra toda la información creada por Jenkins en `~/jenkins/data`.

```
sudo rm -r ~/jenkins/data/*
sudo rm -r ~/jenkins/data/.*
```

Después, se busca el valor de la variable de entorno **JENKINS_HOME** dentro del sitio de **_Jenkins_** en **_Jenkins > Manage Jenkins > System Information_**.

<img src="{{ site.baseurl }}/images/migrate-docker-jenkins/jenkins-home.png" title="Jenkins Home" name="Jenkins Home" />

Una vez identificada la ubicación de los ficheros de Jenkis se realiza la copia hacia la carpeta `~/jenkins/data`.

**_Iniciar el servicio_**

Es necesario reiniciar el serivio y revisar que **_Jenkins_** tenga los mismos datos en la dirección web `http://jenkins.example.com:8085`.

```
docker start jenkins-with-volume
```

## Step Five – Instalar Docker Compose.

La información referente a la instalación de **_Docker Compose_** se encuentra claramente descrita en su <a target="_blank" href="https://docs.docker.com/compose/install/">Sitio Web Oficial</a>.

## Step Six – Utilizar Docker Compose en el proceso.

**_Crear fichero YAML_**

Se crea el fichero `docker-compose.yml` en la carpeta `~/jenkins/`.

```
touch ~/jenkins/docker-compose.yml
```

Dentro del fichero se agrega la siguiente información:

```
app:
  image: jenkins
  ports:
    - 8085:8080
  volumes_from:
    - data
  restart: always

data:
  image: busybox
  volumes:
    - /home/user/jenkins/data:/var/jenkins_home:rw
```

- app: es el servicio de Jenkins.
- data: el el contenedor para los datos de **_Jenkins_**.
- _restart:always_: garantiza iniciar el servicio al reiniciar el host. 
- Se utiliza `user` dentro de `/home/user/jenkins/data:/var/jenkins_home:rw por` y no `~` porque tiene que ser un camino físico.

**_Detener el servicio_**

El servicio de **_Docker_** detiene utilizando el siguiente comando:

```
docker stop jenkins-with-volume
```

**_Iniciar el servicio con Docker Compose_**

El servicio de Jenkins se inicia utilizando **_Docker Compose_**. Para lograrlo se escribe lo siguiente:

```
cd ~/jenkins/
docker-compose up -d
```

Revisar el correcto funcionamiento del sitio en `http://jenkins.example.com:8085`.

## Step Seven – Establecer solamente Jenkins como Servicio en Docker.

**_Modificar el puerto en el fichero yml_**

Se modifica el puerto del host en el fichero `docker-compose.yml` quedando de la siguiente forma:

```
app:
  image: jenkins
  ports:
    - 80:8080
  volumes_from:
    - data
  restart: always

data:
  image: busybox
  volumes:
    - /home/user/jenkins/data:/var/jenkins_home:rw
```

**_Detener el servicio de Jenkins_**

Se detiene el servicio **_Jenkins_** utilizando el siguiente comando:

```
sudo service jenkins stop
```

**_Iniciar Jenkins como servicio de Docker_**

Reiniciar el servicio **_Jenkins_** en **_Docker_**.

```
docker-compose up -d
```

Revisar el correcto funcionamiento del sitio en `http://jenkins.example.com`.

**Listo!!! Migración terminada.**

## Final Thoughts
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Significant Revisions
- <a target="_blank" href="http://docker.com/">Docker - Official Website</a>.
- <a target="_blank" href="https://jenkins-ci.org/">Jenkins - Official Website</a>.
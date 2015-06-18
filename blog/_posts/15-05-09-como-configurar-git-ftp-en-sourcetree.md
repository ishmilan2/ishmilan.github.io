---
layout: post
title: ¿Cómo actualizar los cambios desde Git hacia un FTP en SourceTree?
---

Establecer un **proyecto web en el alojamiento (hosting) de producción** es el paso final dentro del **flujo de trabajo**. Desplegar el sistema desde el **control de versiones Git** garantiza aumentar la **rapidez del proceso**; pues se actualizan solo los **cambios realizados** y se evita la manipulación de clientes **FTP**.

## Introducción

Los proyectos en PHP son muy comunes y fáciles de implementar. Estos proyectos tienen que ser desplegados en un servidor web para su publicados.

La mayoría de las empresas que brindan servicios de hosting a bajos precios no proporcionan acceso SSH, solamente FTP. Por tal motivo, es frecuente que el proceso de actualización de los proyectos se vuelva tedioso y largo al utilizar un cliente FTP.

Garantizar que el proceso de actualización del sistema se realice de forma rápida y con calidad es todo un reto.

**_Entorno de desarrollo_**

Se utiliza **Git** como control de versiones y **SourceTree** como herramienta gráfica para gestionar los cambios del repositorio. El sistema operativo es **Mac OS X 10.10.1**

## Git-FTP

[Git-FTP](http://git-ftp.github.io/git-ftp/) es un cliente FTP escrito en shell. 

Permite transferir solamente aquellos ficheros que han sido modificados en el repositorio Git desde la última actualización. Sin importar en que rama se esté trabajando, **git-ftp** permite identificar los ficheros cambiados.

### ¿Cómo funciona git-ftp?

**Git-FTP** utiliza como parámetros para su funcionamiento las credenciales del servidor FTP y la ubicación del repositorio git donde desea realizar el despliegue. Esto le permite posicionarse en el directorio para obtener los ficheros modificados y utiliza las credenciales para establecer la conexión.

Para identificar los ficheros que tienen que ser actualizados **Git-FTP** crea un fichero llamado `.git-fpt.log` en el hosting donde guarda el valor _SHA1_ que identifica al commit de *git*. Por tal motivo, en la próxima actualización puede establecer la diferencia entre el commit actual del repositorio y el que está en el servidor para conocer los ficheros que han sido modificados.

### Inconvenientes de git-ftp

**Git-FTP** no significa tener un control de versiones en el servidor. Los cambios realizados de forma manual en el alojamiento web no serán detectados por esta herramienta y pudiera implicar posibles actualizaciones no deseadas de ficheros.

Se recomienda para el uso de **Git-FTP** utilizar siempre el mismo flujo para el despliegue.

## Instalación de Git-FTP

Se descarga el repositorio desde GitHub:

```
git clone https://github.com/mmorejon/git-ftp.git
```

Al descargar el repositorio se crear una carpeta llamada `git-ftp` con todo el código sin compilar. Se accede a la carpeta `git-ftp` y se activa la rama `master` para posicionarnos en la versión estable.

```
cd git-ftp
git checkout master
```

Se compila el código para crear el ejecutable.

```
sudo make install
```

Al compilar el código fuente se crear un ejecutable en la dirección `usr/local/bin/git-ftp`. Este fichero ejecutable puede ser accedido desde cualquier carpeta del sistema operativo para utilizar las funciones de **Git-FTP**.

## Funcionalidades de Git-FTP

**Git-FTP** cuenta con las siguientes funcionalidades:

`init` : Inicia la subida al hosting.

`push` : Actualiza los ficheros que fueron modificados desde la última subida.

`catchup` : Crea solamente el fichero `.git-ftp.log` en el hosting. Se utiliza cuando ya se han subido ficheros previamente con otro programa y se desea recordar el estado actual del repositorio subiendo el fichero `.git-ftp.log`.

Para revisar todas las funcionalidades y opciones que brinda **Git-FTP** se puede consultar el [siguiente enlace](https://github.com/mmorejon/git-ftp/blob/develop/man/git-ftp.1.md).

## Configuración en SourceTree

Para incluir **Git-FTP** como una acción adicional en [SourceTree](http://sourcetreeapp.com/) debemos realizar los siguientes pasos:

Crear una carpeta para colocar los scrips:

```
cd ~
mkdir git-ftp-scripts
```

Se crea el script para colocar los cambios en el servidor. Le vamos a llamar al scritp `git-ftp-push.sh` y colocaremos dentro el siguiente código:

```
#!/bin/sh

# Parámetros para ejecutar SourceTree Custom Action
# $PATH <ftp username> <ftp password> <ftp path>

REPOSITORY_PATH="$1"  
FTP_USERNAME="$2"
FTP_PASSWORD="$3"
FTP_PATH="$4"

echo "Cambiando el directorio hacia la raíz del repositorio '$REPOSITORY_PATH'"
cd "$REPOSITORY_PATH"

echo "Colocando los últimos cambios hacia '$FTP_PATH' utilizando las credenciales"
/usr/local/bin/git-ftp push -u $FTP_USERNAME -p $FTP_PASSWORD "$FTP_PATH"

exit 0
```

Una vez creado el script para colocar nuestro código en el FTP se pasa a configurar la llamada de este fichero dentro del SourceTree.

Se accede a las configuraciones del SourceTree, específicamente en _Acciones Personalizadas_ y se agrega un nuevo elemento.

<img src="{{ site.baseurl }}/images/add-custom-action.png" />

Se selecciona el script creado para que sea ejecutado y en el campo _Parámetros_ se colocan la variables definidas el fichero separadas por un espacio. Quedaría de la siguiente forma:

```
$REPO <usuario-ftp> <contraseña-ftp> ftp://<alojamiento-web>/
```

Una vez realizadas las configuraciones se puede regresar a la vista del repositorio y accionar la funcionalidad configurada. La siguiente imagen refleja cómo sería:

<img src="{{ site.baseurl }}/images/git-ftp-sourcetree.png" />

## Reflexiones finales

Reducir el tiempo de despliegue de un sistema es una necesidad dentro del flujo de trabajo. Garantizar la calidad de este proceso es tan importante como reducir los tiempos.

Ambos elementos pueden ser alcanzados realizando una buena configuración de las herramientas utilizadas durante el desarrollo de software. Al Gestor de Configuración de Software le corresponde realizar esta tarea.

### Revisiones significativas

* [SourceTree](http://sourcetreeapp.com/)
* [Repositorio Git-FTP](https://github.com/mmorejon/git-ftp)
* BOB, A. (2011): Configuration Management Best Practices. Addison-Wesley.
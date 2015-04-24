---
layout: post
title: ¿Cómo instalar Redmine en Ubuntu 14.04?
---

El trabajo en equipo es una actividad necesaria durante el desarrollo de software. Cada miembro debe contribuir con sus habilidades y conocimientos en aras de alcanzar los objetivos propuestos. El éxito del grupo depende fundamentalmente de las habilidades de organización que tengan.

__Redmine__ es una aplicación web libre para la gestión de proyectos. Este sistema permite la gestión de múltiples proyectos, control de acceso basado en roles, seguimiento de tareas, calendario y diagramas de Gantt. Permite integrar al flujo de trabajo diferentes controles de versiones como Git, Subversion, Mercurial, Bazaar y Darcs. De igual forma incluye vistas de los repositorios y diferencias entre archivos. Redmine garantiza el envío de notificaciones por correo.

La arquitectura del sistema se basa en la extensión de sus funcionalidades a través de plugins. Esta característica permite incorporar a una amplia comunidad de desarrolladores que colaboran ampliando los beneficios brindados por Redmine. La aplicación web fue escrita utilizando el framework Ruby on Rails. Es multi-plataforma, permite la configuración para múltiples bases de datos y está disponible para 34 idiomas.

En esta guía vamos a hablar sobre cómo instalar Redmine en Ubuntu 14.04 para que pueda gestionar sus proyectos.

## Pre-requisitos

Antes de comenzar con esta guía usted debe tener la siguiente configuración.

Se asume que está utilizando un usuario que no es root y que cuenta con los privilegios `sudo`.

Una vez terminada este paso usted se encuentra listo para comenzar esta guia.

## Paso 1 - Descargar Redmine

El primer paso será descargar los ficheros del proyecto Redmine desde su sitio web.

El equipo de Redmine tiene organizados todas las vesiones liberadas en la misma carpeta `http://www.redmine.org/releases/`, por lo tanto podremos obtener la última versión de Redmine revisando los nombre de los ficheros. Podremos descargar la versión 3.0.1 escribiendo:

```
cd ~
wget http://www.redmine.org/releases/redmine-3.0.1.tar.gz
```

Esto va a descargar un fichero comprimido con los ficheros de Redmine hacia la ubicación raiz de nuestro usuario. Este fichero debe ser extraído para poder trabajar con el contenido. Para lograrlo escribimos lo siguiente:

```
tar -zxvf redmine-3.0.1.tar.gz
```

A continuación vamos a renombrar la carpeta `redmine-3.0.1` a `redmine` y moverla hacia su ubicación final en el directorio `opt` escribiendo:

```
sudo mv redmine-3.0.1 /opt/redmine
```

## Paso 2 – Instalar MySQL

Si no tiene instalado MySQL vamos a hacerlo ahora.

Primero actualizamos `apt-get`:

```
sudo apt-get update
```

Después instalar MySQL y las librería de desarrollo:

```
sudo apt-get install mysql-server libmysqlclient-dev libmagickcore-dev libmagickwand-dev
```

Durante la instalación, el servidor preguntará para establecer y confirmar la contraseña del usuario `root` para MySQL.

## Paso 3 - Crear base de datos MySQL y un usuario para Redmine

Redmine utiliza una base de datos relacional para gestionar y almacenar el sitio junto a la información de los usuarios.

Tenemos MySQL instalado lo cual nos permite estas funcionalidades, pero necesitamos crear una base de datos y un usuario para que Redmine pueda funcionar.

Para comenzar, nos autenticamos en MySQL con el usuario `root` (administrador) utilizando el siguiente comando:

```
mysql -u root -p
```

La consola le pedirá introducir la contraseña que ha establecido previamente para el usuario `root` de MySQL durante su instalación. Una vez introducida se tendrá acceso a la consola de MySQL.

Primeramente se crea una una base de datos independiente para que sea gestionada por Redmine. Esta base de datos puede ser llamada con cualquier nombre, pero recomendamos llamarle `redmine` porque es un nombre descriptivo y simple. Se introduce este comando para crear la base de datos:

```
CREATE DATABASE redmine CHARACTER SET utf8;
```

Cada sentencia MySQL debe terminar en punto y coma (;), esto debe tenerse en cuenta durante la ejecución de cada comando.

A continuación vamos a crear una cuenta de usuario de MySQL independiente la cual utilizaremos exclusivamente en nuestra nueva base de datos. Crear una base de datos y una cuenta individual es recomendable desde el punto de vista de gestión y seguridad.

Vamos a llamar la nueva cuenta `redmine` y le asignaremos la contraseña `redmine`. El comando para crear el usuario es el siguiente:

```
CREATE USER redmine@localhost IDENTIFIED BY 'redmine';
```

En este punto tenemos creada la base de datos y una cuenta de usuario específicas para Redmine. Sin embargo, estos dos componentes no tienen todavía relación alguna. Es decir, el usuario no tiene acceso a la base de datos.

Para garantizar darle acceso al usuario a la base de datos se escribe el siguiente comando:

```
GRANT ALL PRIVILEGES ON redmine.* TO redmine@localhost;
```

Ahora el usuario puede acceder a la base de datos. Ahora se necesita que MySQL reconozca los cambios en los privilegios realizados recientemente. Para esto escribimos:

```
FLUSH PRIVILEGES;
```

Una vez terminadas todas las configuraciones de MySQL podemos salir de la pantalla escribiendo lo siguiente:

```
exit
```

A partir de este momento se regresa a la pantalla normal de comando.

## Paso 4 - Configurar la base de datos en Redmine

Redmine cuenta con la carpeta `config` donde almacena los ficheros de configuración con el objetivo de ajsutar el sistema al entorno que sea necesario.

Para acceder a la carpeta escribimos:

```
cd /opt/redmine/config/
```

Para configurar la base de datos de Redmine se utiliza el fichero `database.yml`. Redmine incluye el fichero de ejemplo `database.yml.example` para agilizar el proceso de creación y evitar errores de estructura.

Se realiza una copia del fichero `database.yml.example` para crear nuestro propio fichero `database.yml`. Para lograrlo se escribe lo siguiente:

```
sudo cp database.yml.example database.yml
```

A continuación debemos abrir el fichero para configurar el gestor de base de datos y las credenciales de acceso, para lo cual escribimos:

```
sudo nano database.yml
```

Redmine permite establecer distintos entornos de trabajo (`production`, `development` y `test`). Se configura el entorno `production` para la puesta en marcha del sistema mientras que `development` y `test` son empleados para realizar pruebas antes de incluirlas al sistema de producción.

La sección de código que debe ser modificada es la siguiente:

```
production:
	adapter: mysql
	database: redmine
	host: localhost
	username: redmine
	password: tu_contraseña_aqui
	encoding: utf8
```

Debe reemplazar la contraseña el campo tu_contraseña_aqui por el especificado en la consulta de MySQL al crear el usuario redmine.

Se deben guardar los cambios en el fichero antes de cerrarlo escribiendo lo siguiente:

```
ctr x
```

## Paso 5 - Instalar RubyGems, Bundler y las dependencias

Bundler es un gestor de dependencias para las Gemas de Ruby. Bundler simplifica el proceso de despliegue chequeando y asegurando que todas las dependencias estén correctamente instaladas.

Para poder utilizar Bundler tiene que estar instalado en el sistema la herramienta que gestiona las gemas de ruby. Entonces instalemos primero esta herramienta escribiendo lo siguiente:

```
sudo apt-get install rubygems-integration 
```

Una vez instalado el gestor de gemas de ruby se instala la gema bundler. Para lograrlo se escribe el siguiente comando: 

```
sudo gem install bundler
```

Con la instalación de la gema Bundler no es suficiente. Se necesitan más dependencias para poner a funcionar todo el sistema. Las siguientes dependencias incluyen ficheros de desarrollo para MySQL, ImageMagic, Ruby-dev y Make.

ImageMagic va a permitir el manejo de imágenes. Por ejemplo exportar el diagrama de Gantt a imagen PNG.

Para instalarlas escribimos el siguiente comando:

```
sudo apt-get install libmysqlclient-dev libmagickcore-dev libmagickwand-dev libxslt1-dev imagemagick
```

GNU Make es una herramienta que controla la generación de ejecutables y otros archivos que no sean fuente de un programa de archivos de código fuente del programa. Para instalarlas escribimos lo siguiente:

```
sudo apt-get install make
```

Ruby-dev permite compilar módulos de extensión para Ruby. Para instalarlo se escribe el siguiente comando:

```
sudo apt-get install ruby-dev
```

Nokigiri es una gema de Ruby que utiliza las librerías del sistema `libxml2` y `libxslt`. Podría suceder que Nokigiri intente trabajar con una versión de `libxml2` para la cual no tenga soporte. Por esta razón se debe debe configurar para que utilice las librerías instaladas en el sistema.

Para lograr esto se escribe lo siguiente:

```
bundle config build.nokogiri --use-system-libraries
```

En este punto han quedado instaladas todas las librerías necesarias para que funcione Redmine. Pasamos ahora a instalar las gemas que necesita Redmine.

Para realizarlo vamos a excluir las dependencias de PostgreSQL y SQLite porque vamos a utilizar MySQL. De igual forma se van a excluir las dependencias relacionadas con los entornos de desarrollo y testing.

Primero nos posicionamos en la raíz proyecto Redmine y después realizamos la instalación de las gemas. Para lograrlo escribimos lo siguiente:

```
cd /opt/redmine
sudo bundle install --without development test postgresql sqlite
```


## Paso 6 - Finalizando la instalación de Redmine

Se inicializan los ficheros de estado. Para esto nos colocamos en la raíz de la carpeta Redmine y escribiendo lo siguiente:

```
sudo rake generate_secret_token
```

Una vez iniciados los ficheros de estado se inicializa la base de datos escribiendo lo siguiente:

```
RAILS_ENV=production rake db:migrate
```

## Paso 7 - Crear un script para el servicio de Redmine

Se debe crear un script para realizar, de forma sencilla, las acciones de iniciar, detener y reiniciar el sistema Redmine. Para lograrlo creamos un fichero con el nombre `redmine.conf` en la carpeta `/etc/init/` escribiendo lo siguiente:

```
sudo nano /etc/init/redmine.conf
```

Una vez abierto el fichero se copia el siguiente contenido dentro:

```
# Redmine

description "Redmine"

start on runlevel [2345]
stop on runlevel [!2345]

expect daemon
exec ruby /opt/redmine/bin/rails server webrick -e production -b 0.0.0.0 -d
```

Después de copiar el contenido se cierra el fichero y se ejecuta el siguiente comando para iniciar el servicio de Redmine:

```
sudo service redmine start
```

Al iniciarse el servicio se pueden ver los resultados de la instalación escribiendo lo siguiente en el navegador

```
http://SERVER_IP:3000/
```

## Reflexiones finales

Siguiendo esta guía quedará instalado en su servidor la aplicación web Redmine. Este sistema le ayudara a tener identificados todos los artefactos importantes de sus proyectos. De igual forma podrá almacenar, controlar y auditar la gestión de sus proyectos.

### Revisiones significativas

* http://www.redmine.org
* ANDRIY, L. (2013) Mastering Redmine. Packt Publishing
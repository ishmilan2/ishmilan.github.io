---
layout: post
title: ¿Cómo instalar YouTrack 6.5 en Ubuntu 14.04?
permalink: /blog/como-instalar-youtrack-en-ubuntu-14.04/
category: articulo
tags: [youtrack, ubuntu]
excerpt: YouTrack 6.5 instalación y configuración
---

**_YouTrack_** es una 

### Introducción

Se asume que está utilizando un usuario que no es `root` y que cuenta con los privilegios `sudo`.

## Paso 1 - Instalar JRE

**_YouTrack_** ha sido desarrollado en **_Java_** y por lo tanto es necesario tener instalado en el sistema las bibliotecas estándares para su ejecución. Para lograrlo se utiliza el siguiente comando:

```
sudo apt-get install openjdk-7-jre
```

Para confirmar que la instalación ha termiando correctamente se utiliza el siguiente comando:

```
java -version
```

Como resultado debe mostarse en el **_Terminal_** la versión del `JRE` instalada y otros datos del sistema. Por ejemplo:

```
java version "1.7.0_75"
OpenJDK Runtime Environment (IcedTea 2.5.4) (7u75-2.5.4-1~trusty1)
OpenJDK 64-Bit Server VM (build 24.75-b04, mixed mode)
```

## Paso 2 – Adicionar usuario

Se crea el usuario `youtrack` en el sistema para gestionar los datos y servicios de **_YouTrack_**. El usuario no necesita tener una contraseña asociada, por lo tanto se utiliza el parámetro `--disabled-password` durante su creación.

```
sudo adduser youtrack --disabled-password
```

## Paso 3 - Crear el directorio

Se crear el directorio `/usr/local/youtrack` para almacenar el script de ejecución, los ficheros de trazas y el ejecutable de **_YouTrack_**.

```
sudo mkdir -p /usr/local/youtrack
```

El directorio creado se configura para que pertenezca al usuario y grupo `youtrack` creado en el segundo paso.

```
sudo chown youtrack.youtrack /usr/local/youtrack
```

## Paso 4 - Crear script en init.d

Se crea el script encargado de iniciar, detener y reiniciar el sistema **_YouTrack_**. El script se crea dentro de la carpeta `/etc/init.d/` de **_Ubuntu 14.04_** para ser gestionado como un servicio. El nombre del script es `youtrack`.

Para crear y abrir el fichero se ejecuta la siguiente línea:

```
sudo nano /etc/init.d/youtrack
```

El fichero creado va a contener la siguiente información:

* `HOME` variable para almacenar la referencia donde serán desplegados los ficheros del sistema YouTrack. 
* `NAME` variable para utilizado para imprimir mensajes en el Terminal y para establecer la ruta del scritp de ejecución de YouTrack.
* `SCRIPT` variable donde se almacena la rutal del script de ejecución de YouTrack.
* `d_start()` función para iniciar el servicio de YouTrack.
* `d_stop()` función para detener el servicio de YouTrack.

Una vez creado y abierto el fichero se inserta dentro la información correspondiente a la expliación del párrafo anterior:

```
#! /bin/sh

export HOME=/home/youtrack

NAME=youtrack
SCRIPT=/usr/local/$NAME/$NAME.sh

d_start() {
	su youtrack -l -c "$SCRIPT start"
}

d_stop() {
	su youtrack -l -c "$SCRIPT stop"
}

case "$1" in
	start)
		echo "Starting $NAME..."
		d_start
		;;
	stop)
		echo "Stopping $NAME..."
		d_stop
		;;
	restart|force-reload)
		echo "Restarting $NAME..."
		d_stop
		d_start
		;;
	*)
		echo "Usage: sudo service youtrack {start|stop|restart}" >&2
		exit 1
		;;
esac

exit 0
```

Después que se ha cerrado el fichero con la información adicionada se le asignan permisos de ejecución. Para lograrlo el código es el siguiente:

```
sudo chmod +x /etc/init.d/youtrack
```

Se inserta un enlace del scritp `youtrack` al proceso de gestión de inicio del sistema operativo utilizando los valores por defecto. De esta forma YouTrack podrá iniciarse automáticamente. Para esto se escribe el siguiente código: 

```
sudo /usr/sbin/update-rc.d youtrack defaults
```

## Paso 5 - Crear script de ejecución para YouTrack

Se crea el script que va a contener la configuración de ejecución para YouTrack. El scritp se crea dentro de al carpeta `/usr/local/youtrack/`. El nombre del fichero es `youtrack.sh`. Para crearlo se utiliza el siguiente comando:

```
sudo nano /usr/local/youtrack/youtrack.sh
```
El fichero establece contiene las siguientes variables y funciones:

* `NAME` variable para crear los ficheros de trazas.
* `PORT` variable para establecer el puerto que será utilizado en el navegador. Este puerto no puede ser el **_80_**.
* `USR` variable para establecer la posición donde se encuentra la carpeta con los ficheros de YouTrack.
* `JAR` variable para establecer la ruta del fichero .jar de YouTrack.
* `LOG` variable para establecer el nombre del fichero de trazas una vez ejecutado YouTrack.
* `PID` variable para establecer el nombre del fichero donde es almacena el identificador del proceso que ha iniciado YouTrack.
* `d_start` función para iniciar YouTrack.
* `d_stop` función para detener YouTrack.

Una vez creado y abierto el fichero se inserta dentro la información correspondiente a la expliación del párrafo anterior:

```
#! /bin/sh

export HOME=/home/youtrack

NAME=youtrack
PORT=8080
USR=/usr/local/$NAME
JAR=$USR/`ls -Lt $USR/*.jar | grep -o "$NAME-[^/]*.jar" | head -1`
LOG=$USR/$NAME-$PORT.log
PID=$USR/$NAME-$PORT.pid

d_start() {
	if [ -f $PID ]; then
		PID_VALUE=`cat $PID`
		if [ ! -z "$PID_VALUE" ]; then
		PID_VALUE=`ps ax | grep $PID_VALUE | grep -v grep | awk '{print $1}'`
			if [ ! -z "$PID_VALUE" ]; then
				exit 1;
			fi
		fi
	fi

	PREV_DIR=`pwd`
	cd $USR
	exec java -Xmx1g -XX:MaxPermSize=250m -Djava.awt.headless=true -jar $JAR $PORT >> $LOG 2>&1 &
	echo $! > $PID
	cd $PREV_DIR
}

d_stop() {
	if [ -f $PID ]; then
		PID_VALUE=`cat $PID`
		if [ ! -z "$PID_VALUE" ]; then
			PID_VALUE=`ps ax | grep $PID_VALUE | grep -v grep | awk '{print $1}'`
			if [ ! -z "$PID_VALUE" ]; then
				kill $PID_VALUE
				WAIT_TIME=0
				while [ `ps ax | grep $PID_VALUE | grep -v grep | wc -l` -ne 0 -a "$WAIT_TIME" -lt 2 ]
				do
					sleep 1
					WAIT_TIME=$(expr $WAIT_TIME + 1)
				done
				if [ `ps ax | grep $PID_VALUE | grep -v grep | wc -l` -ne 0 ]; then
					WAIT_TIME=0
					while [ `ps ax | grep $PID_VALUE | grep -v grep | wc -l` -ne 0 -a "$WAIT_TIME" -lt 15 ]
					do
						sleep 1
						WAIT_TIME=$(expr $WAIT_TIME + 1)
					done
					echo
				fi
				if [ `ps ax | grep $PID_VALUE | grep -v grep | wc -l` -ne 0 ]; then
					kill -9 $PID_VALUE
				fi
			fi
		fi
		rm -f $PID
	fi
}

case "$1" in
	start)
		d_start
	;;
	stop)
		d_stop
	;;
	*)
		echo "Usage: $0 {start|stop|restart}" >&2
		exit 1
	;;
esac

exit 0
```
Después que se ha cerrado el fichero con la información adicionada se le asignan permisos de ejecución. Para lograrlo el código es el siguiente:

```
sudo chmod +x /usr/local/youtrack/youtrack.sh
```

## Paso 6 - Descargar YouTrack

Se descarga desde el sitio de **_YouTrack_** la última versión del sistema. En esta guía se ha utilizado la versión **_6.5_**. El fichero descargado tiene extensión `.jar`.

```
sudo su youtrack -l -c "cd /usr/local/youtrack && wget http://download.jetbrains.com/charisma/youtrack-<version>.jar"
```

## Paso 8 - Iniciar YouTrack

Una vez terminadas las configuraciones anteriores el sistema YouTrack se encuentra listo para ser iniciado. Para esto se escribe lo siguiente:

```
sudo service youtrack start
```

Para confirmar su funcionamiento se abre el navegador y la aplicación se encontrará funcionando por el puerto que ha configurado. Por ejemplo: `http://<servidor>:<puerto>

## Configurar el correo con Gmail

**_YouTrack_** permite establecer la configuración de correo utilizando el protocolo `SMTP + SSL`. Para configurar el correo con su cuenta de **_Gmail_** debe llenar los campos de la siguiente forma.

```
SMTP host:
SMTP port:
Mail protocol:
SMTP login:
SMTP password:
Select SSL key:
Server 'from' email:
```

## Autenticación utilizando OpenLDAP

YouTrack permite la autenticación de usuarios desde directorios OpenLDAP. Para su configuración debe ser adicionado un nuevo módulo de Autenticación desde el panel de administración que sea de tipo LDAP.

Los datos que deben ser configurados son los siguientes:

* **_Name:_** nombre del directorio
* **_Server URL:_** dirección del directorio
* **_DN Transform:_** ubicación donde serán buscados los usuarios dentro del directorio.
* **_Filter:_** campo utilizado como filtro del usuario.

Los atributos del OpenLDAP que deben ser llenados son los siguientes:

* **_Name:_** campo nombre del usuario en el Open LDAP.
* **_Login:_** campo utilizado para registrarse el usuario en YouTrack.
* **_Email:_** campo correo del usuario en OpenLDAP.

Un ejemplo de configuración sería la siguiente:

```
			Name: Company OpenLDAP
Server URL: ldap://ldap.company.com:389/dc=company,dc=com
    DN Transform: cn=%u,ou=people,dc=company,dc=com
          Filter: cn=%u
  Select SSL key: No Key

Atributos LDAP
			Name: displayName
		   Login: cn
		   Email: mail
```

## Actualizar YouTrack

Con las configuraciones realizadas hasta el momento será muy fácil actualizar el sistema YouTrack. Simplemente debe descargar la nueva versión desde el sitio oficial y reiniciar el servicio. Para lograrlo debe escribir el siguiente código:

Primaro descargar el fichero `.jar`.

```
sudo su youtrack -l -c "cd /usr/local/youtrack && wget http://download.jetbrains.com/charisma/youtrack-<version>.jar"
```

Reiniciar el sistema

```
sudo service youtrack restart
```

## Reflexiones finales



### Revisiones significativas

* [Sitio de Redmine](http://www.redmine.org)
* ANDRIY, L. (2013) Mastering Redmine. Packt Publishing
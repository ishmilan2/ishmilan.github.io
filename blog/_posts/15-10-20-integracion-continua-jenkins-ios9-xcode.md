---
layout: post
title: Integración contínua combinando Jenkins, iOS 9 y XCode 7.
permalink: /blog/integracion-continua-jenkins-ios9-xcode/
category: [articulo]
tags: [jenkins, xcode, ios9]
image: /images/banners/jenkins-og.jpeg
excerpt: Automatizar las pruebas para proyectos en iOS 9 es posible. Delegar la ejecución de casos de pruebas a máquinas de mayor rendimiento simplifica el proceso de desarrollo.
---

<img src="{{ site.baseurl }}/images/banners/jenkins-ios9.png" title="Jenkins, XCode 7 y iOS 9" name="Jenkins, XCode 7 y iOS 9" />

### Introducción

La ejecución de pruebas al código fuente es un eslabón fundamental durante el proceso de desarrollo de software. Realizar todas las pruebas a un sistema significa emplear gran cantidad de recursos durante su ejecución y en ocasiones las pruebas pueden tomar bastante tiempo en terminar.

El equipo de desarrollo pudiera ver entorpecido su trabajo si tiene que esperar por el resultado de todas las pruebas ejecutadas cada vez que termina una tarea. Para evitar esta situación se delega la actividad de revisión a sistemas de integración continua con mayores capacidades de procesamiento. Estos sistemas pueden ser configurados para realizar tareas en los horarios menos activos para maximizar el rendimiento. Una vez terminada la tarea el sistema envía las notificaciones del resultado a los usuarios interesados.

En el presente artículo se muestra cómo configurar un proyecto de iOS 9 dentro del flujo de integración contínua utilizando el sistema Jenkins.

### Pre requisitos

Para realizar los pasos del artículo debera cumplir con los siguientes requerimientos:

* Tener instalado el sistema de **_Integración Contínua Jenkins_**.
* Tener instalado la herramienta de programación **_XCode 7_**.
* Desarrollar un proyecto en **_iOS 9_** con pruebas unitarias implementadas.

Si el sistema de **_Integración Contínua Jenkins_** lo tiene instalado en una máquina con sistema operativo distinto a Mac OS deberá además cumplir con lo siguiente:

* Tener una máquina con sistema operativo Mac 10.10.5.
* Configuar la máquina de sistema operativo Mac como **_Nodo en Jenkins_** para la ejecución de tareas. Este Nodo deberá tener instalado la herramienta **_XCode 7_**.

## Entorno

La configuración del entorno donde fue desarrollado el artículo es la siguiente:

```
### Sistema de integración continua ###
          SO: Ubuntu 14.04
     Jenkins: 1.631
XCode Plugin: 1.4.9
JUnit Plugin: 1.9

### Nodo de Jenkins ###
          SO: Mac OS 10.10.5
       XCode: 7

### Proyecto iOS 9 ###
    Lengueje: Swift
```

## Paso 1 - Instalar plugins a Jenkins.

**_Jenkins_** puede ser configurado para realizar la ejecución de pruebas a los proyectos en **_iOS 9_**. En el repositorio de Jenkins existe el **_plugin XCode integration_** que nos permitirá compilar el código fuente y ejecutar las pruebas implementadas.

El <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin" target="_blank">_plugin XCode integration_</a> realiza la ejecución de la pruebas y el resultado se escribe en un fichero con **_formato XML_** dentro del proyecto. Este fichero tiene la misma estructura que se obtiene cuando se realizan las pruebas con **_JUnit_**. Por tal motivo se va a utilizar el **_plugin JUnit de Jenkins_** para mostrar el resultado de las pruebas ejectuadas en el proyecto de **_iOS 9_** y poder emitir gráficos asociados al mismo.

Para instalarlos se realizan los siguientes pasos:

* Abrir Jenkins en el navegador web.
* Navegar por **_Administrar Jenkins_** > **_Administrar Plugins_**.
* Seleccionar el panel **_Todos los plugins_**.
* Filtrar **_Xcode integration_** y seleccionar para instalar. Repetir esta operación pero esta vez filtrando por **_JUnit Plugin_**.
*  Después de tener los dos plugins seleccionados se selecciona el botón **_Instalar sin Reiniciar_**.
*  Al terminar la instalación se tiene que **_reiniciar Jenkins_**.

Después de haber reiniciado el sistema se debe volver al área de administración de los plugins y verificar que se hayan instalado correctamente. También se debe revisar la versión instalada con la descrita en la sección Entorno.

## Paso 2 - Crear tarea en Jenkins.

Una vez instalados los componentes necesarios en Jenkins se puede pasar a crear una nueva tarea para la ejecución automática de las pruebas.

### Crear nueva tarea de Jenkins

Seleccionar **_Nueva Tarea_** en la página de inicio de Jenkins.
Llenar el campo **_Nombre de la Tarea_** con el valor que desee. En el ejemplo se ha puesto time-table.

### Obtener el código del proyecto.

### Ejecutar la tarea solamente en el nodo de Mac OS X

### Configurar el plugins de XCode.

### Configurar el plugins de JUnit.

## Paso 3 - Ejecutar tarea en Jenkins.

Se ejectua la tarea y se muestra las principales partes del script de resultado en la consola.
Se muestran las pantallas que lanza XCode.

## Paso 4 - Mostar los reportes.

## Reflexiones finales

### Revisiones significativas

* <a href="https://wiki.jenkins-ci.org" target="_blank">Sitio oficial de Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin" target="_blank">Plugins de XCode para Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin" target="_blank">Plugins de JUnit para Jenkins.</a>
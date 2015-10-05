---
layout: post
title: Integración contínua combinando Jenkins, iOS 9 y XCode 7.
permalink: /blog/integracion-continua-jenkins-ios9-xcode/
category: [articulo]
tags: [jenkins, xcode, ios9]
excerpt: Automatizar las pruebas para proyectos en iOS 9 ayuda al proceso de desarrollo de software.
---

Automatizar las pruebas para proyectos en iOS 9 ayuda al proceso de desarrollo de software.

### Introducción

Automatizar la ejecución de pruebas para los proyectos 

### Pre requisitos

Para realizar los pasos del artículo debera cumplir con los siguientes requerimientos:

* Tener instalado el sistema de **_Integración Contínua Jenkins_**.
* Tener instalado la herramienta de programación **_XCode 7_**.
* Desarrollar un proyecto en **_iOS 9_** con pruebas unitarias implementadas.

Si el sistema de **_Integración Contínua Jenkins_** lo tiene instalado en una máquina con sistema operativo distinto a Mac OS deberá además cumplir con lo siguiente:

* Máquina con sistema operativo Mac 10.10.5
* Configuar la máquina de sistema operativo Mac como **_Nodo en Jenkins_** para la ejecución de tareas. Este Nodo deberá tener instalado la herramienta **_XCode 7_**.

## Entorno

La configuración del entorno donde fue desarrollado el artículo es la siguiente:

```
### Sistema de integración continua ###
          SO: Ubuntu 14.04
     Jenkins:
XCode Plugin:
JUnit Plugin:

### Nodo de Jenkins ###
          SO: Mac OS 10.10.5
       XCode: 7

### Proyecto iOS 9 ###
    Lengueje: Swift
```

## Paso 1 - Instalar plugins a Jenkins.

**_Jenkins_** puede ser configurado para realizar la ejecución de pruebas a los proyectos en **_iOS 9_**. En el repositorio de Jenkins existe el **_plugins XCode_** que nos permitirá compilar el código fuente y ejecutar las pruebas implementadas.

El **_plugins XCode_** realiza la ejecución de la pruebas y el resultado se escribe en un fichero con **_formato XML_** dentro del proyecto. Este fichero tiene la misma estructura que se obtiene cuando se realizan las pruebas con **_JUnit_**. Por tal motivo se va a utilizar el **_plugins JUnit de Jenkins_** para mostrar el resultado de las pruebas ejectuadas en el proyecto de **_iOS 9_** y poder emitir gráficos asociados al mismo.

La instalación de ambos plugins puede realizarse al mismo tiempo.

## Paso 2 - Crear tarea en Jenkins.

Pasos para desplegar el proyecto:
- Obtener el código del proyecto.
- Configurar para el nodo de Mac OS X
- Configurar el plugins de XCode.
- Configurar el plugins de JUnit.

## Paso 3 - Ejecutar tarea en Jenkins.

Se ejectua la tarea y se muestra las principales partes del script de resultado en la consola.
Se muestran las pantallas que lanza XCode.

## Paso 4 - Se muestran los reportes.

## Reflexiones finales

### Revisiones significativas

* Sitio oficial de Jenkins.
* Plugins de XCode para Jenkins.
* Plugins de JUnit para Jenkins.


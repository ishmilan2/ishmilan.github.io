---
layout: post
title: Integración continua combinando: Pipeline, Jenkins 2.0, iOS 9 y .
permalink: /blog/integracion-continua-pipeline-jenkins2-ios9-xcode/
translate_en: /en/blog/continuous-integration-pipeline-jenkins2-ios9-xcode/
lang: es
sidebar: yes
category: [articulo]
tags: [jenkins, xcode, ios9]
image: /images/banners/jenkins-og.jpeg
excerpt: <strong><em>Automatizar las pruebas en proyectos para iOS 9 es posible!!!</em></strong> Delegar la ejecución de casos de pruebas a máquinas de mayor rendimiento <strong><em>simplifica el proceso de desarrollo</em></strong>.
---

<img src="{{ site.baseurl }}/images/banners/jenkins-ios9.png" title="Jenkins, XCode 7 y iOS 9" name="Jenkins, XCode 7 y iOS 9" />

### Introducción
Build Your Pipeline In Jenkins 2.0 as Code with iOS 9 and XCode 7.

Construya Su Pipeline en Jenkins 2.0 como Código con iOS 9 y XCode 7.

Pipeline como código para la configuración del proceso de integración contínua (Jenkinsfile)
Explicar un poco sobre jenkinsfile.
Los elementos que incluye son: descargar el código de GitHub, complilarlo, pruebas, coverage, checkstyle.
Mostrar los gráficos obtenidos.

### Pre requisitos

Para realizar los pasos del artículo deberá cumplir con los siguientes requerimientos:

* Tener instalado <a href="https://jenkins-ci.org/" target="_blank">_Jenkins_</a>.
* Tener instalado <a href="https://developer.apple.com/xcode/ide/" target="_blank">_XCode 7_</a>.
* Tener creado un **_proyecto para iOS 9 con pruebas unitarias_** implementadas.

**_Jenkins_** puede ser instalado en cualquier sistema operativo. Sin embargo, si se tiene instalado en una máquina con sistema operativo distinto a **_Mac OS_** deberá además incorporar los siguiente:

* Tener una máquina con sistema operativo **_Mac OS 10.10.5_**.
* Configurar la máquina **_Mac OS_** como **_Nodo en Jenkins_** para la ejecución de tareas. 
* Tener instalado **_XCode 7_** en la máquina Mac OS.

### Código fuente


### Entorno

La configuración del entorno donde fue desarrollado el artículo es la siguiente:

```
### Sistema de integración continua ###
             SO: Ubuntu 14.04
        Jenkins: 1.635
   XCode Plugin: 1.4.9
   JUnit Plugin: 1.9
Test Results 
Analyzer Plugin: 0.2.1

### Nodo de Jenkins ###
          	 SO: Mac OS 10.10.5
       	  XCode: 7

### Proyecto iOS 9 ###
       Lengueje: Swift
```

## Paso Uno – Instalar plugins a Jenkins.



## Reflexiones finales


### Revisiones significativas

* <a href="https://wiki.jenkins-ci.org" target="_blank">Sitio oficial de Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin" target="_blank">Plugin XCode para Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin" target="_blank">Plugin JUnit para Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/Test+Results+Analyzer+Plugin" target="_blank">Plugin Test Results Analyzer para Jenkins.</a>
---
layout: post
title: Gestión de Configuración Tendencias Junio 2015
---

Las **_tendencias_** en la **_disciplina de Gestión de Configuración_** permiten enfocar y redefinir los **_estándares_** establecidos hasta el momento en los **_entornos de trabajo_**.

### Introducción
El **_proceso de Gestión de Configuración de Software_** (GCS) debe garantizar las condiciones para que el desarrollo de software sea fácil. Una buena definición del proceso de _GCS_ hace posible que los programadores trabajen en equipo y de manera eficiente. El proceso incluye herramientas, patrones y estándares de uso propiamente definidos para la _GCS_.

El presente escrito muestra el estado de algunas herramientas que apoyan la _GCS_.

## Actividades de la Gestión de Configuración

La definición clásica de actividades descritas por **_Roger S. Presman_** en su libro **_"Ingeniería de Software: Un enfoque práctico"_** son las siguientes:

* Identificación de configuración
* Control de cambios
* Estado de configuración
* Auditoría de configuración

Un poco más reciente, el autor **_Bob Aiello_** presenta en su libro **_"Configuration Management Best Practices"_** las siguientes actividades:

* Gestión de código fuente
* Ingeniería de construcción
* Configuración de entornos
* Control de cambios
* Ingeniería de lanzamiento o liberación
* Despliegue

Ambas definiciones son correctas a mi criterio, cada una con su enfoque. Durante el presente escrito se utilizarán las definiciones más recientes.

Cada actividad ha sido desglozada en secciones para poder ser más específico en las herramientas mostradas. Las gráficas mostradas fueron obtenidas del sitio de <a href="" target="_blank">Tendencias de Google</a> y de <a href="" target="_blank">StackoverFlow</a>.

## 1. Gestión de Código fuente
### 1.1 Sistema de control de versiones
**_Sistemas a analizados:_**
<a target="_blank" href="https://subversion.apache.org/">Subversion</a>, <a href="https://git-scm.com/" target="_blank">Git</a>, <a href="https://mercurial.selenic.com/" target="_blank">Mercurial</a>, <a href="http://www.nongnu.org/cvs/" target="_blank">CVS</a>
<img src="{{ site.baseurl }}/images/150619/subversion-mercurial-git.png" /><img src="{{ site.baseurl }}/images/150619/stackoverflow-versioncontrol-systems.png" />

**_Git_** muestra un mayor número de registro en ambas gráficas. Estos valores son el reflejo de la gran popularidad y aceptación que tiene este sistema de control de versiones.

### 1.2 Control de Roles y Usuarios
**_Git_** es el sistema de control de versiones más utilizado según las gráficas revisadas. Git no establece dentro de sus funcionalidades la gestión de permisos por roles y usuarios. Por tal motivo se adoptan estos sistemas, para garantizar la seguridad en los repositorios de código fuente.

**_Sistemas analizados:_**
<a href="https://wiki.archlinux.org/index.php/Gitosis" target="_blank">Gitosis</a>, <a href="http://gitolite.com/gitolite/index.html">Gitolite</a>

<img src="{{ site.baseurl }}/images/150619/gitolite-gitosis.png"/> <img src="{{ site.baseurl }}/images/150619/stackoverflow-gitolite-gitosis.png"/>

**_Gitolite_** cuenta con mayores registros al realizar el análisis. El gran nivel de granularidad de este sistemas lo convierte en una poderosa herramienta cuando se desea establecer la seguridad de los repositorios de código fuente.

### 1.3 Flujo de Trabajo
**_Git-flow_** establece la metodología recomendada para el uso de **_Git_**. El flujo de trabajo se adapta sin dificultades a diversos equipos y proyectos sin importar su tamaño o ubicación. Para mayor información de este flujo se debe revisar el <a target="_blank" href="http://nvie.com/posts/a-successful-git-branching-model/">siguiente enlace</a>: 
<img src="{{ site.baseurl }}/images/150619/git-flow.png"/>

### 1.4 Herramientas de Interfaz
**_Herramientas visuales a analizar:_**
Las herramientas visuales ayudan a la gestión del código fuente garantizando altos niveles de usabilidad con relación el sistema **_Git_**. Estas herramientas permiten que todos los usuarios puedan utilizar de forma simple las bondades que brinda el sistema de control de versiones. De igual forma mejora el proceso de integración en el equipo de trabajo.

* <a href="https://windows.github.com/" target="_blank">GitHub for Windows</a> de GitHub.
* <a href="https://mac.github.com/" target="_blank">GitHub for Mac OS X</a> de GitHub.
* <a href="https://www.sourcetreeapp.com/" target="_blank">SourceTree</a> de Atlassian.
* <a href="http://www.gitboxapp.com/" target="_blank">Gitbox</a>
* <a href="http://www.git-tower.com/" target="_blank">Tower</a> utilizada por Google, Apple, Salesforce, Adobe, Amazon, Ebay, Yahoo ...
* <a href="http://www.git-tower.com/" target="_blank">SmartGit</a>
* <a href="http://git-cola.github.io/" target="_blank">Git-cola</a>
* <a href="http://www.collab.net/products/giteye" target="_blank">GitEye</a>
* <a href="http://www.gittiapp.com/" target="_blank">Gitti</a>
* <a href="http://rowanj.github.io/gitx/" target="_blank">GitX-dev</a>

Mi recomendación es utilizar la herramienta **_SourceTree_**. Las principales características que dan peso a mi desición son: 

* Interfaz de usuario intuitiva fácil e intuitiva.
* Integración de **_Git-Flow_** como propuesta de flujo de trabajo.
* Integración con sistemas externos y ejecución de scripts.

**_Sitios de referencia revisados durante la búsqueda:_**
[10 Sitios de Referencia](http://www.freshtechtips.com/2015/03/git-client-windows-mac-linux.html), [Clientes para Mac OS X](http://www.slant.co/topics/465/~what-are-the-best-git-clients-for-mac-os-x).

## 2 Ingeniería de construcción

### 2.1 Herramientas de construcción
Las herramientas de construcción permiten orquestar los sistemas de compilación para generar productos de software. 

**_Herramientas a analizar:_**
<a href="http://www.gnu.org/software/make/" target="_blank">Make</a>, <a href="http://ant.apache.org/" target="_blank">Ant</a>, <a href="http://www.scons.org/" target="_blank">Scons</a>, <a href="www.cmake.org/" target="_blank">CMake</a>, <a href="https://maven.apache.org/" target="_blank">Maven</a>, <a href="https://gradle.org/" target="_blank">Gradle</a>

<img src="{{ site.baseurl }}/images/150619/make-ant-maven.png"/><img src="{{ site.baseurl }}/images/150619/stackoverflow-buildtools.png"/>

**_Maven_** cuenta desde hace algún tiempo con el mayor índice de popularidad. De todas formas recomiendo no perder de vista a **_Gradle_** la cual ha incrementado mucho los índices en los últimos años.

## 3 Configuración del Entorno

Esta área depende mucho del proyecto a utilizar y de las características de cada grupo de desarrollo. Por tal motivo no se le ha realizado el mismo análisis que al resto.

## 4 Control de Cambios
### 4.1 Gestión de proyectos
En esta área se han analizado los sistemas de gestión de proyectos.

**_Herramientas a analizar:_**
<a href="http://www.redmine.org/" target="_blank">Redmine</a>, <a href="https://www.atlassian.com/software/jira" target="_blank">Jira</a>, <a href="https://www.visualstudio.com/en-us/downloads/visual-studio-2015-downloads-vs" target="_blank">Visual Studio Team Foundation Server 2015 RC</a>

<img src="{{ site.baseurl }}/images/150619/redmine-jira-tfs.png"/>
<img src="{{ site.baseurl }}/images/150619/stackoverflow-jira-redmine-tfs.png"/>

## 5 Ingeniería de Liberación
### 5.1 Sistemas de integración contínua
Los sistemas de integración contínua permiten, entre otras muchas actividades, la ejecución de las siguientas tareas: construcciones nocturnas, pruebas de integración, generación de documentación, análisis estadístico del código, generación de reportes.

**_Herramientas a evaluar:_**
<a href="http://cruisecontrolrb.thoughtworks.com/documentation" target="_blank">CruiseControl</a>, <a href="http://hudson-ci.org/" target="_blank">Hudson</a>, <a href="https://jenkins-ci.org/" target="_blank">Jenkins</a>, <a href="https://www.atlassian.com/software/bamboo" target="_blank">Atlassian Bamboo</a>

<img src="{{ site.baseurl }}/images/150619/hudson-jenkins-bamboo.png"/><img src="{{ site.baseurl }}/images/150619/stackoverflow-ci-systems.png"/>

**_Jenkins_** muestra en las gráficas el mayor número de actividad. Este sistema cuanta con más de 40 000 plugins que permiten la integración sistemas externos.

## Despliegue
Docker
VGrant
Git-FTP
FileZila

#### Reflexiones finales


#### Revisiones significativas
* BOB, A. (2011): Configuration Management Best Practices. Practical Methods that work in the real world. Addison-Wesly.
* PETER, S (2011): Software Build Systems. Principles and Experience. Addison-Wesly.
* ROGER, S. P. (2005): Ingeniería de Software. Un enfoque práctico.
* STEVE, B. (2002): Software Configuration Patterns: Effective Teamwork, Practical Integration. Addison-Wesly.
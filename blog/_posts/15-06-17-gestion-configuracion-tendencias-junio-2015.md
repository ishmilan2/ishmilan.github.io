---
layout: post
title: Gestión de Configuración - Tendencias 2015
---

Las **_tendencias_** en la **_disciplina de Gestión de Configuración_** permiten enfocar y redefinir los **_estándares_** establecidos hasta el momento en los **_entornos de trabajo_**.

### Introducción
El **_proceso de Gestión de Configuración de Software_** (GCS) debe garantizar las condiciones para que el desarrollo de software sea fácil. Una buena definición del proceso de _GCS_ hace posible que los programadores trabajen en equipo y de manera eficiente. El proceso incluye herramientas, patrones y estándares de uso propiamente definidos para la _GCS_.

El presente documento muestra el estado de algunas herramientas que apoyan la _GCS_ a partir de los datos obtenidos de las siguientes fuentes: <a href="https://www.google.com/trends/explore" target="_blank">Tendencias de Google</a> y de <a href="http://stackoverflow.com/" target="_blank">StackOverflow</a>.

Las **_herramientas analizadas_** fueron seleccionadas a partir de mi experiencia de trabajo como **_Gestor de Configuración de Software_**. Nuevas herramientas podrán ser incluidas posteriormente.

## Actividades de la Gestión de Configuración

La definición clásica de actividades descritas por **_Roger S. Presman_** en su libro **_"Ingeniería de Software: Un enfoque práctico"_** son las siguientes:

* Identificación de configuración
* Control de cambios
* Estado de configuración
* Auditoría de configuración

Un poco más reciente, **_Bob Aiello_** presenta en su libro **_"Configuration Management Best Practices"_** las siguientes actividades:

* Gestión de código fuente
* Ingeniería de construcción
* Configuración de entornos
* Control de cambios
* Ingeniería de lanzamiento o liberación
* Despliegue

Ambas definiciones son correctas a mi criterio, cada una con su enfoque. En el presente documento se utilizarán las definiciones de **_Aiello_** para mostrar las herramientas analizadas según su actividad.

## 1. Gestión de Código Fuente
### 1.1 Sistema de control de versiones
**_Sistemas analizados:_**
<a target="_blank" href="https://subversion.apache.org/">Subversion</a>, <a href="https://git-scm.com/" target="_blank">Git</a>, <a href="https://mercurial.selenic.com/" target="_blank">Mercurial</a>, <a href="http://www.nongnu.org/cvs/" target="_blank">CVS</a>.

<img src="{{ site.baseurl }}/images/150619/subversion-mercurial-git-cvs.png" title="Sistemas de control de versiones - Google Trends" name="Sistemas de control de versiones - Google Trends" /><img src="{{ site.baseurl }}/images/150619/stackoverflow-versioncontrol-systems.png" title="Sistemas de control de versiones - StackOverflow" name="Sistemas de control de versiones - StackOverflow" />

**_Git_** muestra un mayor número de registro en ambas gráficas. Estos valores son el reflejo de la gran popularidad y aceptación que tiene este sistema de control de versiones. Dentro de las principales características de este sistema está la integridad de la información y su velocidad.

### 1.2 Control de Roles y Usuarios
**_Git_** es el sistema de control de versiones más utilizado según las gráficas revisadas. No obstante, Git no establece dentro de sus funcionalidades la gestión de permisos por roles y usuarios, por tal motivo se adoptan estos sistemas, para garantizar la seguridad en los repositorios de código fuente.

**_Sistemas analizados:_**
<a href="https://wiki.archlinux.org/index.php/Gitosis" target="_blank">Gitosis</a>, <a href="http://gitolite.com/gitolite/index.html" target="_blank">Gitolite</a>.

<img src="{{ site.baseurl }}/images/150619/gitolite-gitosis.png" title="Gitolite-Gitosis - Google Trends" name="Gitolite-Gitosis - Google Trends" /> <img src="{{ site.baseurl }}/images/150619/stackoverflow-gitolite-gitosis.png" title="Gitolite-Gitosis - StackOverflow" name="Gitolite-Gitosis - StackOverflow" />

**_Gitolite_** cuenta con mayores registros al realizar el análisis. El gran nivel de granularidad de este sistemas lo convierte en una poderosa herramienta cuando se desea establecer la seguridad de los repositorios de código fuente.

### 1.3 Flujo de Trabajo
**_Git-flow_** establece la metodología recomendada para el uso de **_Git_**. El flujo de trabajo se adapta sin dificultades a diversos equipos y proyectos sin importar su tamaño o ubicación. Para mayor información de este flujo se debe revisar el <a target="_blank" href="http://nvie.com/posts/a-successful-git-branching-model/">siguiente enlace</a>: 
<img src="{{ site.baseurl }}/images/150619/git-flow.png" title="Git-Flow" name="Git-Flow" />

### 1.4 Herramientas de Interfaz
**_Herramientas visuales analizadas:_**
Las herramientas visuales ayudan a la gestión del código fuente garantizando altos niveles de usabilidad con relación al sistema **_Git_**. Estas herramientas permiten que todos los usuarios puedan utilizar de forma simple las bondades que brinda el sistema de control de versiones. De igual forma mejora el proceso de integración en el equipo de trabajo.

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

**_Tower_** y **_SourceTree_** son las herramientas que recomiendo. Las principales características que dan peso a mi decisión son: 

* Interfaz de usuario fácil e intuitiva.
* Integración de **_Git-Flow_** como propuesta de flujo de trabajo.
* Integración con sistemas externos y ejecución de scripts.

**_Sitios de referencia revisados durante la búsqueda:_** <a href="http://www.freshtechtips.com/2015/03/git-client-windows-mac-linux.html" target="_blank">10 Sitios de Referencia</a>, <a href="http://www.slant.co/topics/465/~what-are-the-best-git-clients-for-mac-os-x" target="_blank">Clientes para Mac OS X</a>.

## 2 Ingeniería de Construcción

### 2.1 Herramientas de construcción
Las herramientas de construcción permiten organizar las dependencias y ejecutar las tareas necesarias para lograr crear el producto de software final.

**_Herramientas analizadas:_**
<a href="http://www.gnu.org/software/make/" target="_blank">Make</a>, <a href="http://ant.apache.org/" target="_blank">Ant</a>, <a href="http://www.scons.org/" target="_blank">Scons</a>, <a href="http://www.cmake.org/" target="_blank">CMake</a>, <a href="https://maven.apache.org/" target="_blank">Maven</a>, <a href="https://gradle.org/" target="_blank">Gradle</a>.

<img src="{{ site.baseurl }}/images/150619/make-ant-maven.png" title="Sistemas de Construcción - Google Trends" name="Sistemas de Construcción - Google Trends" /><img src="{{ site.baseurl }}/images/150619/stackoverflow-buildtools.png" title="Sistemas de Construcción - StackOverflow" name="Sistemas de Construcción - StackOverflow" />

**_Maven_** cuenta desde hace algún tiempo con el mayor índice de popularidad. Las cifras están dadas en gran medida a la posibilidad de modelar, de forma sencilla, la lógica que se desea construir. Como sugerencia recomiendo no perder de vista a **_Gradle_**. Esta herramienta ha sido adoptada por equipos como Eclipse para realizar sus construcciones.

## 3 Configuración del Entorno

Esta área depende mucho del proyecto a utilizar y de las características de cada grupo de desarrollo. Por tal motivo no se le ha realizado el mismo análisis que al resto.

De manera general la intención es lograr establecer el mismo escenario en: _máquinas de pogramadores, servidores de pruebas y servidores de finales del producto_. Cada escenario debería tener configurado los mismos paquetes, dependencias y aplicaciones en aras de evitar errores durante la fase de testing y despliegue.

Como elementos recomendados se muestran 2 sistemas que ayudan estandarizar y compartir la configuración de los entornos de trabajo de manera rápida y confiable: <a href="https://www.docker.com/">Docker</a> y <a href="https://www.vagrantup.com/">Vagrant</a>.

<img src="{{ site.baseurl }}/images/150619/docker-vagrant.png" title="Docker-Vagrant - Google Trends" name="Docker-Vagrant - Google Trends" /><img src="{{ site.baseurl }}/images/150619/stackoverflow-docker-vagrant.png" title="Docker-Vagrant - StackOverflow" name="Docker-Vagrant - StackOverflow" />

**_Docker_** muestra mayores índices en las gráficas analizadas. _Docker_ viene siendo un sistema de control de versiones a nivel de sistema operativo. _Docker_ utiliza la filosofía de _Git_ pero a más bajo nivel. Si le gusta _Git_ le gustará adoptar _Docker_. Recomiendo darle un vistaso a esta herramienta.

## 4 Control de Cambios
### 4.1 Gestión de proyectos
En esta área se han analizado los sistemas de gestión de proyectos.

**_Herramientas a analizar:_**
<a href="http://www.redmine.org/" target="_blank">Redmine</a>, <a href="https://www.atlassian.com/software/jira" target="_blank">Jira</a>, <a href="https://www.mantisbt.org/" target="_blank">Mantis BT</a>, <a href="http://trac.edgewall.org/" target="_blank">Trac</a>.

<img src="{{ site.baseurl }}/images/150619/redmine-jira-mantis-trac.png" name="Control de Cambios - Google Trends" title="Control de Cambios - Google Trends" />
<img src="{{ site.baseurl }}/images/150619/stackoverflow-jira-redmine-mantis-trac.png" name="Control de Cambios - StackOverflow" title="Control de Cambios - StackOverflow" />

**_Jira_** y **_Redmine_** muestran mayores niveles en las gráficas analizadas, ambos sistemas cuentan con excelentes características. En mi experiencia personal trabajando con _Redmine_ he identificado muy buena adaptación (a través de plugins) con el resto de los sistemas mencionados en el artículo.

## 5 Ingeniería de Liberación
### 5.1 Sistemas de integración continua
Los sistemas de integración continua permiten, entre otras muchas actividades, la ejecución de las siguientes tareas: construcciones nocturnas, pruebas de integración, generación de documentación, análisis estadístico del código, generación de reportes.

**_Herramientas a analizar:_**
<a href="http://hudson-ci.org/" target="_blank">Hudson</a>, <a href="https://jenkins-ci.org/" target="_blank">Jenkins</a>, <a href="https://www.atlassian.com/software/bamboo" target="_blank">Atlassian Bamboo</a>.

<img src="{{ site.baseurl }}/images/150619/hudson-jenkins-bamboo.png" title="Integración continua - Google Trends" name="Integración continua - Google Trends" /><img src="{{ site.baseurl }}/images/150619/stackoverflow-ci-systems.png" title="Integración continua - StackOverflow" name="Integración continua - StackOverflow" />

**_Jenkins_** muestra en las gráficas el mayor número de actividad. Este sistema cuanta con numerosos plugins que permiten la integración sistemas externos.

## 6 Despliegue
El despliegue de los sistemas puede realizarse de forma manual, semiautomatizada o completamente automatizada. Los despliegues automáticos frecuentemente se realizan utilizando herramientas de integración continua como las descritas en el epígrafe anterior.

Teniendo en cuenta las tendencias antes vistas _(Git, SourceTree, Git-Flow)_ recomendaría <a href="https://github.com/git-ftp/git-ftp" target="_blank">Git-FTP</a> para variantes semiautomatizadas. Esta herramienta fue descrita en el artículo <a href="../como-configurar-git-ftp-en-sourcetree">Cómo configurar Git-FTP en SourceTree</a> mostrando sus beneficios al proceso de **_GCS_**.

Las variantes de despliegue manual se realizan utilizando los clásicos clientes FTP, como por ejemplo <a href="https://filezilla-project.org/" target="_blank">FileZila</a>.
 

### Reflexiones Finales

Las tendencias en la **_GCS_** brindan una visión del comportamiento de los métodos, herramientas y patrones. En el presente trabajo se profundiza en las herramientas utilizadas en este proceso.

Los elementos de alta relevancia identificados dentro del estudio permiten establecer un entorno favorable al desarrollo de software. Un ejemplo de la combinación de estos sistemas se muestra en el artículo <a href="../modelo-gestion-configuracion-herramientas-codigo-abierto">Modelo de Gestión de Configuración con herramientas código abierto</a>. La **_colaboración y comunicación_** entre ellos es vital para el éxito del grupo.

Los grupos de trabajo deben realizar la selección de las herramientas según su entorno porque las variantes son muchas. Sin embargo, tener en cuenta estás gráficas durante la **_selección de herramientas para un entorno de desarrollo de software_** ayudará a elevar los **_niveles de productividad_** y se **_reducirán los errores_**.

### Revisiones significativas
* SHRIKRISHNA, H. (2015): Orchestrating Docker.
* JOHN, F. (2012): Jenkins The Definitive Guide.
* BOB, A. (2011): Configuration Management Best Practices. Practical Methods that work in the real world. Addison-Wesly.
* PETER, S (2011): Software Build Systems. Principles and Experience. Addison-Wesly.
* PAUL, M. (2007): Continuous Integration. Improving Software Quality
and Reducing Risk
* ROGER, S. P. (2005): Ingeniería de Software. Un enfoque práctico.
* STEVE, B. (2002): Software Configuration Patterns: Effective Teamwork, Practical Integration. Addison-Wesly.
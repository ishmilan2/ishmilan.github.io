---
layout: post
title: Integración continua combinando Jenkins, iOS 9 y XCode 7.
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

En el presente artículo se muestra cómo configurar un proyecto de iOS 9 dentro del flujo de integración continua utilizando el sistema Jenkins.

### Pre requisitos

Para realizar los pasos del artículo debera cumplir con los siguientes requerimientos:

* Tener instalado el sistema de **_Integración continua Jenkins_**.
* Tener instalado la herramienta de programación **_XCode 7_**.
* Desarrollar un proyecto en **_iOS 9_** con pruebas unitarias implementadas.

Si el sistema de **_Integración continua Jenkins_** lo tiene instalado en una máquina con sistema operativo distinto a Mac OS deberá además cumplir con lo siguiente:

* Tener una máquina con sistema operativo Mac 10.10.5.
* Configuar la máquina de sistema operativo Mac como **_Nodo en Jenkins_** para la ejecución de tareas. Este Nodo deberá tener instalado la herramienta **_XCode 7_**.

### Código fuente

En caso de no tener creardo un proyecto con estas características puede acceder al <a href="https://github.com/mmorejon/time-table" target="_blank">código utilizado en este artículo</a>.

## Entorno

La configuración del entorno donde fue desarrollado el artículo es la siguiente:

```
### Sistema de integración continua ###
             SO: Ubuntu 14.04
        Jenkins: 1.633
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

## Paso 1 - Instalar plugins a Jenkins.

**_Jenkins_** puede ser configurado para realizar la ejecución de pruebas a los proyectos en **_iOS 9_**. En el repositorio de Jenkins existe el **_plugin XCode integration_** que nos permitirá compilar el código fuente y ejecutar las pruebas implementadas.

El <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin" target="_blank">_plugin XCode integration_</a> realiza la ejecución de la pruebas y el resultado se escribe en un fichero con **_formato XML_** dentro del proyecto. Este fichero tiene la misma estructura que se obtiene cuando se realizan las pruebas con **_JUnit_**. Por tal motivo se va a utilizar el **_plugin JUnit de Jenkins_** para mostrar el resultado de las pruebas ejectuadas en el proyecto de **_iOS 9_** y poder emitir gráficos asociados al mismo.

Para instalarlos se realizan los siguientes pasos:

* Abrir Jenkins en el navegador web.
* Navegar por **_Administrar Jenkins_** > **_Administrar Plugins_**.
* Seleccionar el panel **_Todos los plugins_**.
* Filtrar **_Xcode integration_** y seleccionar el plugins para instalarlo. Repetir esta operación pero esta vez filtrando por **_JUnit Plugin_** y después para **_Test Results Analyzer Plugin_**.
*  Después de tener los tres plugins seleccionados se selecciona el botón **_Instalar sin Reiniciar_**.
*  Al terminar la instalación se tiene que **_reiniciar Jenkins_**.

Después de haber reiniciado el sistema se debe volver al área de administración de los plugins y verificar que se hayan instalado correctamente. También se debe revisar la versión instalada con la descrita en la sección Entorno.

## Paso 2 - Crear nueva tarea de Jenkins

Seleccionar **_Nueva Tarea_** en la página de inicio de Jenkins.
Llenar el campo **_Nombre de la Tarea_** con el valor que desee y seleccionar la opción **_Crear un proyecto de estilo libre_**.

En el ejemplo se ha puesto **_time-table_**.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/create-task.jpg" title="Crear nueva Tarea en Jenkins" name="Crear nueva Tarea en Jenkins" />

Después de creada la tarea se selecciona la opción **_Configuración_** para realizar los ajustes necesarios dentro de ella.

## Paso 3 - (Opcional) Ejecutar la tarea solamente en el nodo de Mac OS X

Si la máquina que tiene instalado el sistema operativo Mac 10.10.5 es un nodo de Jenkins se tiene restringir la ejecución de la tarea a este nodo solamente. 

Para lograrlo tiene que seleccionar la opción **_Restringir donde se puede ejecutar este proyecto_**.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/nodo-mac.jpg" title="Nodo Mac para Jenkins" name="Nodo Mac para Jenkins" />

## Paso 4 - Obtener el código del proyecto.

La obtención del código fuente tiene que ser configurada. En el artículo se utilzó el plugins de Git para obtener el código fuente desde un servidor local donde se encuentra publicado.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/source-code.jpg" title="Obtener código fuente en Jenkins" name="Obtener código fuente en Jenkins" />

## Paso 5 - Configurar el plugins de XCode.

Para adicionar las funcionalidades del plugins de XCode se da clic en el botón **_Adicionar un Nuevo Paso_** y se selecciona la opción **_XCode_**.

El plugins consta de cuatro secciones: General build settings, Code signing & OS X keychain options, Advanced Xcode build options y Versioning. En este artículo solo necesitaremos realizar ajustes en dos de ellos: **_General build settings_** y **_Advanced Xcode build options_**.

**_Sección General build settings_**

Se establece en el campo configuración al valor **_Debug_**. Por defecto el plugins establece el valor **_Release_**.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/general-build-settings.jpg" title="Sección General build settings" name="Sección General build settings" />

**_Sección Advanced Xcode build options_**

Se establece el esquema utilizado para realizar las pruebas. El campo **_Xcode Schema File_** es el encargado de almacenar este valor. En el ejemplo se estableció **_TimeTable_**.

El campo **_Custom xcodebuild arguments_** se utiliza para agregar elementos personalizados a la ejecución. En este caso es obligatorio escribir `test` para que realice la ejecución de pruebas.

De manera adicional se ha agregado el parámetro `-destination 'platform=iOS Simulator,name=iPhone 6,OS=9.0'` para que realice las pruebas en un dispositivo específico. En el ejemplo se utilizó **_iPhone 6_**.

Las configuraciones descritas en esta sección se muestran en la siguiente imagen.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/advance-xcode-build.jpg" title="Obtener código fuente en Jenkins" name="Obtener código fuente en Jenkins" />

## Paso 6 - Configurar el plugins de JUnit.

El plugins de JUnit es el encargado de mostrar los resultados de las pruebas realizadas en el proyecto. El **_plugins XCode_** genera un fichero `xml` dentro de la carpeta `test-reports` ubicado en la raiz del proyecto.

Lo importante es indicarle al **_plugins JUnit_** el lugar donde se encuentra este fichero para que lo interprete y no los muestre en la web de Jenkins.

Primero se da clic en el botón **_Añadir una acción_** y se selecciona la opción **_Publicar los resultados de test JUnit_**. Después se llena el campo Ficheros XML con los informes de tests con la ubicación del fichero `xml` generado por el plugins XCode.

La siguiente imagen muestra la configuración del plugins JUnit.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/junit-settings.jpg" title="Configuración plugins JUnit" name="Configuración plugins JUnit" />

Hasta es punto ha quedado configurada la tarea. Para registar los cambios se da clic en el botón **_Guardar_** al final de la pantalla.

## Paso 7 - Ejecutar tarea en Jenkins.

Se ejectua la tarea y se muestra las principales partes del script de resultado en la consola.
Se muestran las pantallas que lanza XCode.

Una vez terminadas las configuraciones se da clic al botón **_Construir ahora_** ubicado en la esquina superior izquierda para comenzar su ejecución. La ejecución puede terminar de manera exitosa o no dependiendo de las pruebas realizadas en el proyecto. 

Si se utiliza el código fuente para la ejecución se obtendrá un resultado exitoso. Durante el proceso la máquina utilizada (nodo) iniciará automáticamente el emulador de XCode para realizar las pruebas. El emulador mostrará la siguiente pantalla.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/screen.jpg" title="Emulador XCode" name="Emulador XCode" />

También puede ser consultada la consola de salida para esta tarea y revisar los resultados. A continuación mostraremos algunos fragmentos mostrados en la consola.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/output-console-01.jpg" title="Pantallas de Salida Jenkins 01" name="Pantallas de Salida Jenkins 01" />

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/output-console-02.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

## Paso 8 - Mostar los reportes.

Para revisar el estado de las pruebas realizadas se da clic en la tarea creada y se mostrará un gráfico de tendencias de resultados.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-01.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

Para obtener una vista detallada de los resultados se selecciona **_Últimos resultados de tests_**.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-02.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

**_Mostrar resultados utilizando el plugins Test Result Analyzer_**

Dar clic en la tarea y seleccionar el enlace **_Test Result Analyzer_**. 

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-analyzer-01.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

Seleccionar Get Build Reports y se mostrará una tabla con los resultados de las pruebas.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-analyzer-02.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

Si se desea mostar los resultados en gráficos se selecciona **_Generate Charts_** y aparecerá reportes similares a la siguiente imagen.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-analyzer-03.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />


## Reflexiones finales

### Revisiones significativas

* <a href="https://wiki.jenkins-ci.org" target="_blank">Sitio oficial de Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin" target="_blank">XCode Plugin para Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin" target="_blank">JUnit Plugin para Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/Test+Results+Analyzer+Plugin" target="_blank">Test Results Analyzer Plugin para Jenkins.</a>
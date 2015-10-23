---
layout: post_en
title: Continuous integration mixing Jenkins, iOS 9 and XCode 7.
permalink: /en/blog/continuous-integration-jenkins-ios9-xcode/
translate_es: /blog/integracion-continua-jenkins-ios9-xcode/
category: [article]
tags: [jenkins, xcode, ios9]
image: /images/banners/jenkins-og.jpeg
excerpt: <strong><em>Automate testing for iOS projects 9 is possible!!!</em></strong>. Delegating the execution of test cases to higher-performance machines <strong><em>simplifies the development process</em></strong>.
---

<img src="{{ site.baseurl }}/images/banners/jenkins-ios9.png" title="Jenkins, XCode 7 y iOS 9" name="Jenkins, XCode 7 y iOS 9" />

### Introduction

La ejecución de **_pruebas al código fuente_** es un eslabón fundamental durante el proceso de desarrollo de software. Realizar todas las pruebas a un sistema significa emplear gran cantidad de recursos durante su ejecución y en ocasiones las pruebas pueden tomar bastante tiempo en terminar.

El equipo de desarrollo pudiera ver entorpecido su trabajo si tiene que esperar por el resultado de todas las pruebas ejecutadas cada vez que termina una tarea. Para evitar esta situación se delega la actividad de revisión a **_sistemas de integración continua_** con mayores capacidades de procesamiento. Estos sistemas pueden ser configurados para realizar tareas en los horarios menos activos para maximizar el rendimiento. Una vez terminada la tarea el sistema envía las notificaciones del resultado a los usuarios interesados.

En el presente artículo se muestra cómo configurar un **_proyecto de iOS 9_** dentro del **_flujo de integración continua_** utilizando el sistema **_Jenkins_**.

## Who does it work?

**_Jenkins_** puede ser configurado para realizar la ejecución de pruebas a los proyectos en **_iOS 9_**. En el repositorio de Jenkins existe el **_plugin XCode integration_** que nos permitirá compilar el código fuente y ejecutar las pruebas implementadas.

El <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin" target="_blank">_plugin XCode integration_</a> realiza la ejecución de la pruebas y el resultado se escribe en un fichero con **_formato XML_** dentro del proyecto. El **_fichero XML_** generado tiene la misma estructura que se obtiene cuando se realizan las pruebas con **_JUnit_**. Por tal motivo se va a utilizar el <a href="https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin" target="_blank">_plugin JUnit de Jenkins_</a> para mostrar el resultado de las pruebas ejectuadas en el proyecto de **_iOS 9_**. El <a href="https://wiki.jenkins-ci.org/display/JENKINS/Test+Results+Analyzer+Plugin" target="_blank">_plugin Test Result Analyzer_</a> nos va a permitir mostar el resultados de los test en gráficos para un mejor entendimiento.

### Prerequisites

To realize article' steps you must complete the following requirements:

* Having <a href="https://jenkins-ci.org/" target="_blank">_Jenkins_</a> installed.
* Having  <a href="https://developer.apple.com/xcode/ide/" target="_blank">_XCode 7_</a> installed.
* Having an **_iOS 9_** project created with unit test implemented.

**_Jenkins_** is a cross platform system. However, if it have installed in a computer with a different operating system to **_Mac OS_** you must also include the following:

* Having a machine with operating system **_Mac OS 10.10.5_**.
* Configuring the **_Mac OS_** machine as **_Jenkins Node_** to execute jobs. 
* Having **_XCode 7_** installed in Mac OS machine.

### Source code

If you don't have an **_iOS 9_** project created, you can access to <a href="https://github.com/mmorejon/time-table" target="_blank">the source code used for the article</a>.

## Environment

The environment configuration used for this article is the following:

```
### Continuous Integration System ###
             OS: Ubuntu 14.04
        Jenkins: 1.631
   XCode Plugin: 1.4.9
   JUnit Plugin: 1.9
Test Results 
Analyzer Plugin: 0.2.1

### Jenkins Node ###
          	 OS: Mac OS 10.10.5
       	  XCode: 7

### Project iOS 9 ###
       Languege: Swift
```

## Step One – Install Jenkins' plugins.

You must follow these steps to install the plugins on Jenkins:

* Open Jenkins in your web browser.
* Navegate to **_Manage Jenkins > Manage Plugins_**.
* Select **_Available_** panel.
* Filter by **_Xcode integration_** and select it to install. Repeat this step using **_Junit Plugin_** and after **_Test Results Analyzer Plugin_**.
* Do click on button **_Install without restart_** after having the plugins selected.
* Do click on button **_Restart Jenkins_** when the installation is complete.

After restart you should go back to **_Manage Jenkins > Manage Plugins_** and verify that plugins were installed correctly. You should also verify the  plugins version with **_Environment_** section.

## Step Two – Create new Jenkins' job

Select **_New Item_** on Jenkins home page. After, fill the field **_Item name_** with the desired value and select **_Freestyle project_**.

En el ejemplo se ha puesto `time-table`.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/create-task-en.jpg" title="Creating Jenkins' job." name="Creating Jenkins' job." />

Después de creada la tarea se selecciona la opción **_Configuración_** para realizar los ajustes necesarios dentro de ella.

## Step Three – (Opcional) Ejecutar la tarea solamente en el nodo de Mac OS

Si la máquina que tiene instalado el sistema operativo Mac 10.10.5 es un nodo de Jenkins se tiene restringir la ejecución de la tarea a este nodo solamente. 

Para lograrlo tiene que seleccionar la opción **_Restringir donde se puede ejecutar este proyecto_**. En el ejemplo se estableció `Mac OS` para el nombre del nodo.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/nodo-mac-en.jpg" title="Nodo Mac para Jenkins" name="Nodo Mac para Jenkins" />

## Step Four – Get project's source code.

La obtención del código fuente tiene que ser configurada. En el artículo se utilzó el **_plugin de Git_** para obtener el código fuente desde un servidor local donde se encuentra publicado.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/source-code-en.jpg" title="Obtener código fuente en Jenkins" name="Obtener código fuente en Jenkins" />

## Step Five – Configure XCode Plugin.

Para adicionar las funcionalidades del plugins de XCode se da clic en el botón **_Adicionar un Nuevo Paso_** y se selecciona la opción **_XCode_**.

El plugins consta de cuatro secciones: _General build settings_, _Code signing & OS X keychain options_, _Advanced Xcode build options_ y _Versioning_. En este artículo solo necesitaremos realizar ajustes en dos de ellos: **_General build settings_** y **_Advanced Xcode build options_**.

**_Section General build settings_**

Se establece en el campo **_Configuration_** al valor `Debug`. Por defecto el plugin establece el valor `Release`.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/general-build-settings-en.jpg" title="Sección General build settings" name="Sección General build settings" />

**_Section Advanced Xcode build options_**

Se establece el esquema utilizado para realizar las pruebas. El campo **_Xcode Schema File_** es el encargado de almacenar este valor. En el ejemplo se estableció `TimeTable`.

El campo **_Custom xcodebuild arguments_** se utiliza para agregar elementos personalizados a la ejecución. En este caso es obligatorio escribir `test` para que realice la ejecución de pruebas.

De manera adicional se ha agregado el parámetro `-destination 'platform=iOS Simulator,name=iPhone 6,OS=9.0'` para que realice las pruebas en un dispositivo específico. En el ejemplo se configuró para **_iPhone 6_**.

Las configuraciones descritas en esta sección se muestran en la siguiente imagen.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/advance-xcode-build-en.jpg" title="Obtener código fuente en Jenkins" name="Obtener código fuente en Jenkins" />

## Step Six – Configure JUnit Plugin.

El plugin JUnit es el encargado de mostrar los resultados de las pruebas realizadas en el proyecto. El **_plugins XCode_** genera un fichero `xml` dentro de la carpeta `test-reports` ubicada en la raiz del proyecto.

Lo importante es indicarle al **_Plugin JUnit_** el lugar donde se encuentra este fichero para que lo interprete y no muestre los resultados en la web de Jenkins.

Primero se da clic en el botón **_Añadir una acción_** y se selecciona la opción **_Publicar los resultados de test JUnit_**. Después se llena el campo **_Ficheros XML con los informes de tests_** con la ubicación del fichero **_XML_** generado por el Plugin XCode.

La siguiente imagen muestra la configuración del Plugin JUnit.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/junit-settings-en.jpg" title="Configuración plugins JUnit" name="Configuración plugins JUnit" />

Hasta este punto ha quedado configurada la tarea. Para registar los cambios se da clic en el botón **_Guardar_** al final de la pantalla.

**_Pongamos en marcha la tarea!!!_** Todo ha quedado listo para ver el resultado de la configuración.

## Step Seven – Run Jenkins' task.

Una vez terminadas las configuraciones se da clic al botón **_Construir ahora_** ubicado en la esquina superior izquierda para comenzar su ejecución. La ejecución puede terminar de manera exitosa o no dependiendo de las pruebas realizadas en el proyecto. 

Si se utiliza el código fuente propuesto por el artículo para la ejecución se obtendrá un resultado exitoso. Durante el proceso la máquina utilizada (nodo) iniciará automáticamente el **_emulador de XCode_** para realizar las pruebas. El emulador mostrará la siguiente pantalla.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/screen.jpg" title="Emulador XCode" name="Emulador XCode" />

También puede ser consultada la **_consola de salida_** para esta tarea y revisar los resultados. A continuación mostraremos algunos fragmentos mostrados en la consola.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/output-console-01.jpg" title="Pantallas de Salida Jenkins 01" name="Pantallas de Salida Jenkins 01" />

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/output-console-02.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

## Step Eight – Show task's reports.

Para revisar el estado de las pruebas realizadas se da clic en la tarea creada y se mostrará un gráfico de tendencias de resultados.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-01-en.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

Para obtener una vista detallada de los resultados se selecciona **_Últimos resultados de tests_**.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-02-en.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

**_Mostrar resultados utilizando el plugins Test Result Analyzer_**

Dar clic en la tarea y seleccionar el enlace **_Test Result Analyzer_**. 

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-analyzer-01.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

Seleccionar **_Get Build Reports_** y se mostrará una tabla con los resultados de las pruebas.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-analyzer-02.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

Si se desea mostar los resultados en gráficos se selecciona **_Generate Charts_** y se mostrarán reportes similares a la siguiente imagen.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-analyzer-03.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

## Final Thoughts

**_Automatizar las pruebas_** para proyectos en **_iOS 9 es posible_**. Delegar la ejecución de casos de pruebas a máquinas de mayor rendimiento **_simplifica el proceso de desarrollo software_**. **_Jenkins_** permite configurar nuestro entorno de trabajo para obtener estas metas, **_solo nos queda hacerlo_**.

### Significant Revisions

* <a href="https://wiki.jenkins-ci.org" target="_blank">Jenkins Official Site.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin" target="_blank">XCode Plugin for Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin" target="_blank">JUnit Plugin for Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/Test+Results+Analyzer+Plugin" target="_blank">Test Results Analyzer Plugin for Jenkins.</a>
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

## Step Two – Create new Jenkins' job.

Select **_New Item_** on Jenkins home page. After, fill the field **_Item name_** with the desired value and select **_Freestyle project_**. We used `time-table` for the example.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/create-task-en.jpg" title="Creating Jenkins' job." name="Creating Jenkins' job." />

Once the job has been created, select **_Configuration_** option to realize required settings inside.

## Step Three – Executing the job on Mac OS Node.

If the machine with **_Mac OS_** operating system is a **_Jenkins' Node_** then the job must be restricted only for this Node.

To accomplish, you must select **_Restrict where this project can be run_** option. We used `Mac OS` as node name for the example.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/nodo-mac-en.jpg" title="Mac Node for Jenkins" name="Mac Node for Jenkins" />

## Step Four – Get project's source code.

The section **_Source Code Management_** must be configured. We used **_Git Plugin_** to get the source code from local server.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/source-code-en.jpg" title="Source Code Management in Jenkins" name="Source Code Management in Jenkins" />

## Step Five – Configure XCode Plugin.

To incorporate the functionalities of **_XCode Plugin_**  we do click on **_Add build step_** button and select **_Xcode_** option.

The plugin have four sections: _General build settings_, _Code signing & OS X keychain options_, _Advanced Xcode build options_ and _Versioning_. In this article we are going to use only two of them: **_General build settings_** and **_Advanced Xcode build options_**.

**_General build settings Section_**

The **_Configuration_** field is set with `Debug` value. The plugin set the value `Release` by default.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/general-build-settings-en.jpg" title="General build settings Section" name="General build settings Section" />

**_Advanced Xcode build options Section_**

The scheme where the tests are performed must be established. The **_Xcode Schema File_** field is responsible for storing this value. We set `TimeTable` for the example.

The field **_Custom xcodebuild arguments_** is used to add custom elements to the execution. In this case, writing `test` is required to execute the tests of the project.

The `-destination` parameter has been also added to perform tests on a specific device. The example has been configurated for **_iPhone 6_** and the text for this device is the following: `-destination 'platform=iOS Simulator,name=iPhone 6,OS=9.0'`.

In this section, the described configurations are shown in the following image.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/advance-xcode-build-en.jpg" title="Custom xcodebuild arguments" name="Custom xcodebuild arguments" />

## Step Six – Configure JUnit Plugin.

JUnit plugin is the responsible to show the results of executed tests in the project. XCode plugin generete a file `xml` into the folder `test-reports` located in the root of project.

JUnit plugin has to be configurated to interpret the file xml generated by XCode plugin. The results are shown on Jenkins web.

Primero se da clic en el botón **_Añadir una acción_** y se selecciona la opción **_Publicar los resultados de test JUnit_**. Después se llena el campo **_Ficheros XML con los informes de tests_** con la ubicación del fichero **_XML_** generado por el Plugin XCode.

La siguiente imagen muestra la configuración del Plugin JUnit.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/junit-settings-en.jpg" title="Configuración plugins JUnit" name="Configuración plugins JUnit" />

Hasta este punto ha quedado configurada la tarea. Para registar los cambios se da clic en el botón **_Guardar_** al final de la pantalla.

**_Pongamos en marcha la tarea!!!_** Todo ha quedado listo para ver el resultado de la configuración.

## Step Seven – Run Jenkins' job.

Una vez terminadas las configuraciones se da clic al botón **_Construir ahora_** ubicado en la esquina superior izquierda para comenzar su ejecución. La ejecución puede terminar de manera exitosa o no dependiendo de las pruebas realizadas en el proyecto. 

Si se utiliza el código fuente propuesto por el artículo para la ejecución se obtendrá un resultado exitoso. Durante el proceso la máquina utilizada (nodo) iniciará automáticamente el **_emulador de XCode_** para realizar las pruebas. El emulador mostrará la siguiente pantalla.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/screen.jpg" title="Emulador XCode" name="Emulador XCode" />

También puede ser consultada la **_consola de salida_** para esta tarea y revisar los resultados. A continuación mostraremos algunos fragmentos mostrados en la consola.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/output-console-01.jpg" title="Pantallas de Salida Jenkins 01" name="Pantallas de Salida Jenkins 01" />

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/output-console-02.jpg" title="Pantallas de Salida Jenkins 02" name="Pantallas de Salida Jenkins 02" />

## Step Eight – Show job's reports.

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
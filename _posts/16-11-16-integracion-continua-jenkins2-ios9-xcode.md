---
layout: post
title: Construya Su Pipeline En Jenkins 2.0 como Código con iOS9 y XCode7.
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

Ya puedes definir tus procesos de CI/CD como si fuera código fuente con Jenkins 2.0 en tus proyectos de iOS 9. Compilar, pruebas, code coverage, check style, reportes 
y notificaciones son actividades descritas en un solo fichero.

### Explicar cómo funciona

Siempre ha sido una meta poder definir nuestros procesos de Integración Continua y Despliegue Continuo de manera tal que puedan ser documentados, descritos y modificados fácilmente.

Jenkins a apoyado esta filosofía de trabajo al incluir el fichero `Jenkinsfile` junto al grupo de módulos <a target="_blank" href="https://jenkins.io/doc/book/pipeline/">Pipeline</a>. El fichero `Jenkinsfile` se utiliza para describir la secuencia de pasos que va a realizar el sistema a través de los módulos Pipeline. La información existente en el sitio <a target="_blank" href="https://jenkins.io/solutions/pipeline/">Jenkins.io</a> puede ser consultada para profundizar los detalles.

### Time Table: An example project

Time Table es un proyecto de ejemplo para mostar como podemos estructurar nuestro proceso de CI/CD para un proyecto en iOS 9.

### Source Code

El código fuente puede ser <a target="_blank" href="https://github.com/mmorejon/time-table">descargado o clonado desde Github</a>.

## Configurando Jenkinsfile

A continuación le mostramos el código que usted necesita incluir en su proyecto para configurar su pipeline completamente. Cree un fichero en la raíz de su proyecto llamado 
`Jenkinsfile` y `copie - pegue` el código que aparece a continuación. Si esto es lo que usted necesitaba, aquí va:

```
node('iOS Node') {

    stage('Checkout/Build/Test') {

        // Checkout files.
        checkout([
            $class: 'GitSCM',
            branches: [[name: 'master']],
            doGenerateSubmoduleConfigurations: false,
            extensions: [], submoduleCfg: [],
            userRemoteConfigs: [[
                name: 'github',
                url: 'https://github.com/mmorejon/time-table.git'
            ]]
        ])

        // Build and Test
        sh 'xcodebuild -scheme "TimeTable" -configuration "Debug" build test -destination "platform=iOS Simulator,name=iPhone 6,OS=9.3" -enableCodeCoverage YES | /usr/local/bin/xcpretty -r junit'

        // Publish test restults.
        step([$class: 'JUnitResultArchiver', allowEmptyResults: true, testResults: 'build/reports/junit.xml'])
    }

    stage('Analytics') {
        
        parallel Coverage: {
            // Generate Code Coverage report
            sh '/usr/local/bin/slather coverage --jenkins --html --scheme TimeTable TimeTable.xcodeproj/'
    
            // Publish coverage results
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'html', reportFiles: 'index.html', reportName: 'Coverage Report'])
        
            
        }, Checkstyle: {

            // Generate Checkstyle report
            sh '/usr/local/bin/swiftlint lint --reporter checkstyle > checkstyle.xml || true'
    
            // Publish checkstyle result
            step([$class: 'CheckStylePublisher', canComputeNew: false, defaultEncoding: '', healthy: '', pattern: 'checkstyle.xml', unHealthy: ''])
        }, failFast: true|false   
    }
}
```
<br>

## Comprendiendo Jenkinsfile  

Especificar el nodo

```
node('iOS Node') {	
	......
}
```
El nodo de Jenkins tiene que tener sistema operativo Mac OS con XCode 7.
<br><br>

Definición de trabajos

Tareas realizadas de manera secuencia: checkout code, build and test.

```
stage('Checkout/Build/Test') {
	......
}
```

Tareas a realizase en paralelo: code coverage and check style

```
stage('Analytics') {

	parallel Coverage: {
		......
	}, Checkstyle: {
		......
	}, failFast: true|false

}
```

Jenkins agrupa las tareas en `stage`. Las tareas pueden ser ejecutadas de manera secuencial o en paralledo según sea el caso. El fichero `Jenkinsfile` muestra ambos ejemplos.
<br><br>

Checkout source code

```
// Checkout files.
checkout([
    $class: 'GitSCM',
    branches: [[name: 'master']],
    doGenerateSubmoduleConfigurations: false,
    extensions: [], submoduleCfg: [],
    userRemoteConfigs: [[
        name: 'github',
        url: 'https://github.com/mmorejon/time-table.git'
    ]]
])
```

El Pipeline SCM Step Plugin es el encargado de obtener el código fuente del repo de GitHub.
<br><br>

Build and test

```
// Build and Test
sh 'xcodebuild -scheme "TimeTable" -configuration "Debug" build test -destination "platform=iOS Simulator,name=iPhone 6,OS=9.3" -enableCodeCoverage YES | /usr/local/bin/xcpretty -r junit'
```

Para compilar el proyecto se utiliza la herramienta `xcodebuild`. El resto de los parámetros son ajustado según los datos del proyecto.

Durante la ejecución de los test `xcpretty` se responsabiliza de transformarlos a un fichero estandar de Junit para ser consultados posteriormente. El fichero se genera en la dirección `build/reports/junit.xml`.

Necesita tener instalado <a target="_blank" href="https://github.com/supermarin/xcpretty">Xcpretty</a> para poder obtener los reportes de prebas.
<br><br>

Publish test results

```
// Publish test restults.
step([$class: 'JUnitResultArchiver', allowEmptyResults: true, testResults: 'build/reports/junit.xml'])
```

El <a target="_blank" href="https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin">Plugin JUnit</a> es el responsable de mostar los resultados de las pruebas.

Necesita tener instalado el <a target="_blank" href="https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin">Plugin JUnit</a> para poder publicar los reportes de pruebas.
<br><br>

Code Coverage

```
// Generate Code Coverage report
sh '/usr/local/bin/slather coverage --jenkins --html --scheme TimeTable TimeTable.xcodeproj/'
```

Para generar el reporte de coverage se utiliza <a target="_blank" href="https://github.com/SlatherOrg/slather">Slather</a>. Slather puede ser parametrizado para obtener el reporte en formato `html` en la ubicación `./html/index.html`

Necesita tener instaldo <a target="_blank" href="https://github.com/SlatherOrg/slather">Slather</a> para poder generar este reporte.
<br><br>

Publish code coverage report

```
// Publish coverage results
publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'html', reportFiles: 'index.html', reportName: 'Coverage Report'])
```

El <a target="_blank" href="https://wiki.jenkins-ci.org/display/JENKINS/HTML+Publisher+Plugin">Plugin HTML Publisher</a> se utiliza para publicar el reporte de coverage.

Necesita tener instaldo el <a target="_blank" href="https://wiki.jenkins-ci.org/display/JENKINS/HTML+Publisher+Plugin">Plugin HTML Publisher</a> para utilizar esta funcionalidad.
<br><br>

Generate checkstyle report

```
// Generate Checkstyle report
sh '/usr/local/bin/swiftlint lint --reporter checkstyle > checkstyle.xml || true'
```

<a target="_blank" href="https://github.com/realm/SwiftLint">SwiftLint</a> se ha utilizado para evaluar el estilo de código. El reporte es generado utilizando el formato `checkstyle` y se almacena el el fichero `checkstyle.xml`.

Necesita tener instalado <a target="_blank" href="https://github.com/realm/SwiftLint">SwiftLint</a> para utilizar esta funcionalidad.
<br><br>

Chechstyle publisher report

```
// Publish checkstyle result
step([$class: 'CheckStylePublisher', canComputeNew: false, defaultEncoding: '', healthy: '', pattern: 'checkstyle.xml', unHealthy: ''])
```

El <a target="_blank" href="https://wiki.jenkins-ci.org/display/JENKINS/Checkstyle+Plugin">Checkstyle Plugin</a> se ha utilizado para mostrar los reportes de estilo de código. Se utliza el fichero `checkstyle.xml` generado por <a target="_blank" href="https://github.com/realm/SwiftLint">SwiftLint</a>.
<br><br>

## Setting up Jenkins job

Crear nuevo trabajo

Crea un nuevo trabajo en Jenkins. Coloque el nombre de `time-table`, seleccione la opción **Pipeline** y de clic en el botón **OK**.
<br><br>

Configure los datos del Pipeline

Los datos relacionados con el módulo Pipeline deben quedar como muestra la imagen.

```
      Definition: Pipeline script from SCM
             SCM: Git
    Repositories: https://github.com/mmorejon/time-table.git
Branch Specifier: master
     Script Path: Jenkinsfile
```

<img src="{{ site.baseurl }}/images/jenkins2-pipeline-ios9-xcode/jenkins-pipeline-configuration.jpg" title="Jenkins 2.0 Pipeline Configuration" name="Jenkins 2.0 Pipeline Configuration" />

<br><br>

## Build Job

Ejecute el trabajo en Jenkins y podrá obtener resultados similares a las imágenes que se muestran a continuación.

Jenkins traditional UI

<br><br>

Jenkins Blue Ocean UI


## Conclusiones

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

## Comprendiendo Jenkinsfile

*Especificar el nodo de Jenkins que va a ejecutar las tareas*

```
node('iOS Node') {	
	......
}
```
El nodo de Jenkins tiene que tener sistema operativo Mac OS con XCode 7.


*Definición de trabajos*

Jenkins agrupa las tareas en `stage`. Las tareas pueden ser ejecutadas de manera secuencial o en paralledo según sea el caso. El fichero `Jenkinsfile` muestra ambos ejemplos.

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


Requisitos para su funcionamiento

Conclusiones

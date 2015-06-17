---
layout: post
title: Modelo de Gestión de Configuración con herramientas código abierto 
---

Las **herramientas de código abierto** permiten establecer un **Modelo de Gestión de Configuración de calidad**. Lo importante es lograr que **colaboren entre sí**.

### Introducción

La Gestión de Configuración (GC) establece un conjunto de tareas necesarias a implementar en la organización para garantizar la calidad del software. Cada tarea puede ser implementada de manera distinta según el proyecto en curso. Todo depende de las necesidades del grupo de trabajo, entorno de desarrollo y de la envergadura del proyecto.

En paralelo se encuentran las herramientas que apoyan en la implementación de las tareas de GC. Son muchas las herramientas que existes, sin embargo, las de código abierto no son siempre las seleccionadas debido a múltiples factores que serán mencionados en breve.

En el siguiente artículo se mostrará el **Modelo de integración de herramientas de código abierto**. El objetivo es garantizar una correcta implementación de las tareas de GC en un entorno de código abierto. Se expondrá un resumen de las actividades abarcadas, así como de su relación como el modelo propuesto.

El <a href="../gestion-configuracion-tendencias-junio-2015">análisis de tendencias de la GC</a> apoyan el uso de las herramientas mencionadas a continuación.

<img src="{{ site.baseurl }}/images/deploy-diagram-scm.png" />

## Áreas de la Gestión de Configuración

Se tienen identificadas cinco áreas estándares: _identificación, control de versiones, control de cambios, auditoría de configuración y generación de informes_. Estas cinco áreas son las establecidas por la literatura clásica referente a la GC. Las mismas son esenciales en la comprensión de la Gestión de Configuración.

A continuación se detallan cada una de las áreas.

### Identificación

Se refiere a proveer con una identidad única y específica a cada **_artefacto_** que va a estar bajo el control de versiones. Los artefactos son el resultado del proceso de desarrollo de software (e.j., código fuente, binarios, ficheros de configuración, documentos). Cada artefacto identificado es conocido bajo el término de **_elemento de configuración (EC)_**.

### Control de versiones

Se refiere a la combinación de procedimientos y herramientas para crear registros permanentes de hitos durante el desarrollo de software. La sucesión de estos hitos es conocida como **_la línea base_** de tu código. El control de versiones también permite gestionar variantes del código para lograr establecer trabajos en paralelo, corrección de errores y distribución del desarrollo de forma global.

### Control de cambios

Se refiere al registro y seguimiento del estado de cada **_EC_** a través de su ciclo de vida. Es el proceso utilizado para preparar, evaluar, justificar e implementar tanto los cambios propuestos como las desviaciones de los **_EC_** en la **_línea base_**.

### Auditoría de configuración

Se refiere a la capacidad de poder examinar e identificar el estado de cada **_EC_** en cualquier momento que se desee. Permite realizar evaluaciones planificadas e independientes de uno o más productos o procesos para determinar la complacencia relacionada con un grupo de acuerdos.

### Generación de informes

Se refiere a la posibilidad, de forma práctica y legible, de gestionar la información necesaria para llevar el desarrollo de software. Hasta el momento el resto de las actividades mencionadas se encargan de crear, modificar o eliminar los **_EC_**, sin embargo, esta actividad mantiene a todo el personal interesado al tanto de los sucesos que van aconteciendo en el proyecto.

## Herramientas de código abierto en la Gestión de Configuración

Las herramientas de código abierto llevan consigo la sombra de una difícil configuración. También sucede en ocasiones que una sola herramienta no logra resolver el problema, por tal motivo, hay que instalar más de una. Al contar con varias herramientas existe la posibilidad que las configuraciones entre ellas no sean compatibles.

Elementos como los mencionadas hacen que el usuario o administrador del sistema prefiera adquirir sistemas de pago que cuenten con soluciones completas para su grupo de trabajo o empresa. Esta variante no es para nada incorrecta, _sencillamente es otra variante_. El inconveniente que tiene esta variante sería que: si el grupo o empresa es pequeño se estaría sobrecargando un flujo de trabajo con elementos no necesarios. La otra alternativa adoptada en ocasiones es no tener ningún tipo de herramientas, lo cual es aún peor.

La **_GC_** cuenta con un amplio número de herramientas a su disposición. Cada una con sus ventajas y desventajas. En esta ocasión se mostrará **_la integración de herramientas de código abierto_** que permiten apoyar el desarrollo de grupos de trabajo de menor, mediana y alta composición.

## Modelo de Gestión de Configuración con herramientas de código abierto

La imagen muestra el diagrama de despliegue de las herramientas de **_GC_**.

<img src="{{ site.baseurl }}/images/deploy-diagram-scm.png" />

**_Git_**

[Git](https://git-scm.com/) es un sistema gratuito y de código abierto de control de versiones distribuido diseñado para manejar todo, desde pequeños a grandes proyectos con rapidez y eficiencia.

Git garantiza la identificación y el control de cada **_EC_**. En **_Repositorios Git_** se encuentra el código fuente de todos los proyectos almacenados de forma centralizada. Los repositorios  contienen los registros de cada cambio aplicado a cada proyecto.

Los **_Repositorios Git_** son configurados para activar acciones de compilación, pruebas y despliegue en el servidor de Integración Continua Jenkins. Son configurados también para actualizar las tareas en Redmine que correspondan con el código fuente modificado. Se registran, para cada tarea que corresponda, los siguientes parámetros: el progreso, el estado y la horas dedicadas.

**_Gitolite_**

[Gitolite](http://gitolite.com/gitolite/index.html) permite configurar Git en un servidor central con control de acceso de grano fino.

Incorpora control de permisos por roles y usuarios en los **_Repositorios Git_**. Al agregar elementos de seguridad se garantiza tener el control de los cambios realizados en cada repositorio. Permite realizar auditorías en cada **_EC_**.

Todos los nodos descritos en el **_Modelo_** obtienen el código fuente de los **_Repositorios Git_** pasando por la capa de seguridad que ofrece Gitolite. De esta forma se evita el acceso de usuario no deseados al código de la organización o empresa.

**_Redmine_**

[Redmine](http://www.redmine.org/) es una aplicación web libre para la gestión de proyectos. Este sistema permite la gestión de múltiples proyectos, control de acceso basado en roles, seguimiento de tareas, calendario y diagramas de Gantt. Permite integrar al flujo de trabajo diferentes controles de versiones como Git, Subversion, Mercurial, Bazaar y Darcs. De igual forma incluye vistas de los repositorios y diferencias entre archivos. Redmine garantiza el envío de notificaciones por correo.

Redmine garantiza las áreas de **_identificación_**, **_control de cambios_**, **_auditoría de configuración_**, **_generación de informes_**. Brinda una vista global del estado de cada proyecto a todos los roles involucrados en el desarrollo de software (clientes, programadores, jefes, administrativos, etc). Permite darle seguimiento a cada cambio realizado en el producto final, desde el código hasta las liberaciones de versiones finales utilizando solamente el navegador web.

**_Jenkins_**

[Jenkins](https://jenkins-ci.org/) es un software de Integración continua de código abierto escrito en Java. Permite detectar errores durante el ciclo de vida del software. Cuenta con más de 400 plugins, se comunica con múltiples sistemas, construye y ejecuta un amplio número de pruebas.

Interviene en las áreas de **_identificación_**, **_auditoría de configuración_**, **_generación de informes_**. Incorpora al flujo de trabajo las actividades de compilación de código fuente, ejecución de pruebas y despliegue de los sistemas a entornos de desarrollo. Identifica de forma única cada compilación realizada. Emite alertas e informes después en cada actividad a los roles o personas interesadas dentro del flujo de trabajo. Utiliza los mismos usuarios definidos en Redmine para garantizar dentro de la organización una sola identidad por usuario.

### Reflexiones finales

No existe una fórmula para la creación de **_Modelos de Gestión de Configuración_**, simplemente existen variantes. La elección de las herramientas debe ser lo más ajustado posible a las necesidades del grupo de desarrollo.

Las herramientas **_Git, Gitolite, Redmine y Jenkins_** permiten establecer un entorno de trabajo donde queden cubiertas todas las áreas que establece la **_Gestión de Configuración_**.

### Revisiones significativas

- BOB, A. (2011): Configuration Management Best Practices. Practical Methods that work in the real world. Addison-Wesly.
- ROGER, S. P. (2005): Ingeniería de Software. Un enfoque práctico.
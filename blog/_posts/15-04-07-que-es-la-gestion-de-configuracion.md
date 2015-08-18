---
layout: post
title: ¿Qué es la Gestión de Configuración?
permalink: /blog/que-es-la-gestion-de-configuracion/
category: articulo
---

En el proceso de Ingeniería de Software (IS) existe una variable muy importante que entra en juego constantemente; **_el cambio_**.

La primera Ley de la ingeniería de sistemas establece: “Sin importar en qué momento del ciclo de vida del sistema nos encontremos, el sistema cambiará y el deseo de cambiarlo persistirá a lo largo de todo el ciclo de vida”.

Si se acepta que esta ley se cumple, entonces vale la pena identificar algunos factores que dan origen a este inevitable cambio dentro de los sistemas de software. Dentro de los ejemplos se puede encontrar:

* Nuevas necesidades de los clientes que requiere modificaciones en los datos del sistema.
* Nuevos requisitos o condiciones del negocio.
* Restricciones presupuestarias o de planificación que provocan una redefinición del sistema o
del producto.

Ya es un hecho que el cambio existe dentro del desarrollo de software, entonces existe una pregunta a contestar: __¿Qué hacer en relación a los cambios que van surgiendo?__ Para responder esta pregunta se puede empezar diciendo lo que sucedería de no prestarle interés al cambio, o en el peor de los casos, acumular una serie de cambios sin que sean analizados.

Comienza a aparecer confusión e incertidumbre dentro del equipo de trabajo. Empieza a aparecer de manera gradual especialistas que con el tiempo, se van haciendo insustituibles, porque ante la falta de documentación actualizada y coherente, son los únicos que se encuentran en capacidad de implementar cambios en los productos entregados. Otra de las dificultades es que empiezan a aparecer problemas de calidad en los productos ya desarrollados en etapas avanzadas del sistema. En otros casos no se logra mantener el ritmo de producción debido a que el personal asignado a tareas de desarrollo, también tiene
que atender a pedidos de mantenimiento o mejoramiento de productos terminados.

Todas las dificultades antes mencionadas pueden ser corregidas mediante técnicas de Gestión de Configuración de Software.

## ¿Qué es?

La Gestión de Configuración de Software (GCS) forma parte de los procesos que intervienen en el desarrollo de software. Son muchas las definiciones existentes sobre esta disciplina. Todo especialista que la ha definido ha aportado nuevos puntos de vista, así como tareas a tener en cuenta. En ocasiones, pudiera existir diferencias dentro de estos conceptos en cuanto a nombres o prioridades entre tareas a realizar, sin embargo, todos señalan la importancia de esta disciplina. Roger S. Pressman la definió de la siguiente manera:

“El arte de coordinar el desarrollo de software para minimizar la confusión se denomina gestión de configuración. La gestión de configuración es el arte de identificar, organizar y controlar las modificaciones que sufre el software que construye un equipo de programación. La meta es maximizar la productividad minimizando los errores”.

Otros autores la han definido como:

“La GCS es una disciplina de la ingeniería de software que comprende herramientas y técnicas
(procesos o metodología) que una compañía utiliza para manejar los cambios en sus software activos.“

La GCS abarca un ancho grupo de actividades y técnicas para iniciar, evaluar y controlar los cambios del producto de software durante y después del proceso de desarrollo. Haciendo énfasis en el control de la configuración dentro de la administración de producción de software. Dentro de sus principales funciones se encuentra el velar que exista: una documentación referente a los cambios realizados y productos que de alguna manera no ocasionen la ruptura de la integridad del software. De manera adicional, brinda garantía de la calidad del software, lo cual influye en todas las fases del proceso de IS.

El proceso de GCS debe garantizar las condiciones para que el desarrollo de software sea fácil. Una buena definición del proceso de GCS hace posible que los programadores trabajen en equipo y de manera eficiente. Aunque existen varias herramientas que pueden volver el proceso simple, las herramientas solas no son suficientes. Tienen que estar acompañadas de patrones y estándares de uso definidos propiamente para la GCS.

Con respecto a la interrelación del equipo, un correcto proceso de GCS permitirá entre otras cosas:

* Programadores trabajando juntos en un proyecto, compartiendo el mismo código fuente. Por
ejemplo, cuando un programador al trabajar con una clase derivada, necesita sincronizar con el
que se encuentra trabajando con la clase base porque el cliente necesita trabajar con la versión de la clase actualizada.

* Los programadores comparten el esfuerzo trabajando en el mismo módulo o simplemente en el
mismo fichero. Esto puede suceder cuando un programador tiene que continuar el trabajo
comenzado por otro porque en este momento el creador no se encuentra disponible para la tarea.

* Los programadores deben tener acceso a la versión estable del sistema. De esta manera
pudieran chequear durante procesos de integración, si su código funciona correctamente.

* La posibilidad de regresar a versiones estables anteriores del sistema.

Un efectivo programa de GCS, cuando es aplicado a los procesos de la organización, identifica que procesos deben ser documentados. Cualquier cambio en estos procesos tendrá su seguimiento y se documentará apropiadamente. De esta manera se reducirá en gran medida la dependencia de personas héroes en momentos críticos del sistema. Libera al equipo de sufrir frustraciones y problemas cuando uno de estos héroes no se encuentra disponible para realizar una tarea.

## ¿Qué no es?

Conocida la definición y alcance de la GCS, se puede tener una idea acerca del tema tratado en elpresente capítulo. Sin embargo, este conocimiento puede aumentar si se logra diferenciar la GCS de otros procesos existentes dentro del desarrollo de software.

En ocasiones la GCS es confundida con la fase de mantenimiento. El mantenimiento es un conjunto de actividades de ingeniería de software que se producen después de que el software se haya entregado al cliente y esté en funcionamiento. La gestión de configuración del software es el conjunto de actividades de seguimiento y control que comienzan cuando se inicia el proyecto de ingeniería de software y termina sólo cuando el software sale fuera de circulación.

La GCS no es simplemente controlar las versiones del software, ni tampoco un trabajo rutinario de oficina realizado sobre funciones dentro del desarrollo de software. Es una disciplina esencial dentro de las actividades diarias del desarrollo de software. Se encuentra presente en la definición de requerimientos, definiciones, codificación, compilación, pruebas y documentación del software.

## Reflexiones finales

El cambio es inevitable dentro del proceso de desarrollo de software. Estar preparados para el cambio y controlarlo es sinónimo de madurez para la organización.

### Revisiones significativas

* IEEE (1990): IEEE Standard for Software Configuration Management Plans. The Institute of Electrical and Electronics Engineers, Inc.
* CLAUDIO, J. R. (2003): Gestión de Configuración de Productos de Software en Etapa del Desarrollo.
* STEVE, B. (2004): Agile SCM – Patterns and Software Configuration Management.
* ROGER, S. P. (2005): Ingeniería de Software. Un enfoque práctico.
* LARS, B. (2005): Towards a Suite of Software Configuration Management Metrics.
* ALAN, K. (2007): Configuration Management The Good, the Bad and the Ugly.
* LAURA, W. (2007): High-level Best Practices in Software Configuration Management.
* LUCAS, D. O. A. (2007): Evolving a Software Configuration Management Ontology.
* GORDON, S. (2008): Handbook of Software Quality Assurance. Artech House.
* CAPERS, J. (2010): Software Engineering Best Practices. McGraw-Hill.
* CAROL, H. (2010): Evaluating Project Decisions.
* SEBASTIAN, N. (2011): The Future of Software Engineering. Springer.
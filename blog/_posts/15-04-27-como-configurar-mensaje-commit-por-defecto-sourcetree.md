---
layout: post
title: ¿Cómo configurar el mensaje del commit por defecto en SourceTree?
---

Escribir el mensaje de cada commit puede volverse tedioso cuando se realiza varias veces en el día. Este estado pudiera empeorar si perteneces a una organización que cuenta con políticas establecidas para estructurar los formatos de los mensajes.

En este artículo se mostrará cómo configurar los mensajes por defecto en la herramienta SourceTree.

## Introducción

Establecer un formato para los mensajes cada vez que se registra un cambio (commit) en el Sistema de Control de Versiones (SCV) es importante. No basta solamente con registrar el cambio, también hace falta que se realice con **calidad**.

Un SCV no es útil si no es posible realizar búsquedas de ficheros referente a una tarea concluida. De manera natural la mayoría de estos sistemas tienen incorporados búsquedas según fecha, ficheros, autor, entre otros. Sin embargo, la lógica de **por qué se ha realizado el cambio** queda reflejada solamente en el mensaje del registro.

Por tal motivo, el encargado de la Configuración de Software en un equipo debe garantizar la creación de plantillas. Las plantillas van a facilitar la creación de un commit porque contarán con la estructura establecida por el equipo o empresa.

## Herramienta SourceTree

**[SourceTree](http://sourcetreeapp.com/)** es un cliente libre para los SCV Git y Mercurial. Permite gestionar todos tus repositorios, tanto locales como remotos a través de una simple interfaz.

SourceTree simplifica el trabajo de equipos que utilizan SCV distribuidos. El aprendizaje es muy rápido y permite realizar acciones como clonar, crear y mezclar repositorio con un solo clic.

## Creación de la plantilla

La plantilla es un fichero de texto con el mensaje que se desea mostrar. Este mensaje debe estar pensado para que el programador complete los elementos necesarios como: tiempo invertido en los cambios realizados, tarea asociada a estos cambios, resumen de los cambios y descripción detallada de las actividades realizadas.

Se crea un fichero en la carpeta del usuario. Según el sistema operativo la dirección es la siguiente:

Mac: `/Users/<usuario>/`

Windows: `C:\Users\<usuario>\`

El fichero puede tener cualquier nombre. En esta guía le pondremos `.template.txt`.

Dentro del fichero se coloca el mensaje que se desea mostrar. Un ejemplo del mensaje sería el siguiente:

`(# @0:10) Escriba el resumen del mensaje ... `

Este mensaje corresponde con el formato utilizado por el sistema de gestión de proyectos **[Redmine](http://www.redmine.org)** . Este se utiliza para asociar un commit a una tarea y registrar en ella las horas empleadas.

## Configuración del SourceTree

La herramienta SourceTree crea en el directorio del usuario un fichero llamado `.gitconfig`. Este fichero tiene que ser editado para agregarle, en la sección del commit, la plantilla que va a utilizar como mensaje por defecto.

El contenido que debe ser agregado es el siguiente:

```
[commit]
	template=/Users/<usuario>/.template.txt
```

## Reflexiones finales

Escribir correctamente el mensaje al registrar cambios en un SCV es tan importante como el propio cambio. Permite realizar búsquedas asociadas a objetivos y se gana en claridad referente a la organización del repositorio.

### Revisiones significativas

* [SourceTree](http://sourcetreeapp.com/)
* STEVE, B. (2002): Software Configuration Patterns: Effective Teamwork, Practical Integration. Addison-Wesly. 
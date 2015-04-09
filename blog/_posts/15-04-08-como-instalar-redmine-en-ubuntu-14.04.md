---
layout: post
title: ¿Cómo instalar Redmine en Ubuntu 14.04?
---

El trabajo en equipo es una actividad necesaria durante el desarrollo de software. Cada miembro debe contribuir con sus habilidades y conocimientos en aras de alcanzar los objetivos propuestos. El éxito del grupo depende fundamentalmente de las habilidades de organización que tengan.

__Redmine__ es una aplicación web libre para la gestión de proyectos. Este sistema permite la gestión de múltiples proyectos, control de acceso basado en roles, seguimiento de tareas, calendario y diagramas de Gantt. Permite integrar al flujo de trabajo diferentes controles de versiones como Git, Subversion, Mercurial, Bazaar y Darcs. De igual forma incluye vistas de los repositorios y diferencias entre archivos. Redmine garantiza el envío de notificaciones por correo.

La arquitectura del sistema se basa en la extensión de sus funcionalidades a través de plugins. Esta característica permite incorporar a una amplia comunidad de desarrolladores que colaboran ampliando los beneficios brindados por Redmine. La aplicación web fue escrita utilizando el framework Ruby on Rails. Es multi-plataforma, permite la configuración para múltiples bases de datos y está disponible para 34 idiomas.

En esta guía vamos a hablar sobre cómo instalar Redmine en Ubuntu 14.04 para que pueda gestionar sus proyectos.

## Pre-requisitos

Antes de comenzar con esta guía usted debe tener la siguiente configuración.

Se asume que está utilizando un usuario que no es root y que cuenta con los privilegios `sudo`.

Una vez terminada este paso usted se encuentra listo para comenzar esta guia.

## Paso 1 - Descargar Redmine

El primer paso será descargar los ficheros del proyecto Redmine desde su sitio web.

El equipo de Redmine tiene organizados todas las vesiones liberadas en la misma carpeta `http://www.redmine.org/releases/`, por lo tanto podremos obtener la última versión de Redmine revisando los nombre de los ficheros. Podremos descargar la versión 3.0.1 escribiendo:

```
cd ~
wget http://www.redmine.org/releases/redmine-3.0.1.tar.gz
```

Esto va a descargar un fichero comprimido con los ficheros de Redmine hacia la ubicación raiz de nuestro usuario.

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
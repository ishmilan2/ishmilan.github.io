---
layout: post
title: PhpMyAdmin aumentar el tamaño de los ficheros a importar
permalink: /blog/phpmyadmin-aumentar-tamano-ficheros-importar/
category: configuracion
tags: [phpmyadmin]
---

El tamaño máximo del los ficheros que serán importados a phpMyAdmin puede ser modificado fácilmente.

### Problema

### Respuesta
Abrir el fichero `/etc/php5/apache2/php.ini`.

```
sudo nano /etc/php5/apache2/php.ini
```

Modificar las variables dependiendo del tamaño que necesite.

```
upload_max_filesize = 128M
post_max_size = 128M
```

### Entorno


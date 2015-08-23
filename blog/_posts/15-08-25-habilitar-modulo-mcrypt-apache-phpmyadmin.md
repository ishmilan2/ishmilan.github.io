---
layout: post
title: Habilitar módulo mcrypt en Apache - phpMyAdmin
permalink: /blog/habilitar-modulo-mcrypt-apache-phpmyadmin/
translate_en: /en/blog/enable-mcrypt-module-apache-phpmyadmin/
category: [configuracion]
tags: [phpmyadmin, apache2]
---

El tamaño máximo del los ficheros que serán importados a phpMyAdmin puede ser modificado fácilmente.

### Necesidad

Habilitar el **_módulo mcrypt_** en **_Apache2_** - **_phpMyAdmin_**.

### Entorno

```
 SO: Ubuntu 14.04
PHP: 5.5.9
```

### Solución

Abrir el fichero `/etc/php5/apache2/php.ini`.

```
sudo nano /etc/php5/apache2/php.ini
```

Buscar el texto `[mcrypt]` y escribir debajo `extension=mcrypt.so`. El fichero queda de la siguiente forma.

```
[mcrypt]
; For more information about mcrypt settings see http://php.net/mcrypt-module-open
extension=mcrypt.so
```

Reiniciar el servicio de Apache.

```
sudo service apache2 restart
```

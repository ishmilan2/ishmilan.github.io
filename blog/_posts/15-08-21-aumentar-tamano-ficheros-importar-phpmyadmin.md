---
layout: post
title: Aumentar el tamaño de los ficheros a importar en phpMyAdmin
permalink: /blog/aumentar-tamano-ficheros-importar-phpmyadmin/
translate_en: /en/blog/upload-max-file-size-import-phpmyadmin/
category: [configuracion]
tags: [phpmyadmin]
---

El **_tamaño máximo del los ficheros_** que serán importados a **_phpMyAdmin_** puede ser modificado fácilmente.

### Necesidad

Importar ficheros en phpMyAdmin de mayor tamaño.

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

Modificar las variables dependiendo del tamaño que se necesite.

```
upload_max_filesize = 128M
post_max_size = 128M
```

Reiniciar el servicio de Apache.

```
sudo service apache2 restart
```

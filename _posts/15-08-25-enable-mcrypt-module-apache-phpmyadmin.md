---
layout: post_en
title: Enable mcrypt module on Apache - phpMyAdmin
permalink: /en/blog/enable-mcrypt-module-apache-phpmyadmin/
translate_es: /blog/habilitar-modulo-mcrypt-apache-phpmyadmin/
lang: en
sidebar: yes
category: [configuration]
tags: [phpmyadmin, apache2]
---

Enable **_block algorithms_** such as DES, TripleDES, Blowfish (default), 3-WAY, SAFER-SK64, SAFER-SK128, TWOFISH, TEA, RC2 and GOST with **_mcrypt_**.

### Necessity

Enable **_mcrypt module_** on **_Apache_** - **_phpMyAdmin_**.

### Environment

```
 OS: Ubuntu 14.04
PHP: 5.5.9
```

### Solution

Open for edit `/etc/php5/apache2/php.ini` file.

```
sudo nano /etc/php5/apache2/php.ini
```

Find `[mcrypt]` text and write bellow `extension=mcrypt.so`. The file must look like this.

```
[mcrypt]
; For more information about mcrypt settings see http://php.net/mcrypt-module-open
extension=mcrypt.so
```

Restart Apache service.

```
sudo service apache2 restart
```

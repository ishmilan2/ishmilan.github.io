---
layout: post_en
title: How to authenticate client computers using OpenLdap on Ubuntu 14.04
permalink: /en/blog/how-to-authenticate-client-computers-using-openldap-on-ubuntu-14-04/
translate_es: /blog/como-registar-computadoras-clientes-utilizando-openldap-en-ubuntu-14-04/
lang: en
sidebar: yes
category: [configuration]
tags: [openldap, ubuntu]
image: /images/banners/docker-og.png
excerpt: Hola
---

<img src="{{ site.baseurl }}/images/banners/django-docker.png" title="Docker - Django" name="Docker - Django" />

## Necessity



## Environment

```
  OS: Ubuntu 14.04
Ldap: OpenLdap 
```

## Solution

Installing the following packages:

```
sudo apt-get update
sudo apt-get install libpam-ldap nscd sysv-rc-conf
```

Modifying the file `/etc/nsswitch.conf` in order to search the users into OpenLdap directory. You must **_add_** `ldap` at the end of each line.

```
passwd:        compat  ldap
group:         compat  ldap
shadow:        compat  ldap
```

Removing the text `use_authtok` from the following line located in the file `/etc/pam.d/common-password`. The line should stay like this:

```
password        [success=1 user_unknown=ignore default=die]     pam_ldap.so try_first_pass
```

Adding the following line at the end of the file `/etc/pam.d/common-session`.

```
session required    pam_mkhomedir.so skel=/etc/skel umask=0077
```

Activating the module `libnss-ldap` by typing:

```
sysv-rc-conf libnss-ldap on
```

Reboot the opetaing system

```
sudo reboot
```
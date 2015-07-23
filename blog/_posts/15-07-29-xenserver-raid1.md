---
layout: post
title: RAID1 XENSERVER 6.5 SCRIPT
---

adfa

### Introducción



## asdfasfas

Script para utilizar

```
# Prepara /dev/sdb eliminando su estructura de datos GPT.
sgdisk --zap-all /dev/sdb

# Convierte al disco de GPT a MBR
sgdisk --mbrtogpt --clear /dev/sdb

# Replicar la tabla de particiones desde /dev/sda hacia /dev/sdb. 
# /dev/sdb tiene tres particiones: /dev/sda1, /dev/sda2, /dev/sda3.
sgdisk -R /dev/sdb /dev/sda

# Establece el tipo código para cada partición. fd00 significa Linux RAID.
sgdisk --typecode=1:fd00 /dev/sdb
sgdisk --typecode=2:fd00 /dev/sdb
sgdisk --typecode=3:fd00 /dev/sdb

# Adiciona el módulo RAID al Kernel porque no se encuentra cargado por defecto.
modprobe md_mod

# Crea un nuevo arreglo con los metadatos del dispositivo: dos particiones en RAID1.
# Crea md0 (root), md1 (swap) y md2 (almacenamiento).
mdadm --create /dev/md0 --level=1 --raid-devices=2 --metadata=0.90 /dev/sdb1 missing
mdadm --create /dev/md1 --level=1 –-raid-devices=2 --metadata=0.90 /dev/sdb2 missing
mdadm --create /dev/md2 --level=1 --raid-devices=2 --metadata=0.90 /dev/sdb3 missing

# Crea el sistema de ficheros (SF) para root.
mkfs.ext3 /dev/md0

# Monta SF de root.
mount /dev/md0 /mnt

# Copia todos los ficheros de root hacia /mnt.
cp -xR --preserve=all / /mnt

# Genera la configuración del RAID en el fichero mdadm.conf
mdadm --detail --scan > /mnt/etc/mdadm.conf

# Actualiza el fichero fstab para establecer el nuevo dispositivo RAID.
# Se realiza cambiando toda la etiqueta LABEL por /dev/md0.
sed -i 's/LABEL=[a-zA-Z\-]*/\/dev\/md0/' /mnt/etc/fstab


```

## Reflexiones finales



### Revisiones significativas


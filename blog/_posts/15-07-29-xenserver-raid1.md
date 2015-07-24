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

# Falta descripcion
mount --bind /dev /mnt/dev
mount -t sysfs none /mnt/sys
mount -t proc none /mnt/proc

# Falta descripcion
chroot /mnt /sbin/extlinux --install /boot

dd if=/mnt/usr/share/syslinux/gptmbr.bin of=/dev/sdd

chroot /mnt

mkinitrd -v -f --theme=/usr/share/splash --without-multipath /boot/initrd-`uname -r`.img `uname -r`

exit

sed -i 's/LABEL=[a-zA-Z\-]*/\/dev\/md0/' /mnt/boot/extlinux.conf

cd /mnt && extlinux --raid -i boot/

sgdisk /dev/sdd --attributes=1:set:2

cd
umount /mnt/dev
umount /mnt/sys
umount /mnt/proc
umount /mnt
sync
reboot
```

Reinicia el sistema por el disco B. Esta configuración se realiza en el BIOS.

Una vez iniciado con el disco B se realizan los siguientes pasos:

```
sgdisk -R/dev/sda /dev/sdb

sgdisk /dev/sda --attributes=1:set:2

mdadm -a /dev/md0 /dev/sda1
mdadm -a /dev/md1 /dev/sda2
mdadm -a /dev/md2 /dev/sda3
```

## Reflexiones finales



### Revisiones significativas


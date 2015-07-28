---
layout: post
title: Configuración de XenServer 6.5 en RAID1 por Software
translate_en: /en/blog/configure-xenserver6.5-software-raid1/
---

Al configurar **_XenServer 6.5_** en **_RAID1 por Software_** se incorpora una **_plataforma de virtualización_** sin depender del hardware y se **_evita la pérdida de información_** por roturas de discos.

### Introducción

Las **_plataformas de virtualización_** permiten a los grupos de desarrollo convertir un servidor físico en muchos servidores virtuales. **_XenServer_** es una plataforma de virtualización de código abierto y constituye una muy buena alternativa para incorporarla en los **_grupos de desarrollo_**.

Cuando se configura un servidor físico en **_RAID1_** se crea una copia exacta de la información existente en el disco duro hacia otro con igual capacidad. Los discos se mantienen **_sincronizados en todo momento_** y se **_evita la pérdida de información_** en caso de posibles roturas.

La configuración de un servidor en **_RAID1_** puede ser muy costosa cuando se realiza por hardware. La alternativa a este problema es configurar el sistema en **_RAID1 por Software_**.

### Pre requisitos
Tener instalado **_XenServer 6.5_** sin crear un repositorio de almacenamiento (en inglés **_Storage Repository, SR_**). En los pasos a seguir se utiliza `/dev/sda` para el disco donde se realizó la instalación y `/dev/sdb` para el segundo con igual tamaño.

## Convertir XenServer 6.5 a RAID1 por Software.

Los pasos que se muestran a continuación pueden ser copiados y pegados en el terminal directamente.

```
# Prepara /dev/sdb eliminando su estructura de datos GPT.
sgdisk --zap-all /dev/sdb

# Convierte el disco de formato GPT a MBR
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

# Monta el directorio /dev en /mnt/dev permitiendo que sea accedido desde ambos lados.
# Monta el sistema de ficheros de tipo sysfs en /mnt/sys
# Monta el sistema de ficheros de tipo proc en /mnt/proc
mount --bind /dev /mnt/dev
mount -t sysfs none /mnt/sys
mount -t proc none /mnt/proc

# Cambia el root hacia /mnt para ejecutar el comando /sbin/extlinux para iniciar el sistema por /boot.
chroot /mnt /sbin/extlinux --install /boot

# Copia el fichero de salida a la partición /dev/sdb
dd if=/mnt/usr/share/syslinux/gptmbr.bin of=/dev/sdb

# Cambia la posición del root hacia /mnt.
chroot /mnt

# Crea una imagen del sistema de ficheros.
mkinitrd -v -f --theme=/usr/share/splash --without-multipath /boot/initrd-`uname -r`.img `uname -r`

# Regresa a la posición inicial de root.
exit

# Actualiza el fichero extlinux.conf para establecer el nuevo dispositivo RAID.
# Se realiza cambiando toda la etiqueta LABEL por /dev/md0.
sed -i 's/LABEL=[a-zA-Z\-]*/\/dev\/md0/' /mnt/boot/extlinux.conf

# Moverse a /mnt
# Ejecuta extlinux para iniciar por boot/ en modo raid.
cd /mnt
extlinux --raid -i boot/

# Establece a /dev/sdb como sección de arranque o inicio de sistema.
sgdisk /dev/sdb --attributes=1:set:2

# Moverse a la carpeta de root y desmontar dev, sys, proc y mnt.
cd
umount /mnt/dev
umount /mnt/sys
umount /mnt/proc
umount /mnt

# Sincroniza los datos del disco con la memoria dinámica y reinicia el sistema.
sync
reboot
```

Una vez ejecutados estos pasos se reinicia el sistema, pero garantizando que inicie por el disco B. El cambio de inicio se realiza en el BIOS de la máquina o en la selección del dispositivo de arranque.

Una vez iniciado el sistema con el disco B se realizan los siguientes pasos para completar la configuración.

```
# Realiza una réplica exacta de /dev/sdb hacia /dev/sda
sgdisk -R /dev/sda /dev/sdb

# Establece a /dev/sda como sección de arranque o inicio de sistema.
sgdisk /dev/sda --attributes=1:set:2

# Adiciona finalmente los dispositivos sda1, sda2 y sda3 a la estructura de RAID1 creada.
mdadm -a /dev/md0 /dev/sda1
mdadm -a /dev/md1 /dev/sda2
mdadm -a /dev/md2 /dev/sda3

# Si da error al intentar agregar sda3 es porque
# durante la instalación del XenServer activaste un SR (Storage Repository).
# Debes eliminarlo y después volver a ejecutar este paso.

# Reinicia el sistema
reboot
```

Una vez terminada la configuración del **_RAID1 por Software_** se debe crear un **_SR_**. Para esto se utiliza el comando `xe sr-create` junto con el `UUID` de tu servidor.

```
xe sr-create content-type=user device-config:device=/dev/md2 host-uuid=<UUID del host xenserver> name-label="RAID 1" shared=false type=lvm
```

## Reflexiones finales

Con la secuencia de pasos mostradas en el artículo se puede establecer una **_plataforma de virtualización utilizando XenServer 6.5_** sobre una estructura de **_RAID1 por Software_**.

Entre los beneficios que tiene establecer esta configuración están: 

- Protección de los datos cuando existen fallos físicos en los discos.
- Reducción de los gastos en hardware.
- Mayor aprovechamiento de los recursos físicos.
- Establecimiento de múltiples sistemas virtuales independientes a partir de una máquina física.

### Revisiones significativas
- Citrix Systems. (2015): Citrix XenServer ® 6.5 Administrator's Guide
- Gohar, A.(2013):Implementing Citrix XenServer Quickstarter
- Dan, K. (2011): Virtualization: A Manager’s Guide
- <a href="https://techblog.jeppson.org/2015/02/convert-xenserver-6-5-to-software-raid-1/" target="_blank">Technicus</a>
- <a href="http://xenserver.org/" target="_blank">XenServer</a>


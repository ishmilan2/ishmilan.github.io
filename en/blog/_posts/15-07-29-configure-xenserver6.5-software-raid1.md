---
layout: post_en
title: Configure XenServer 6.5 on Software RAID1
permalink: /en/blog/configure-xenserver6.5-software-raid1/
translate_es: /blog/configuracion-xenserver6.5-raid1-software/
category: [article]
tags: [xenserver, raid]
---

When configuring **_XenServer 6.5_** on **_Software RAID1_**, a **_virtualization platform_** is incorporated without depending on hardware and thus **_avoiding lost data_** by ruptured discs.

### Introduction

**_The virtualization platforms_** allow development groups convert one physical server into many virtual servers. **_XenServer_** is an **_open source virtualization platform_** and constitute a good choice for be adopted by **_developments groups_**.

When configuring a physical server in **_RAID1_** an exacto copy is created of the existing information in the hard disc to other with the same capacity. The discs stay **_synchronized all the time_** and thus **_avoiding lost information_** in case of ruptured discs.

Configuring a server in **_RAID1_** may be expensive when it's done by hardware. The alternative to this problem is configuring the system in **_Software RAID1_**.

### Prerequisites
Having **_XenServer 6.5_** installed without create a **_Storage Repository (SR)_**. On the steps to follow, `/dev/sda` are used for the disc where the instalation was made and `/dev/sdb` for the second disc with the same size.

## Convert XenServer 6.5 to Software RAID1.

The following steps can be copied and then paste into the terminal directly.

```
# Prepare /dev/sdb removing GPT data structure.
sgdisk --zap-all /dev/sdb

# Convert disc from GPT to MBR format.
sgdisk --mbrtogpt --clear /dev/sdb

# Clone particion table from /dev/sda to /dev/sdb. 
# /dev/sdb have have three particions: /dev/sda1, /dev/sda2, /dev/sda3.
sgdisk -R /dev/sdb /dev/sda

# Set type code for each particion. fd00 means Linux RAID.
sgdisk --typecode=1:fd00 /dev/sdb
sgdisk --typecode=2:fd00 /dev/sdb
sgdisk --typecode=3:fd00 /dev/sdb

# Add RAID module to the Kernel because it is not loaded by default.
modprobe md_mod

# Create new array with device metadata: two RAID1 particions.
# Create md0 (root), md1 (swap) y md2 (storage).
mdadm --create /dev/md0 --level=1 --raid-devices=2 --metadata=0.90 /dev/sdb1 missing
mdadm --create /dev/md1 --level=1 –-raid-devices=2 --metadata=0.90 /dev/sdb2 missing
mdadm --create /dev/md2 --level=1 --raid-devices=2 --metadata=0.90 /dev/sdb3 missing

# Create filesystem (FS) for root.
mkfs.ext3 /dev/md0

# Mount root FS.
mount /dev/md0 /mnt

# Copy all files from root to /mnt.
cp -xR --preserve=all / /mnt

# Generate RAID configuration in mdadm.conf file.
mdadm --detail --scan > /mnt/etc/mdadm.conf

# Update fstab file to establish new RAID device.
# Is made changing LABEL tag by /dev/md0.
sed -i 's/LABEL=[a-zA-Z\-]*/\/dev\/md0/' /mnt/etc/fstab

# Mount /dev directory on /mnt/dev allowing can be accessible from both places.
# Mount filesystem with type sysfs on /mnt/sys.
# Mount filesystem with type proc on /mnt/proc.
mount --bind /dev /mnt/dev
mount -t sysfs none /mnt/sys
mount -t proc none /mnt/proc

# Change root to /mnt to execute /sbin/extlinux command to init the system by /boot.
chroot /mnt /sbin/extlinux --install /boot

# Copy output file to the particion /dev/sdb
dd if=/mnt/usr/share/syslinux/gptmbr.bin of=/dev/sdb

# Change root position to /mnt.
chroot /mnt

# Create filesystem image.
mkinitrd -v -f --theme=/usr/share/splash --without-multipath /boot/initrd-`uname -r`.img `uname -r`

# Return to root init position.
exit

# Update extlinux.conf file to establish the new RAID device.
# Is made changing LABEL tag by /dev/md0.
sed -i 's/LABEL=[a-zA-Z\-]*/\/dev\/md0/' /mnt/boot/extlinux.conf

# Move to /mnt
# Execute extlinux for init by boot/ in raid mode.
cd /mnt
extlinux --raid -i boot/

# Set /dev/sdb as system boot.
sgdisk /dev/sdb --attributes=1:set:2

# Move to root folder and unmount dev, sys, proc y mnt.
cd
umount /mnt/dev
umount /mnt/sys
umount /mnt/proc
umount /mnt

# Sinchronize disc data with ram memory and reboot the system.
sync
reboot
```


Once these steps are excuted reboot the system but making sure a start will come from disc B. The change can be done in machine BIOS or selecting the device when the system init.

Afer starting the system from disc B, these steps most be followed in order to finish the configuration.

```
# Clone /dev/sdb to /dev/sda.
sgdisk -R /dev/sda /dev/sdb

# Set /dev/sda as system boot.
sgdisk /dev/sda --attributes=1:set:2

# Add the devices sda1, sda2 y sda3 to the RAID1 structure.
mdadm -a /dev/md0 /dev/sda1
mdadm -a /dev/md1 /dev/sda2
mdadm -a /dev/md2 /dev/sda3

# If you have an error while add sda3 is because during the XenServer instation
# you activated a SR. This SR most be removed and try again.

# Reboot the system.
reboot
```

Once finish Software **_RAID1_** setup must be created a SR. Use `xe sr-create` command with the server `UUID`.

```
xe sr-create content-type=user device-config:device=/dev/md2 host-uuid=<UUID del host xenserver> name-label="RAID 1" shared=false type=lvm
```

## Final Thoughts

With these steps a **_virtualizaton platform_** must be established using **_XenServer 6.5 over Software RAID1 structure_**.

The benefits that come with setting this configuration are: 

- Data protection when there are ruptured discs.
- Reduced hardware costs.
- Better use of physics resources.
- Creation of multiple independent virtual systems from one physical server.

### Significant Revisions
- Citrix Systems. (2015): Citrix XenServer ® 6.5 Administrator's Guide
- Gohar, A.(2013):Implementing Citrix XenServer Quickstarter
- Dan, K. (2011): Virtualization: A Manager’s Guide
- <a href="https://techblog.jeppson.org/2015/02/convert-xenserver-6-5-to-software-raid-1/" target="_blank">Technicus</a>
- <a href="http://xenserver.org/" target="_blank">XenServer</a>


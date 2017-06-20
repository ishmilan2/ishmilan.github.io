window.addEventListener("load",function(){
document.getElementById("titulo").addEventListener("click",function(evento){
if(!confirm("Va a volver al inicio de la aplicación,\nEstá usted seguro?"))evento.preventDefault();});});

function mostrar(item1){
	if (document.getElementById(item1).style.display == "flex"){
		document.getElementById(item1).style.display = "none";
	} else {
		document.getElementById(item1).style.display = "flex";
	}
};

function cambiar(item){
	item.classList.toggle("cambio");
	mostrar("menu");
}

function llenarTabla(gestor){
	for(i in gestores){
		if (i==gestor){
			for(command in gestores[i]){
				document.getElementById(command).innerHTML=gestores[i][command];
			}
			return true;
		}
	}
	return false;
}
function mostrarMensaje(){
	var mensaje=document.createElement('div');
	mensaje.style.background="white";
	mensaje.style.position="fixed";
	mensaje.style.top="calc( 50vh - 200px)";
	mensaje.style.left="calc( 50vw - 12em)";
	mensaje.style.width="24em";
	mensaje.style.margin="auto";
	mensaje.style.border="solid 1px black";
	mensaje.style.padding="1em";
	mensaje.style.zIndex="10";
	var fondo=document.createElement('div');
	fondo.style.background="black";
	fondo.style.opacity=".70";
	fondo.style.position="fixed";
	fondo.style.top="0";
	fondo.style.left="0";
	fondo.style.zIndex="5";
	fondo.style.width=window.innerWidth+"px";
	fondo.style.height=window.innerHeight+"px";
	mensaje.innerHTML="<h2 class='text-center'><a href='https://ishmilan.github.io/cdn/PMH/'>Package Manager Handbook</a></h2><br>Esto es un servicio de <a href='https://colaboratorio.net' target='_blank'>colaboratorio.net</a>.<br><a href='https://colaboratorio.net' target='_blank'><img src='https://colaboratorio.net/wp-content/uploads/2016/12/logo-negro-transparente-400.png' alt='colaboratorio.net' title='colaboratorio.net' class='logo'></a>. Con licencia <a href='https://github.com/ishmilan/PMH/blob/master/LICENSE' target='_blank'>GPLv3</a>. Autor: <a href='https://ishmilan.github.io/' target='_blank'>Ish Milan</a>.<a href='https://ishmilan.github.io/' target='_blank'><img src='https://ishmilan.github.io/cdn/logo1.png' alt='ishmilan.github.io' title='ishmilan' class='logo ishlogo'></a><br>Con la colaboración de <a href='https://porfiriopaiz.github.io/blog/' target='_blank'>Porfirio Andrés Páiz Carrasco</a><br>Click aquí para <a href='#' id='cerrar'>cerrar</a>";
	var cabecera=document.getElementsByTagName("header")[0];
	document.body.insertBefore(mensaje,cabecera);
	document.body.insertBefore(fondo,cabecera);
	fondo.addEventListener("click",function(){document.body.removeChild(fondo);document.body.removeChild(mensaje)});
	document.getElementById("cerrar").addEventListener("click",function(){document.body.removeChild(fondo);document.body.removeChild(mensaje)});
}
var gestores={
	"apt":{"PckMngr":"<code>APT(Debian y derivadas)</code>","installPck":"<code>apt-get install</code> nombreDelPaquete","installPckF":"<code>dpkg -i</code> nombreDelPaquete","updatePck":"<code>apt-get install</code> nombreDelPaquete","removePck":"<code>apt-get remove</code> nombreDelPaquete","updateRep":"<code>apt-get update</code> <br>o<br> <code>aptitude update</code> <br>o<br> <code>apt update</code>","upgrade":"<code>apt-get upgrade</code> <br>o<br> <code>aptitude safe-upgrade</code> <br>o<br> <code>apt upgrade</code>","search":"<code>apt-cache search</code> nombreDelPaquete <br>o<br> <code>apt-cache search</code> patrón","listPck":"<code>dpkg -l</code>","listRep":"<code>cat /etc/apt/sources.list && cat /etc/apt/sources.list.d/*</code>","addRep":"<code>nano /etc/apt/sources.list</code> <br>o<br> <code>add-apt-repository ppa:</code>nombreDeLaPPA","removeRep":"<code>nano /etc/apt/sources.list</code> <br>o<br> <code>ppa-purge ppa:</code>nombreDeLaPPA"},
	"zypper":{"PckMngr":"<code>ZYPPER(openSUSE)</code>","installPck":"<code>zypper install</code> nombreDelPaquete","installPckF":"<code>zypper install</code> nombreDelPaquete","updatePck":"<code>zypper update -t package</code> nombreDelPaquete","removePck":"<code>zypper remove</code> nombreDelPaquete","updateRep":"<code>zypper refresh</code>","upgrade":"<code>zypper update</code>","search":"<code>zypper search</code> nombreDelPaquete <br>o<br> <code>zypper search -t pattern</code> patrón","listPck":"<code>zypper search -is</code>","listRep":"<code>zypper repos</code>","addRep":"<code>zypper addrepo</code> rutaDelRepositorio nombreDelRepositorio","removeRep":"<code>zypper removerepo</code> nombreDelRepositorio"},
	"yum":{"PckMngr":"<code>YUM(Fedora, CentOS y derivadas)</code>","installPck":"<code>yum install</code> nombreDelPaquete","installPckF":"<code>yum localinstall</code> nombreDelPaquete","updatePck":"<code>yum update</code> nombreDelPaquete","removePck":"<code>yum erase</code> nombreDelPaquete","updateRep":"<code>yum check-update</code>","upgrade":"<code>yum update</code>","search":"<code>yum list</code> nombreDelPaquete <br>o<br> <code>yum search</code> patrón","listPck":"<code>rpm -qa</code>","listRep":"<code>yum repolist</code>","addRep":"añadir el repositorio /etc/yum.repos.d","removeRep":"borrar el repositorio /etc/yum.repos.d"},
	"dnf":{"PckMngr":"<code>DNF(Fedora 23 y superiores)</code>","installPck":"<code>dnf install</code> nombreDelPaquete","installPckF":"<code>dnf install</code> nombreDelPaquete","updatePck":"<code>dnf -y upgrate</code> nombreDelPaquete","removePck":"<code>dnf erase</code> nombreDelPaquete","updateRep":"<code>dnf distro-sync</code>","upgrade":"<code>dnf upgrade --refresh</code>","search":"<code>dnf search</code> nombreDelPaquete <br>o<br> <code>dnf search</code> patrón","listPck":"<code>dnf list</code>","listRep":"<code>dnf repolist</code>","addRep":"<code>dnf config-manager --add-repo</code> nombreDelRepositorio","removeRep":"borrar el repositorio /etc/dnf/dnf.conf<br><em>Además se pueden deshabilitar:</em><br><code>dnf config-manager --set-disabled</code> nombreDelRepositorio<br><em>o habilitar un repositorio:</em><br><code>dnf config-manager --set-enabled</code> nombreDelRepositorio"},
	"urpmi":{"PckMngr":"<code>URPMI(Mandriva y Mageia)</code>","installPck":"<code>urpmi</code> nombreDelPaquete","installPckF":"<code>urpmi</code> nombreDelPaquete","updatePck":"<code>urpmi</code> nombreDelPaquete","removePck":"<code>urpme</code> nombreDelPaquete","updateRep":"<code>urpmi.update -a</code>","upgrade":"<code>urpmi --auto-select</code>","search":"<code>urpmq</code> nombreDelPaquete <br>o<br> <code>urpmq --fuzzy</code> patrón","listPck":"<code>rpm -qa</code>","listRep":"<code>urpmq --list-media</code>","addRep":"<code>urpmi.addmedia</code> nombreDelRepositorio rutaDelRepositorio","removeRep":"<code>urpmi.removemedia</code> nombreDelRepositorio"},
	"equo":{"PckMngr":"<code>EQUO(Sabayon)</code>","installPck":"<code>equo install</code> nombreDelPaquete","installPckF":"<code>equo install</code> nombreDelPaquete","updatePck":"<code>equo install</code> nombreDelPaquete","removePck":"<code>equo remove</code> nombreDelPaquete","updateRep":"<code>equo update</code>","upgrade":"<code>equo upgrade</code>","search":"<code>equo match</code> nombreDelPaquete <br>o<br> <code>equo match</code> patrón","listPck":"<code>equo q list installed</code>","listRep":"<code>equo repoinfo</code>","addRep":"-","removeRep":"-"},
	"pacman":{"PckMngr":"<code>PACMAN(Arch,Manjaro y derivadas)</code>","installPck":"<code>pacman -S</code> nombreDelPaquete","installPckF":"<code>pacman -U</code> nombreDelPaquete","updatePck":"<code>pacman -S</code> nombreDelPaquete","removePck":"<code>pacman -R</code> nombreDelPaquete","updateRep":"<code>pacman -Sy</code>","upgrade":"<code>pacman -Su</code>","search":"<code>pacman -Ss</code> nombreDelPaquete <br>o<br> <code>pacman -Ss</code> patrón","listPck":"<code>pacman -Q</code>","listRep":"<code>cat /etc/pacman.conf</code>","addRep":"<code>nano /etc/pacman.conf</code>","removeRep":"<code>nano /etc/pacman.conf</code>"},
	"conary":{"PckMngr":"<code>CONARY(rPath y Foresight)</code>","installPck":"<code>conary update</code> nombreDelPaquete","installPckF":"<code>conary update</code> nombreDelPaquete","updatePck":"<code>conary update</code> nombreDelPaquete","removePck":"<code>conary erase</code> nombreDelPaquete","updateRep":"-","upgrade":"<code>conary updateall</code>","search":"<code>conary query</code> nombreDelPaquete <br>o<br> <code>conary query</code> patrón","listPck":"<code>conary query</code>","listRep":"-","addRep":"-","removeRep":"-"},
	"apk":{"PckMngr":"<code>APK(Alpine)</code>","installPck":"<code>apk add</code> nombreDelPaquete","installPckF":"<code>apk add --force</code> nombreDelPaquete","updatePck":"<code>apk add --upgrade</code> nombreDelPaquete","removePck":"<code>apk del</code> nombreDelPaquete","updateRep":"<code>apk update</code>","upgrade":"<code>apk upgrade</code>","search":"<code>apk search</code> nombreDelPaquete <br>o<br> <code>apk search</code> patrón","listPck":"<code>apk info</code>","listRep":"<code>cat /etc/apk/repositories</code>","addRep":"<code>setup-apkrepos</code>","removeRep":"<code>nano /etc/apk/repositories</code>"},
	"pkgtools":{"PckMngr":"<code>PKGTOOLS(Slackware)</code>","installPck":"-","installPckF":"<code>installpkg</code> nombreDelPaquete","updatePck":"<code>upgradepkg</code> nombreDelPaquete","removePck":"<code>removepkg</code> nombreDelPaquete","updateRep":"-","upgrade":"-","search":"-","listPck":"<code>ls /var/log/packages/</code>","listRep":"-","addRep":"-","removeRep":"-"},
	"slackpkg":{"PckMngr":"<code>SLACKPKG(Slackware)</code>","installPck":"<code>slackpkg install</code> nombreDelPaquete","installPckF":"<code>slackpkg install</code> nombreDelPaquete","updatePck":"<code>slackpkg upgrade</code> nombreDelPaquete","removePck":"<code>slackpkg remove</code> nombreDelPaquete","updateRep":"<code>slackpkg update</code>","upgrade":"<code>slackpkg upgrade-all</code>","search":"<code>slackpkg search</code> nombreDelPaquete <br>o<br> <code>slackpkg search</code> patrón","listPck":"<code>ls /var/log/packages/</code>","listRep":"<code>cat /etc/slackpkg/mirrors</code>","addRep":"<code>nano /etc/slackpkg/mirrors</code>","removeRep":"<code>nano /etc/slackpkg/mirrors</code>"},
	"slaptget":{"PckMngr":"<code>SLAPT-GET(Vector)</code>","installPck":"<code>slapt-get --install</code> nombreDelPaquete","installPckF":"<code>slapt-get --install</code> nombreDelPaquete","updatePck":"<code>slapt-get --install</code> nombreDelPaquete","removePck":"<code>slapt-get --remove</code> nombreDelPaquete","updateRep":"<code>slapt-get --update</code>","upgrade":"<code>slapt-get --upgrade</code>","search":"<code>slapt-get --search</code> nombreDelPaquete <br>o<br> <code>slapt-get --search</code> patrón","listPck":"<code>slapt-get --installed</code>","listRep":"<code>cat /etc/slapt-get/slapt-getrc</code>","addRep":"<code>nano /etc/slapt-get/slapt-getrc</code>","removeRep":"<code>nano /etc/slapt-get/slapt-getrc</code>"},
	"netpkg":{"PckMngr":"<code>NETPKG(Zenwalk)</code>","installPck":"<code>netpkg</code> nombreDelPaquete","installPckF":"<code>netpkg</code> nombreDelPaquete","updatePck":"<code>netpkg</code> nombreDelPaquete","removePck":"<code>netpkg remove </code> nombreDelPaquete","updateRep":"(se hace de forma automatica)","upgrade":"<code>netpkg upgrade</code>","search":"<code>netpkg</code> nombreDelPaquete nombreDelRepositorio<br>o<br> <code>netpkg list | grep</code> patrón","listPck":"<code>netpk list I</code>","listRep":"<code>netpkg mirror</code>","addRep":"<code>nano /etc/netpkg.conf</code>","removeRep":"<code>nano /etc/netpkg.conf</code>"},
	"smart":{"PckMngr":"<code>SMART(Mandriva, openSUSE y derivadas)</code>","installPck":"<code>smart install</code> nombreDelPaquete","installPckF":"<code>smart install</code> nombreDelPaquete","updatePck":"<code>smart install</code> nombreDelPaquete","removePck":"<code>smart remove</code> nombreDelPaquete","updateRep":"<code>smart update</code>","upgrade":"<code>smart upgrade</code>","search":"<code>smart search</code> nombreDelPaquete<br>o<br> <code>smart search</code> patrón","listPck":"<code>smart query</code> fichero","listRep":"<code>smart channel --show</code>","addRep":"<code>smart channel --add</code> nombreDelRepositorio rutaDelRepositorio","removeRep":"<code>smart channel --remove</code> nombreDelRepositorio"},
	"pkgcon":{"PckMngr":"<code>PKGCON(Fedora, Ubuntu, openSUSE, Mandriva)</code>","installPck":"<code>pkcon install</code> nombreDelPaquete","installPckF":"<code>pkcon install-file</code> nombreDelPaquete","updatePck":"<code>pkcon update</code> nombreDelPaquete","removePck":"<code>pkcon remove </code> nombreDelPaquete","updateRep":"<code>pkcon refersh</code>","upgrade":"<code>pkcon upgrade</code>","search":"<code>pkcon search name</code> nombreDelPaquete nombreDelRepositorio<br>o<br> <code>pkcon search details</code> patrón","listPck":"<code>pkcon search name pkg | grep Installed</code>","listRep":"<code>pkcon repo-list</code>","addRep":"-","removeRep":"-"},
	"portage":{"PckMngr":"<code>PORTAGE(Gentoo)</code>","installPck":"<code>emerge</code> nombreDelPaquete","installPckF":"-","updatePck":"<code>emerge</code> nombreDelPaquete","removePck":"<code>emerge -aC</code> nombreDelPaquete","updateRep":"<code>emerge --sync</code>","upgrade":"<code>emerge -NuDa world</code>","search":"<code>emerge --search</code> nombreDelPaquete <br>o<br> <code>emerge --search</code> patrón","listPck":"<code>qlist -I</code>","listRep":"<code>ayman -L</code>","addRep":"<code>layman -a</code> nombreDelRepositorio","removeRep":"<code>layman -d</code> nombreDelRepositorio"},
	"snap":{"PckMngr":"<code>SNAP(Snappy Ubuntu Core)</code>","installPck":"<code>snap install</code> nombreDelPaquete","installPckF":"-","updatePck":"<code>snap refersh</code> nombreDelPaquete","removePck":"<code>snap remove</code> nombreDelPaquete","updateRep":"-","upgrade":"-","search":"<code>snap find</code> nombreDelPaquete<br>o<br> <code>snap find | grep</code> patrón",	"listPck":"<code>snap list</code>","listRep":"-","addRep":"-","removeRep":"-"}
};

---
layout: blank
title: Gestor de Paquetes | Ish Milan
permalink: /PMH/
lang: es
---
    <title>Gestor de Paquetes | Ish Milan</title>
    <meta charset="utf-8" />
    <meta content='text/html; charset=utf-8' http-equiv='Content-Type'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'>
	<meta name="author" content="Ish Milan" />
    <meta property="og:site_name" content="Gestor de Paquetes | Ish Milan">
    <meta name="twitter:site" content="@ish_milan">
    <meta name="twitter:card" content="summary_large_image">

    <meta property="og:title" content="Gestor de Paquetes | Ish Milan"/>
    <meta name="twitter:title" content="Gestor de Paquetes | Ish Milan"/>

	<meta property="og:image" content="/cdn/logo1.png">
	<meta name="twitter:image" content="/cdn/logo1.png">
	<meta property="og:url" content="https://ishmilan.github.io/">

    <meta name="msapplication-TileColor" content="#DCDCDC" />
    <meta name="msapplication-TileImage" content="/cdn/logo1.png">
    <meta content="/cdn/logo1.png" itemprop="image">
    <meta content="Gestor de paquetes de software" name="description">

	<link rel="icon" type="image/x-icon" href="/cdn/logo1.png">
    <link rel="apple-touch-icon-precomposed" href="/cdn/logo1.png">
	<link rel="stylesheet" href="/cdn/css/pmh.css">
</head>
<body>
	<header>
		<hgroup>
			<a class="flotar-izq cambio" onclick="cambiar(this)">
				<div class="bar1"></div>
				<div class="bar2"></div>
				<div class="bar3"></div>
			</a>
			<a href="#" class="flotar-der" onclick="mostrarMensaje()">info</a>
			<a href="https://ishmilan.github.io/" id="titulo">Package Manager Handbook</a>
		</hgroup>
	</header>
	<section>
		<nav>
			<ul class="row-container margin-top margin-bottom" id="menu" style="display: flex;">
				<li class="row-content">
					<select id="gestores" onchange="llenarTabla(this.value);">
						<option selected="selected">Seleccione un gestor de paquetes</option>
						<optgroup label="deb">
							<option value="apt">apt(Debian y derivadas)</option>
						</optgroup>
						<optgroup label="rpm">
							<option value="zypper">zypper(openSUSE)</option>
							<option value="yum">yum(Fedora, CentOS y derivadas)</option>
							<option value="dnf" selected="selected">dnf(Fedora 23 y superiores)</option>
							<option value="urpmi">urpmi(Mandriva y Mageia)</option>
						</optgroup>
						<optgroup label="distribuciones independientes">
							<option value="equo">equo(Sabayon)</option>
							<option value="pacman">pacman(Arch,Manjaro y derivadas)</option>
							<option value="conary">conary(rPath y Foresight)</option>
							<option value="apk">apk(Alpine)</option>
						</optgroup>
						<optgroup label="slackware y derivadas">
							<option value="pkgtools">pkgtools(Slackware)</option>
							<option value="slackpkg">slackpkg(Slackware)</option>
							<option value="slaptget">slapt-get(Vector)</option>
							<option value="netpkg">netpkg(Zenwalk)</option>
						</optgroup>
						<optgroup label="gestores independientes">
							<option value="smart">smart(Mandriva, openSUSE y derivadas)</option>
							<option value="pkgcon">pkgcon(Fedora, Ubuntu, openSUSE, Mandriva)</option>
						</optgroup>
						<option value="portage">portage(Gentoo)</option>
						<option value="snap">snap(Snappy Ubuntu Core)</option>
					</select>
				</li>
			</ul>
		</nav>
		<table id="cheat-sheet" align="center" border="1">
			<tbody><tr><th colspan="2" id="PckMngr">Gestor de paquetes</th></tr>
			<tr><td class="command">Instalar desde el repositorio</td><td id="installPck"></td></tr>
			<tr><td class="command">Instalar desde un fichero</td><td id="installPckF"></td></tr>
			<tr><td class="command">Actualizar un paquete</td><td id="updatePck"></td></tr>
			<tr><td class="command">Eliminar un paquete</td><td id="removePck"></td></tr>
			<tr><td class="command">Actualizar la lista de paquetes</td><td id="updateRep"></td></tr>
			<tr><td class="command">Actualizar los paquetes</td><td id="upgrade"></td></tr>
			<tr><td class="command">Buscar paquetes</td><td id="search"></td></tr>
			<tr><td class="command">Listar los paquetes instalados</td><td id="listPck"></td></tr>
			<tr><td class="command">Listar repositorios</td><td id="listRep"></td></tr>
			<tr><td class="command">Agregar repositorios</td><td id="addRep"></td></tr>
			<tr><td class="command">Eliminar repositorios</td><td id="removeRep"></td></tr>
		</tbody></table>
	</section>
	<script src="/js/pmh.js"></script>
</body>

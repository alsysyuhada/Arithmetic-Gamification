<?php  
session_start();

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>

<style>
	@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed);
	html,body {
		height: 100%;
		width: 100%;
		user-select: none;
		overflow: hidden;
	}
	body{
	margin: 0;
	padding: 0;
	}

	.bg-img{
		background-image: url(gambar/bg2.png);
		background-repeat: no-repeat;
		height: 100%;
		background-size: 100% 100%;
		filter: blur(0.3vw) brightness(90%);
	}

	#petunjuk{
		position: absolute;
		top: 0vh;
		transform: translate(29.5vw, 1vh);
		font-size: 9vw;
		font-weight: 900;
		font-family: 'Roboto Condensed', sans-serif;
		filter: drop-shadow(3px 1px rgba(96, 96, 96, 0.75));
		color: white;
	}

	.login {
		display: grid;
		width: 80vw;
		height: 75vh;
		place-items: center;
		transform: translate(9vw,20vh);
		border: 0.5vw solid gold;
		border-radius: 2vw;
		position: absolute;
		top: 0vw;
		box-shadow: 0.3vw 0.3vw #f5deb345;
		grid-template-columns: auto auto auto auto;
		grid-template-rows: 9vw 15vw 7vw;
	}

	.pengaturan {
		background: url(gambar/pengaturan.png) no-repeat center;
		height: 6vw;
		width: 6vw;
		background-size: 85%;
		background-color: #006410;
		filter: drop-shadow(0px 1px 1px rgba(87, 87, 87, 1));
		border-radius: 50vw;
	}

	#text-pengaturan, #text-home, #text-back, #text-keluar, #text-jeda, #text-lanjut, #text-next, #text-check, #text-reset, #text-help {
		text-align: center;
		display: flex;
		font-size: 2vw;
		font-weight: 900;
		width: fit-content;
		color: #ffd88e;
		font-family: 'Roboto Condensed', sans-serif;
		letter-spacing: 1px;
		text-transform: uppercase;
		filter: drop-shadow(3px 1px rgb(154, 134, 94));
		-webkit-text-stroke: 1px #fec457;
	}

	#text-pengaturan{transform: translate(-2.9vw, 14.5vh);}
	#text-home{transform: translate(-2.45vw, 15.5vh);}
	#text-back{transform: translate(-0.4vw, 15.5vh);}
	#text-keluar{transform: translate(-0.3vw, 15.5vh);}
	#text-jeda{transform: translate(-0.7vw, 12.5vh);}
	#text-lanjut{transform: translate(-2.5vw, 12.5vh);}
	#text-next{transform: translate(-3.3vw, 12.5vh);}
	#text-check{transform: translate(-3.3vw, 0.5vh);}
	#text-reset{transform: translate(-3.3vw, 12.5vh);}
	#text-help{transform: translate(-1.5vw, 1.5vh);}


	.home {
		background: url(gambar/homep.png) no-repeat center;
		height: 6vw;
		width: 6vw;
		background-size: 85%;
		background-color: #006410;
		filter: drop-shadow(0px 1px 1px rgba(87, 87, 87, 1));
		border-radius: 50vw;
	}

	.back {
		background: url(gambar/Arrow1.png) no-repeat center;
		height: 6vw;
		width: 6vw;
		background-size: 65%;
		background-color: #006410;
		filter: drop-shadow(0px 1px 1px rgba(87, 87, 87, 1));
		border-radius: 50vw;
	}

	.keluar {
		background: url(gambar/exitp.png) no-repeat center;
		height: 6vw;
		width: 6vw;
		background-size: 85%;
		background-color: #006410;
		filter: drop-shadow(0px 1px 1px rgba(87, 87, 87, 1));
		border-radius: 50vw;
	}

	.jeda {
		background: url(gambar/jeda.png) no-repeat bottom;
		background-color: rgba(0, 0, 0, 0);
		background-size: auto;
		height: 6vw;
		width: 6vw;
		background-size: 90%;
		background-color: #006410;
		filter: drop-shadow(0px 1px 1px rgba(87, 87, 87, 1));
		border-radius: 50vw;
	}

	.lanjut {
		background: url(gambar/lanjut.png) no-repeat center;
		background-color: rgba(0, 0, 0, 0);
		background-position-x: center;
		background-position-y: center;
		background-size: auto;
		height: 6vw;
		width: 6vw;
		background-size: 70%;
		background-color: #006410;
		border-radius: 50vw;
		background-position-x: 1.2vw;
		background-position-y: 0.7vw;
		filter: drop-shadow(0px 1px 1px rgba(87, 87, 87, 1));
	}

	.next {
		background: url(gambar/next.png) no-repeat center;
		height: 6vw;
		width: 6vw;
		background-size: 65%;
		background-color: #006410;
		border-radius: 50vw;
		filter: drop-shadow(0px 1px 1px rgba(87, 87, 87, 1));
	}

	.generate {
		background: url(gambar/Union.png) no-repeat center;
		background-size: 70%;
		border: none;
		background-color: #006410;
		background-position-y: 0.8vw;
		height: 6vw;
		width: 6vw;		
		border-radius: 50vw;
	}

	.check {
		color: white;
		background-color: #006410;
		text-align: center;
		width: 6vw;
		height: 6vw;
		border-radius: 50vw;
		font-size: 4.5vw;
	}

	.help {
		color: white;
		background-color: #006410;
		text-align: center;
		width: 6vw;
		height: 6vw;
		border-radius: 50vw;
		font-size: 4.5vw;
	}

	button {
		background: url(gambar/Arrow1.png) no-repeat center;
		background-size: 65%;	
		width: 6vw;
		border-radius: 50vw;
		cursor: pointer;
		font-weight: 900;
		border: 0.1vw solid #fff;
		background-color: #006410;
		height: 6vw;
		box-shadow: 0 0.1em;
		position: absolute;
		bottom: 5.5vh;
		right: 1.5vw;
	}

	.home, .back, .keluar{
		width: 7vw;
		height: 15vh;
		display: flex;
		background-color: rgba(255, 255, 255, 0);
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		border: 3px solid #FFFFFF;
		filter: drop-shadow(0px 1px 1px rgba(87, 87, 87, 1));
		border-radius: 18px;
	}

	button:hover{background-color: #219033;}
	button:active{  
		box-shadow: 0 5px #666;
		transform: translateY(1vw);
	}
</style>

<body>
	<div class="bg-img"></div>	
	<div class="container">
		<span id="petunjuk"> PETUNJUK </span>
		<div class="login">
			<div class="pengaturan"> <span id="text-pengaturan"> Tombol Pengaturan </span> </div>
			<div class="home"><span id="text-home">Tombol Menu&nbsp;Utama</span></div>
			<div class="back"><span id="text-back">Tombol Kembali</span></div>
			<div class="keluar"><span id="text-keluar">Tombol Keluar</span></div>
			<div class="jeda"><span id="text-jeda">Tombol Jeda</span></div>
			<div class="lanjut"><span id="text-lanjut">Tombol Lanjutkan</span></div>
			<div class="next"><span id="text-next">Tombol Selanjutnya</span></div>
		    <div class="check">✓<span id="text-check">Tombol cek&nbsp;jawaban</span></div>
		    <div class="generate"><span id="text-reset">Tombol Reset&nbsp;soal</span></div>
			<div class="help"> i <span id="text-help">Tombol Petunjuk</span></div>
		</div>
		<button id="tombol-kembali" onclick="kembali()"></button>
	</div>
	
	<audio id="suara-belakang" src="Sound/sakura.mp3" autoplay loop></audio>
    <audio id="suara-tombol" src="Sound/tombol.mp3"></audio>
	<script>
	var suara = document.getElementById("suara-tombol");
	const suaraBelakang = document.getElementById('suara-belakang');
	let posisiSuaraBelakang = 0;

	// Menyimpan posisi waktu pemutaran musik sebelum halaman berganti
	window.addEventListener('beforeunload', () => {
	  	posisiSuaraBelakang = suaraBelakang.currentTime;
	  	sessionStorage.setItem('posisiSuaraBelakang', posisiSuaraBelakang);
	});

	// Memulai musik latar belakang dan mengatur posisi waktu pemutaran setelah halaman dimuat kembali
	window.addEventListener('DOMContentLoaded', () => {
	  	suaraBelakang.currentTime = parseFloat(sessionStorage.getItem('posisiSuaraBelakang')) || 0;
	  	suaraBelakang.play();
	  	suaraBelakang.volume = 0.3;
	});

	function kembali(){
		var suara = document.getElementById("suara-tombol");
		suara.play();
		setTimeout(function(){
			window.history.back();
		}, suara.duration * 2000);		
	}
	</script>	
</body>
</html>
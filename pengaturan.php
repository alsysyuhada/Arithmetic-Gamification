<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="style/firstpage.css">
</head>
<body>
	<h1> Matematika </h1>
	<div class="container">
		<button class="homep" onclick="suaraButtonKeHalaman('index.php')"> 
		</button>
		<button class="backp" onclick="kembali()"> 
		</button>
		<button class="exitp" onclick="keluar()"> 
		</button>
	</div>
	    <audio id="suara-tombol" src="Sound/tombol.mp3"></audio>
		<audio id="suara-belakang" src="Sound/sakura.mp3" autoplay loop></audio>
</body>
<script>	
	var suara = document.getElementById("suara-tombol");
	const suaraBelakang = document.getElementById('suara-belakang');
	let posisiSuaraBelakang = 0;

	function keluar() {
		suaraButtonKeHalaman('logout.php');
		sessionStorage.clear();
	}

	function kembali(){
		var suara = document.getElementById("suara-tombol");
		suara.play();
		setTimeout(function(){
			window.history.back();
		}, suara.duration * 2000);		
	}

	//Suara button
	function suaraButtonKeHalaman(pageURL){
		var suara = document.getElementById("suara-tombol");
		suara.play();
		setTimeout(function(){
			location.href = pageURL;
		}, suara.duration * 2000);
	}
	// Menyimpan posisi waktu pemutaran musik sebelum halaman berganti
	window.addEventListener('beforeunload', () => {
	  	posisiSuaraBelakang = suaraBelakang.currentTime;
	  	sessionStorage.setItem('posisiSuaraBelakang', posisiSuaraBelakang);
	});

	// Memulai musik latar belakang dan mengatur posisi waktu pemutaran setelah halaman dimuat kembali
	window.addEventListener('DOMContentLoaded', () => {
	  	suaraBelakang.currentTime = parseFloat(sessionStorage.getItem('posisiSuaraBelakang')) || 0;
	  	suaraBelakang.play();
	  	suaraBelakang.volume = 0.8;
	});
</script>	
</html>
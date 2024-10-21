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
	<link rel="stylesheet" href="style/firstpage.css">
</head>

<body>
	<h1> Matematika </h1>
	<button id="mulai" class="mulai" onclick="suaraButton();"> <p> Mulai </p> </button>
    <audio id="suara-belakang" src="Sound/sakura.mp3" autoplay loop></audio>
    <audio id="suara-tombol" src="Sound/tombol.mp3"></audio>

</body>

<script>
	var suaraBelakang = document.getElementById('suara-belakang');
	var posisiSuaraBelakang = 0;

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
		//Suara button
	function suaraButton(){
		var suara = document.getElementById("suara-tombol");
		suara.play();
		setTimeout(function(){
			location.href = 'login.php';
		}, suara.duration * 2000);
	}
</script>

</html>
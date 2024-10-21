<?php  
session_start();

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['username'])) {
    header("Location: ../login.php");
    exit();
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="../style/level4.css">
</head>
<body>
	<!-- Membuat Waktu dan Skor -->
	<header>
			<div id="nama-level"> Level 4</div>
			<div id="skor">
				<span id="textskor">Poin: </span>
				<span id="jumlahSkor">00</span>
			</div>
	</header>

	<div class="main-container">
		<img id="gambar-benar" src="../gambar/gambar-benar.png" alt="" style="display: none;">
		<div id="pertanyaan">
		</div>
		<img id="gambar-salah" src="../gambar/gambar-salah.png" alt="" style="display: none;">

		<div class="selesai">
			<span id="selesai" style="visibility: hidden;"> Selesai! </span>
			<button id="bnext" style="visibility: hidden;"></button>
			<div id="soal-benar" style="display: none;"> 
			</div>
			<div id="jumlah-soal" style="display: none;"> </div> 
		</div>

		<div class="pilJawaban">
			<div id="pilihan1" class="pilihan"></div>
			<div id="pilihan2" class="pilihan"></div>
		</div>
	</div>

	<footer>
		<button id="jeda" class="jeda"></button>
		<button id="lanjut" class="blanjut" style="visibility: hidden;"></button>
		<audio id="suara-belakang" src="../Sound/sakura.mp3" autoplay loop></audio>
	    <audio id="suara-benar" src="../Sound/benar.mp3"></audio>
	    <audio id="suara-salah" src="../Sound/salah.mp3"></audio>
	    <audio id="suara-tombol" src="../Sound/tombol.mp3"></audio>
	</footer>

</body>
<iframe src="../dialog/success-add4.html" id="success-add4" style="display: none;"></iframe>
<iframe style="display: none;" id="popupJeda" src="../popupjeda.php"></iframe>
	<iframe title="petunjuk" style="display: none;" id="petunjuk" src="../petunjuk/petunjukAddLevel4.html"></iframe>
	<script src="soalLevel4.js"></script>
</html>
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
	<title>Matematika</title>
	<link rel="stylesheet" href="../Style/level3.css">
</head>
<body>
	<!-- Membuat Waktu dan Skor -->
	<header>
		<div id="nama-level"> Level 2</div>
		<div class="container">
			<div id="countdown" class="waktu">
				00:00
			</div>
			<div id="skor">
				<span id="textskor">Poin: </span>
			 	<span id="jumlahSkor">00</span>
			</div>
		</div>
	</header>

	<div class="main-container">
		<img id="gambar-benar" src="../gambar/gambar-benar.png" alt="" style="display: none;">
		<div id="pertanyaan"class="pertanyaan"></div>
		<img id="gambar-salah" src="../gambar/gambar-salah.png" alt="" style="display: none;">

		<div class="selesai">
			<span id="selesai" style="visibility: hidden;"> Selesai! </span>
			<button id="bnext" style="visibility: hidden;"></button>
			<span id="average" style="visibility: hidden;"></span>
			<span id="soal-benar" style="display: none;"></span>
			<div id="jumlah-soal" style="display: none;"> </div> 
		</div>
		
		<div class="pilJawaban">
			<div id="pilihan1" class="pilihan"></div>
			<div id="pilihan2" class="pilihan"></div>
			<div id="pilihan3" class="pilihan"></div>
		</div>
	</div>

	<footer>
		<audio id="suara-belakang" src="../Sound/sakura.mp3" autoplay loop></audio>
	    <audio id="suara-benar" src="../Sound/benar.mp3"></audio>
	    <audio id="suara-salah" src="../Sound/salah.mp3"></audio>
	    <audio id="suara-tombol" src="../Sound/tombol.mp3"></audio>
		<button id="jeda" class="jeda"></button>
		<button id="lanjut" class="blanjut" style="visibility: hidden;"></button>
	</footer>

	<iframe src="../dialog/success-add2.html" id="success-subt2" style="display: none;"></iframe>

</body>
<iframe style="visibility: hidden;" id="popupJeda" src="../popupjeda.php"></iframe>
	<iframe class="petunjuk-subt-2" title="petunjuk" style="display: none;" id="petunjuk" src="../petunjuk/petunjukAddLevel3.html"></iframe>
	<script src="subtLevel2.js"></script>

</html>
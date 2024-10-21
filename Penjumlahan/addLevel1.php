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
	<link rel="stylesheet" href="../Style/addLevel1.css">
</head>
<body>
	<!-- Membuat Waktu dan Skor -->
	<header>
			<div id="nama-level"> Level 1</div>
			<div class="judul"> Urutkan Angka! </div>
			<div id="skor" class="skor">
				<span id="textskor">Poin: </span>
				<span id="jumlahSkor">00</span>
			</div>
	</header>


	<div class="main-container">
		<div id="puzzle" class="jawaban"></div>
		<div class="selesai">
			<span id="selesai" style="visibility: hidden;"> Berhasil! </span>
		</div>
	</div>
	<div id="tidak-urut" style="display: none;"> Angka Tidak Berurutan
		<img id="salah" src="../Gambar/salah.png">
	</div>

	<footer>
		<button id="jeda" class="jeda"></button>
	    <button class="generate" id="generate" onclick="getRandomRange()"></button>
	    <button id="check" class="check" onclick="checkOrder()">✓</button>
		<button id="bnext" style="visibility: hidden;"></button>
	    <audio id="suara-belakang" src="../Sound/sakura.mp3" autoplay loop></audio>
	    <audio id="suara-benar" src="../Sound/benar.mp3"></audio>
	    <audio id="suara-salah" src="../Sound/salah.mp3"></audio>
	    <audio id="suara-tombol" src="../Sound/tombol.mp3"></audio>

		<button id="lanjut" class="blanjut" style="visibility: hidden;"></button>
	</footer>

	<iframe src="../dialog/success-add1.html" id="success-add1" style="display: none;"></iframe>
</body>
	<iframe style="visibility: hidden;" id="popupJeda" src="../popupjeda.php"></iframe>
	<iframe title="petunjuk" style="display: none;" id="petunjuk" src="../petunjuk/petunjukAddLevel1.html"></iframe>
	<script src="addLevel1.js"></script>
</html>
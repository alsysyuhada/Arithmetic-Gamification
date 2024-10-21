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
	<link rel="stylesheet" href="../style/addLevel4.css">
</head>
<body>
	<!-- Membuat Waktu dan Skor -->
	<header>
		<div id="nama-level"> Level 3</div>
			<span id="textskor">Poin: </span>
			<div id="jumlahSkor" class="skor">
				00
			</div>
	</header>

	<div class="main-container">
		<div class="pertanyaan">
			<div id="soal" class="soal"></div>
				<input type="text" id="jawaban" maxlength="2" readonly value="">
			<div class="selesai">
				<span id="selesai" style="visibility: hidden;"> Selesai! </span>
				<button id="bnext" style="visibility: hidden;"></button>
				<div id="soal-benar" style="display: none;"> </div>
				<div id="jumlah-soal" style="display: none;"> </div> 
			</div>
		</div>

		<div class="pilJawaban">
			<div class="pilBaris">
				<button id="pilihan1" class="pilihan" onclick="pilihAngka(1)">
					1
				</button>
				<button id="pilihan2" class="pilihan" onclick="pilihAngka(2)">
					2
				</button>
				<button id="pilihan3" class="pilihan" onclick="pilihAngka(3)">
					3
				</button>
			</div>
			<div class="pilBaris">
				<img id="gambar-benar" src="../gambar/gambar-benar.png" alt="" style="display: none;">
				<button id="pilihan4" class="pilihan" onclick="pilihAngka(4)">
					4
				</button>
				<button id="pilihan5" class="pilihan" onclick="pilihAngka(5)">
					5
				</button>
				<button id="pilihan6" class="pilihan" onclick="pilihAngka(6)">
					6
				</button>
				<img id="gambar-salah" src="../gambar/gambar-salah.png" alt="" style="display: none;">
			</div>
			<div class="pilBaris">
				<button id="pilihan7" class="pilihan" onclick="pilihAngka(7)">
					7
				</button>
				<button id="pilihan8" class="pilihan" onclick="pilihAngka(8)">
					8
				</button>
				<button id="pilihan9" class="pilihan" onclick="pilihAngka(9)">
					9
				</button>
			</div>
			<div class="pilBaris">
				<button id="pilihanX" class="pilihan" onclick="hapus()">
					⌫
				</button>
				<button id="pilihan0" class="pilihan" onclick="pilihAngka(0)">
					0
				</button>
				<button id="pilihanY" class="pilihan" onclick="cekJawaban()">
					✓
				</button>
			</div>	
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
	
	<iframe src="../dialog/success-add3.html" id="success-subt3" style="display: none;"></iframe>

</body>
<iframe style="visibility: hidden;" id="popupJeda" src="../popupjeda.php"></iframe>
	<iframe title="petunjuk" style="display: none;" id="petunjuk" src="../petunjuk/petunjuksubtLevel3.html"></iframe>
<script src="subtLevel3.js"></script>
</html>
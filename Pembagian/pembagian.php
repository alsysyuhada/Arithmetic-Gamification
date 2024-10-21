<?php
session_start();

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['username'])) {
    header("Location: ../login.php");
    exit();
}

// Ambil nama pengguna dan skor dari session
$username = $_SESSION['username'];

// Konfigurasi koneksi ke database
$servername = "localhost";
$username_db = "root";
$password_db = "";
$database = "gamifikasi";

// Buat koneksi ke database
$conn = new mysqli($servername, $username_db, $password_db, $database);

// Periksa koneksi database
if ($conn->connect_error) {
    die("Koneksi database gagal: " . $conn->connect_error);
}

// Tutup koneksi database
$conn->close();

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="../style/style.css">
</head>
<body>
	
	<header> 
		<span id="nama"> Halo <br> <?php echo $username; ?> </span>
		<span class="judul" id="pembagian"> ÷ Pembagian ÷ </span>
		<p class="skor">
            <span id="textskor">Poin: </span>
    		<span id="jumlahSkor">00</span>
        </p>
	</header>
	
		<div class="table">
			<div class="txtchoice">
				<h2 class="pilih"> Pilih Level!</h2>
				<div id="progres-piala-pembagian"></div>
			</div>
			<div class="button-row1">
				<button class="blevel1" onclick="suaraButtonKeHalaman('divLevel1.php')"> 
					Level 1 
				</button>
				<button id="blevel2" class="blevel2" onclick="suaraButtonKeHalaman('divLevel2.php')" disabled> Level 2 
					<img src="../gambar/gembok.png" id="gembok1">
				</button>
			</div>

			<div class="button-row2">
				<button id="blevel3" class="blevel3" onclick="suaraButtonKeHalaman('divLevel3.php')" disabled> Level 3 
					<img src="../gambar/gembok.png" id="gembok2">
				</button>
				<button id="blevel4" class="blevel4" onclick="suaraButtonKeHalaman('divLevel4.php')" disabled> Level 4 
					<img src="../gambar/gembok.png" id="gembok3">
				</button>
			</div>
		</div>

	<footer>
		<audio id="suara-belakang" src="../Sound/sakura.mp3" autoplay loop></audio>
	    <audio id="suara-tombol" src="../Sound/tombol.mp3"></audio>
		<button class="bpengaturan" onclick="suaraButtonKeHalaman('../pengaturan.php')"></button>
	</footer>

</body>
		<iframe class="div-dialog div-dialog1" src="../dialog/dialog-add1.html" id="dialog-div1"></iframe>
		<iframe class="div-dialog" src="../dialog/dialog-add2.html" id="dialog-div2"></iframe>
		<iframe class="div-dialog" src="../dialog/dialog-add3.html" id="dialog-div3"></iframe>
		<iframe class="div-dialog" src="../dialog/dialog-add4.html" id="dialog-div4"></iframe>
		<iframe class="div-dialog" src="../dialog/dialog-add5.html" id="dialog-div5"></iframe>
		<iframe class="div-dialog" src="../dialog/dialog-add6.html" id="dialog-div6"></iframe>
	<style>
		.blevel2, .blevel3, .blevel4{
			filter: brightness(70%);
			pointer-events: none;
		}
		#gembok1, #gembok2, #gembok3{
			position: absolute;
			left: 7.5vw;
			bottom: 2vw;
			block-size: 70%;
			opacity: 0.85;
		}
		@media screen and (max-width: 768px) {
			#gembok1, #gembok2, #gembok3 {
				left: 10.5vw;
			}
		}
	</style>
	<script src="../script/pembagian.js"></script>
</html>
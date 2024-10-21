<?php
session_start();

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Ambil nama pengguna dan skor dari session
$username = $_SESSION['username'];
$idSiswa = $_SESSION['id_siswa'];

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

// Lakukan query SELECT untuk mengambil semua entri dari tabel "nama_skor" untuk pengguna yang login
$query = "SELECT skor_total FROM tes WHERE id_siswa = '$username' ORDER BY id_siswa DESC LIMIT 1";
$result = $conn->query($query);

// Inisialisasi variabel jumlahSkor dengan nilai default
$jumlahSkor = 0;

if ($result->num_rows > 0) {
    // Pengguna ditemukan dalam database, ambil skornya
    $row = $result->fetch_assoc();
    $jumlahSkor = $row['skor'];

    $_SESSION['skor'] = $jumlahSkor;
}

// Konversi nilai skor menjadi string dua digit dengan leading zero
$skorFormatted = sprintf("%02d", $jumlahSkor);

// Tutup koneksi database
$conn->close();

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="Style/style.css">
</head>
<body>
	<script>
		const suara = document.getElementById("suara-tombol");


	//Suara button
	function suaraButtonKeHalaman(pageURL){
		var suara = document.getElementById("suara-tombol");
		suara.play();
		setTimeout(function(){
			location.href = pageURL;
		}, suara.duration * 2000);
	}
	</script>

	<header class="utama">
		<span id="nama"> Halo <br> <?php echo $username; ?> </span>
		<div class="piala">
			<div id="piala-penjumlahan"></div>
			<div id="piala-pengurangan"></div>
			<div id="piala-perkalian"></div>
			<div id="piala-pembagian"></div>
		</div>
		<p class="skor">
            <span id="textskor">Poin: </span>
    		<span id="jumlahSkor">00</span>
        </p>
	 </header>
	
		<div id="tabel-utama" class="table-index">

			<div class="txtchoice">
				<h2> Pilih Pelajaran!</h2>
			</div>
			<div class="button-row1">
				<button id="penjumlahan" class="btambah" onclick="suaraButtonKeHalaman('Penjumlahan/penjumlahan.php')">  </button>
				<button id="pengurangan" class="bkurang" onclick="suaraButtonKeHalaman('Pengurangan/pengurangan.php')">  </button>
			</div>
			<div class="button-row2">
				<button id="perkalian" class="bkali" onclick="suaraButtonKeHalaman('Perkalian/perkalian.php')">  </button>
				<button id="pembagian" class="bbagi" onclick="suaraButtonKeHalaman('Pembagian/pembagian.php')">  </button>
			</div>
		</div>
	    <audio id="suara-belakang" src="Sound/sakura.mp3" autoplay loop></audio>
	    <audio id="suara-tombol" src="Sound/tombol.mp3"></audio>
	<footer>
		<div id="petunjuk" onclick="suaraButtonKeHalaman('petunjuk.php')"> i </div>
		<button class="bpengaturan" onclick="suaraButtonKeHalaman('pengaturan.php')"></button>
	</footer>
	<iframe src="dialog/dialog-utama.html" id="dialog-utama"></iframe>
</body>
<script src="script/index.js"></script>
</html>
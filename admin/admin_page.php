<?php
session_start();

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['namaGuru'])) {
    header("Location: login_admin.php");
    exit();
}

// Ambil nama pengguna dari session
$username = $_SESSION['namaGuru'];

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
	<link rel="stylesheet" type="text/css" href="admin_style.css">
</head>
<body>
	<div class="bg-img"></div>
		<div id="tabel-utama" class="table-index">

			<div class="txtchoice">
			
		</div>
	</div>
	<footer>
		<button class="exitp" onclick="keluar()"> 
		</button>
	</footer>
	    <audio id="suara-belakang" src="../Sound/sakura.mp3" autoplay loop></audio>
	    <audio id="suara-tombol" src="../Sound/tombol.mp3"></audio>
</body>
<script src="admin_page.js"></script>
</html>
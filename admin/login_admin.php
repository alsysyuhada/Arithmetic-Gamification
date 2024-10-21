<?php

//membuat session untuk bermain 
session_start();

//cek pengguna sudah login atau belum
if (isset($_SESSION['username'])){
	header("Location: login_admin.php");
	exit();
}

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

if (isset($_POST['username']) && isset($_POST['password'])) {
	$usernameInput = $_POST['username'];
	$passwordInput = $_POST['password'];
	
//mengambil data admin
    $query = "SELECT nama_guru, password FROM guru WHERE nama_guru = '$usernameInput'";

    $result = $conn->query($query);
	$row = $result->fetch_assoc();


    if ($result->num_rows > 0){
	    $storedUsername = $row['nama_guru'];
	    $storedPassword = $row['password'];

    	//jika nama dan password benar
	    if($usernameInput === $storedUsername && $passwordInput === $storedPassword){
	    	echo 'success';
	    }
	    else{
	    	echo 'gagal';
	    	echo $storedUsername;
	    	echo $storedPassword;
	    	echo $usernameInput;
	    	echo $passwordInput;
	    }
	    // Send the response back to the client
    }else {
        echo 'failure: Error: ' . $conn->error;
    }
}

if (isset($_POST['daftarAdmin'])) {
	$usernameAdmin = ucfirst($_POST['daftarAdmin']);
	
    $insertQuery = "INSERT INTO guru (nama_guru) VALUES ('$usernameAdmin)";

	if($conn->query($insertQuery) === TRUE){
    	$_SESSION['namaGuru'] = $row['nama_guru'];
	}else {
	        // penanganan kesalahan jika gagal memasukkan data
	        echo "Error: " . $conn->error;
	    }
}

	$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="admin_style.css">
</head>

<body>
	<div class="bg-img"></div>

	<div class="pilihan-login">
		<span id="masuk-atau-daftar"> MASUK ATAU DAFTAR </span>
		<div class="login">
			<input id="username" type="text" placeholder="Nama" autocomplete="off" pattern="[A-Za-z ]+" required>
			<input id="password" type="password" name="password" placeholder="Password" required>
		</div>

		<button id="masuk"> MASUK </button>
		<button id="daftar"> DAFTAR </button>

		<div class="pilihan">
			<button id="pilih-masuk"> MASUK </button>
			<button id="pilih-daftar"> DAFTAR </button>
		</div>
	</div>

	<audio id="suara-belakang" src="../Sound/sakura.mp3" autoplay loop></audio>
    <audio id="suara-tombol" src="../Sound/tombol.mp3"></audio>

	<script src="login_admin.js"> </script>	
</body>
</html>
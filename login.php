<?php

//membuat session untuk bermain 
session_start();

//cek pengguna sudah login atau belum
if (isset($_SESSION['username'])){
	header("Location: index.php");
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

if(isset($_POST['namaBelumAda'])){
	$username = ucfirst($_POST['namaBelumAda']);

	//buat entri baru
	$insertQuery = "INSERT INTO siswa (nama_siswa) VALUES ('$username')";

    //lalu simpan ke session
	if($conn->query($insertQuery) === TRUE){
	    $_SESSION['username'] = $username;
	    $_SESSION['skor_total'] = 0;
	    //ambil id siswa
		$query = "SELECT id_siswa FROM siswa WHERE nama_siswa = '$username' ORDER BY id_siswa DESC LIMIT 1";
		$result = $conn->query($query);

		//cek data siswa
	    $row = $result->fetch_assoc();
	    $idSiswa = $row['id_siswa'];
	    //masukkan id siswa ke dalam session
		$_SESSION['id_siswa'] = $idSiswa;

	    //buat entri baru di tabel skors dan tes
	    $sqlTes ="INSERT INTO tes (id_siswa, tes_ke, skor_total) VALUES ('$idSiswa', 1, 0)";
	    if ($conn->query($sqlTes) === TRUE) {
        // sukses memasukkan data ke tabel tes
	    	$pesan = "Nilai berhasil dimasukkan";
	        echo $pesan;

        $sql = "SELECT id_tes FROM tes WHERE id_siswa = '$idSiswa' ORDER BY tes_ke DESC LIMIT 1";
	    $result = $conn->query($sql);

	    //simpan id tes ke session
    	$row = $result->fetch_assoc();
	    $idTes = $row['id_tes'];
		$_SESSION['id_tes'] = $idTes;

	    } else {
	        // penanganan kesalahan jika gagal memasukkan data
	        echo "Error: " . $conn->error;
	    }
	}
}

if(isset($_POST['ulangBaru'])){
    $username = ucfirst($_POST['ulangBaru']);

    //query untuk id siswa
    $query = "SELECT id_siswa FROM siswa WHERE nama_siswa = '$username'";
    $resultSiswa = $conn->query($query);

    //cek data siswa
    $row = $resultSiswa->fetch_assoc();
    $idSiswa = $row['id_siswa'];

    //jika berhasil ambil id_tes, tes ke di tabel tes
    if($resultSiswa !== false && $resultSiswa->num_rows > 0){
        $sql = "SELECT id_tes, tes_ke FROM tes WHERE id_siswa = '$idSiswa' ORDER BY id_tes DESC LIMIT 1";
        $resultTes = $conn->query($sql);

        //tambahkan tes_ke +1
        $row = $resultTes->fetch_assoc();
        $idTes = $row['id_tes'];
        $tes_ke = $row['tes_ke'] + 1;

        //buat query baru pada tabel tes
        $insertQuery = "INSERT INTO tes (id_siswa, tes_ke, skor_total) VALUES ('$idSiswa', '$tes_ke', 0)";
        //lalu simpan ke session
        if($conn->query($insertQuery) === TRUE){
            $_SESSION['username'] = $username;
            $_SESSION['skor_total'] = 0;
            $_SESSION['id_siswa'] = $idSiswa;
            $_SESSION['tes_ke'] = $tes_ke;
			$_SESSION['id_tes'] = mysqli_insert_id($conn);
        }
    }
}

if(isset($_POST['lanjut'])){
	$username = ucfirst($_POST['lanjut']);

	$query = "SELECT * FROM siswa WHERE nama_siswa = '$username' ORDER BY id_siswa DESC LIMIT 1";
	$result = $conn->query($query);
	$row = $result->fetch_assoc();

	if ($result->num_rows > 0){
		$idSiswa = $row['id_siswa']; // Inisialisasi variabel $idSiswa
		$sql = "SELECT id_tes, tes_ke FROM tes WHERE id_siswa = '$idSiswa' ORDER BY tes_ke DESC LIMIT 1";
	    $result2 = $conn->query($sql);

		$row2 = $result2->fetch_assoc();

	    $idTes = $row2['id_tes'];
	    $tes_ke = $row2['tes_ke'];

		$_SESSION['username'] = $row['nama_siswa'];
		$_SESSION['id_siswa'] = $idSiswa;
		$_SESSION['tes_ke'] = $tes_ke;
		$_SESSION['id_tes'] = $idTes;
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
</head>

<style>
	@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed);

	*{
		user-select: none;
	}

	html,body {
		height: 100%;
		width: 100%;
	}
	body{
	margin: 0;
	padding: 0;
	}

	.bg-img{
		background-image: url(gambar/bg2.png);
		background-repeat: no-repeat;
		height: 100%;
		background-size: 100% 100%;
		filter: blur(0.3vw) brightness(90%);
	}

	.login{
		display: grid;
		width: 35vw;
		height: 65vh;
		place-items: center;
		border: 0.3vw solid #fff;
		border-radius: 50px;
		box-shadow: 0.3vw 0.3vw #f5deb345;
		justify-content: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	#masukkan-nama {
		font-size: 2.5vw;
		font-weight: 900;
		letter-spacing: 0.3vw;
		text-align: center;
		color: #00116f;
		font-family: fantasy;
		background: #d2edf71a;
		text-transform: uppercase;
		width: 80%;
	}

	input {
		font-family: 'Roboto Condensed', sans-serif;
		border-radius: 1em;
		padding-left: 2vw;
		font-size: 2.5vw;
		margin: 0 1vw 1vw;
		width: 85%;
		box-shadow: 0.1em 0.15em #5bbde8;
		background: #fff9;
		color: #005bff;
		font-weight: 900;
		border: 0.25vw solid white;
	}

	button {
		width: 11vw;
		font-size: 1.7vw;
		border-radius: 1em;
		cursor: pointer;
		font-weight: 900;
		border: 0.2vw solid #5cb3ff;
		background: yellow;
		height: 7vh;
		color: #005bff;
		box-shadow: 0 0.1em;
	}

	input:hover{
		background-color: #b1e8ff;
	}

	button:hover {
	  background-color: #e0e03a;
	  box-shadow: 0 0;
	}
	button:active{
		transform: translateY(0.3vw);
		box-shadow: 0 0.1em #5cb3ff;
	}

	/* Style untuk konfirmasi */
	.custom-confirm {
        display: inline-block;
        padding: 1vw 1vw;
        font-size: 16px;
        background-color: #007BFF91;
        color: #fff;
        border: none;
        border-radius: 1vw;
        cursor: pointer;
        font-size: 1.5vw;
        text-align: center;
    }
    .custom-confirm:hover {
        background-color: #0056b3;
    }
    .custom-confirm:active {
        background-color: #004080;
    }
    .confirm-dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        z-index: 9999;
    }
	
    .confirm-actions {
        display: flex;
        justify-content: center;
    }
    .confirm-btn {
        margin: 0 10px;
        padding: 8px 16px;
        font-size: 14px;
        background-color: #007BFF;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .confirm-btn.cancel {
        background-color: #6C757D;
    }

	@media screen and (max-width: 768px) {
		.login {
			width: 65%;
			font-size: 32px;
		}

		#masukkan-nama{
			width: 80%;
			font-size: 5.5vw;
			font-weight: 400;
		}
		
		input {
			width: 85%;
			font-size: 5.5vw;
		}

		.custom-confirm{
			font-size: 5vw;
			border-radius: 3vw;
			width: 80%;
		}

		.custom-confirm button {
			width: 40%;
		}

		button {
			width: 70%;
			font-size: 4.7vw;
		}
	}
</style>

<body>
	<div class="bg-img"></div>	
	<div class="login">
		<span id="masukkan-nama"> Silahkan Masukkan Nama</span>
		<div id="custom-confirm" class="custom-confirm" style="display: none;">
			<p id="confirm-message"></p>
	        <button onclick="ulangBaru()">Ulang</button>
	        <button onclick="lanjut()">Lanjut</button>
		</div>
		<input id="username" type="text" placeholder="Nama" autocomplete="off" pattern="[A-Za-z ]+" required>
		<button id="masuk" onclick="periksaNama();"> MASUK </button>
	</div>

	<audio id="suara-belakang" src="Sound/sakura.mp3" autoplay loop></audio>
    <audio id="suara-tombol" src="Sound/tombol.mp3"></audio>
	<script>
		const suaraBelakang = document.getElementById('suara-belakang');
		let posisiSuaraBelakang = 0;

		// Menyimpan posisi waktu pemutaran musik sebelum halaman berganti
		window.addEventListener('beforeunload', () => {
		  	posisiSuaraBelakang = suaraBelakang.currentTime;
		  	sessionStorage.setItem('posisiSuaraBelakang', posisiSuaraBelakang);
		});

		// Memulai musik latar belakang dan mengatur posisi waktu pemutaran setelah halaman dimuat kembali
		window.addEventListener('DOMContentLoaded', () => {
		  	suaraBelakang.currentTime = parseFloat(sessionStorage.getItem('posisiSuaraBelakang')) || 0;
		  	suaraBelakang.play();
		  	suaraBelakang.volume = 0.3;
		});
	</script>
	<script src="script/login.js"> </script>	
</body>
</html>
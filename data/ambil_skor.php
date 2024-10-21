<?php
//session masi mulai
session_start();

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

//ambil nama pengguna dan skor dari session
$username = $_SESSION['username'];
$idSiswa = $_SESSION['id_siswa'];
$idTes = $_SESSION['id_tes'];

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

if (isset($_GET['skorKeseluruhan'])) {
    // perintah select skor keseluruhan
    $sql = "SELECT skor_total FROM tes WHERE id_siswa = '$idSiswa' ORDER BY tes_ke DESC LIMIT 1";

    // menjalankan perintah select
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // ambil data skor dari hasil query
        $row = $result->fetch_assoc();
        $skor = $row["skor_total"];
        echo $skor;
    } else {
        echo "Skor tidak ditemukan";
        $skor = 0;
    }
}

function ambilSkor($conn, $idSiswa, $idTes, $idOperasiLevels) {
    // perintah select skor penjumlahan
    $sql = "SELECT skor FROM skors WHERE id_siswa = '$idSiswa' AND id_tes = '$idTes' AND id_operasi_levels = '$idOperasiLevels'";

    // menjalankan perintah select
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // ambil data skor dari hasil query
        $row = $result->fetch_assoc();
        $skor = $row["skor"];
    } else {
        // jika tidak ada, skor 0
        $skor = 0;
    }

    echo $skor;
}
//--------------ambil skor penjumlahan---------
if (isset($_GET['ambilSkorLevel1Penjumlahan'])) {
    ambilSkor($conn, $idSiswa, $idTes, '21');
}

if (isset($_GET['ambilSkorLevel2Penjumlahan'])) {
    ambilSkor($conn, $idSiswa, $idTes, '22');
}

if (isset($_GET['ambilSkorLevel3Penjumlahan'])) {
    ambilSkor($conn, $idSiswa, $idTes, '23');
}

if (isset($_GET['ambilSkorLevel4Penjumlahan'])) {
    ambilSkor($conn, $idSiswa, $idTes, '24');
}
//-------------ambil skor pengurangan---------
if (isset($_GET['ambilSkorLevel1Pengurangan'])) {
    ambilSkor($conn, $idSiswa, $idTes, '31');
}

if (isset($_GET['ambilSkorLevel2Pengurangan'])) {
    ambilSkor($conn, $idSiswa, $idTes, '32');
}

if (isset($_GET['ambilSkorLevel3Pengurangan'])) {
    ambilSkor($conn, $idSiswa, $idTes, '33');
}

if (isset($_GET['ambilSkorLevel4Pengurangan'])) {
    ambilSkor($conn, $idSiswa, $idTes, '34');
}

#--------------ambil skor perkalian------------
if (isset($_GET['ambilSkorLevel1Perkalian'])) {
    ambilSkor($conn, $idSiswa, $idTes, '41');
}

if (isset($_GET['ambilSkorLevel2Perkalian'])) {
    ambilSkor($conn, $idSiswa, $idTes, '42');
}

if (isset($_GET['ambilSkorLevel3Perkalian'])) {
    ambilSkor($conn, $idSiswa, $idTes, '43');
}

if (isset($_GET['ambilSkorLevel4Perkalian'])) {
    ambilSkor($conn, $idSiswa, $idTes, '44');
}

#--------------ambil skor Pembagian------------
if (isset($_GET['ambilSkorLevel1Pembagian'])) {
    ambilSkor($conn, $idSiswa, $idTes, '51');
}

if (isset($_GET['ambilSkorLevel2Pembagian'])) {
    ambilSkor($conn, $idSiswa, $idTes, '52');
}

if (isset($_GET['ambilSkorLevel3Pembagian'])) {
    ambilSkor($conn, $idSiswa, $idTes, '53');
}

if (isset($_GET['ambilSkorLevel4Pembagian'])) {
    ambilSkor($conn, $idSiswa, $idTes, '54');
}
$conn->close();
?>
<?php
//session masih mulai
session_start();

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['username'])) {
    header("Location: ../login.php");
    exit();
}

// Ambil nama pengguna dari session
$username = $_SESSION['username'];
$idSiswa = $_SESSION['id_siswa'];
$idTes = $_SESSION['id_tes'] ;

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

if (isset($_POST['totalSkor'])) {
    $skor = mysqli_real_escape_string($conn, $_POST['totalSkor']);

    // Perintah update
    $sql = "UPDATE tes SET skor_total = '$skor' WHERE id_siswa ='$idSiswa' ORDER BY tes_ke DESC LIMIT 1";

    // Jalankan perintah update
    if ($conn->query($sql) === TRUE) {
        $pesan = "Nilai berhasil diperbarui";
        echo $pesan;
    } else {
        echo "Error: " . $conn->error;
    }
}

function updateSkor($conn, $idSiswa, $idTes, $idOperasiLevels, $skor) {
    $skor = mysqli_real_escape_string($conn, $skor);

    // Melakukan query select, apakah skornya sudah ada
    $sql = "SELECT skor FROM skors WHERE id_siswa = '$idSiswa' AND id_tes = '$idTes' AND id_operasi_levels = '$idOperasiLevels' ORDER BY id_tes DESC LIMIT 1";
    $result = $conn->query($sql);

    if ($result === FALSE) {
        // Error dalam kueri select
        echo "Error: " . $conn->error;
    } else {
        if ($result->num_rows > 0) {
            // Jika ada, update skor
            $sqlUpdate = "UPDATE skors SET skor = '$skor' WHERE id_siswa = '$idSiswa' AND id_operasi_levels = '$idOperasiLevels' ORDER BY id_tes DESC LIMIT 1";
            if ($conn->query($sqlUpdate) === TRUE) {
                echo "Skor berhasil diperbarui";
            } else {
                echo "Error: " . $conn->error;
            }
        } else {
            // Jika tidak ada, buat entri baru
            $insertQuery = "INSERT INTO skors (id_siswa, id_tes, id_operasi_levels, skor) VALUES ('$idSiswa', '$idTes', '$idOperasiLevels', '$skor')";
            if ($conn->query($insertQuery) === TRUE) {
                echo "Skor berhasil ditambahkan";
            } else {
                echo "Error: " . $conn->error;
            }
        }
    }
}
//-------simpan skor penjumlahan------
if (isset($_POST['skorLevel1Penjumlahan'])) {
    updateSkor($conn, $idSiswa, $idTes, '21', $_POST['skorLevel1Penjumlahan']);
}

if (isset($_POST['skorLevel2Penjumlahan'])) {
    updateSkor($conn, $idSiswa, $idTes, '22', $_POST['skorLevel2Penjumlahan']);
}

if (isset($_POST['skorLevel3Penjumlahan'])) {
    updateSkor($conn, $idSiswa, $idTes, '23', $_POST['skorLevel3Penjumlahan']);
}

if (isset($_POST['skorLevel4Penjumlahan'])) {
    updateSkor($conn, $idSiswa, $idTes, '24', $_POST['skorLevel4Penjumlahan']);
}

//-------simpan skor pengurangan------
if (isset($_POST['skorLevel1Pengurangan'])) {
    updateSkor($conn, $idSiswa, $idTes, '31', $_POST['skorLevel1Pengurangan']);
}

if (isset($_POST['skorLevel2Pengurangan'])) {
    updateSkor($conn, $idSiswa, $idTes, '32', $_POST['skorLevel2Pengurangan']);
}

if (isset($_POST['skorLevel3Pengurangan'])) {
    updateSkor($conn, $idSiswa, $idTes, '33', $_POST['skorLevel3Pengurangan']);
}

if (isset($_POST['skorLevel4Pengurangan'])) {
    updateSkor($conn, $idSiswa, $idTes, '34', $_POST['skorLevel4Pengurangan']);
}

//----------------simpan skor perkalian-------------
if (isset($_POST['skorLevel1Perkalian'])) {
    updateSkor($conn, $idSiswa, $idTes, '41', $_POST['skorLevel1Perkalian']);
}

if (isset($_POST['skorLevel2Perkalian'])) {
    updateSkor($conn, $idSiswa, $idTes, '42', $_POST['skorLevel2Perkalian']);
}

if (isset($_POST['skorLevel3Perkalian'])) {
    updateSkor($conn, $idSiswa, $idTes, '43', $_POST['skorLevel3Perkalian']);
}

if (isset($_POST['skorLevel4Perkalian'])) {
    updateSkor($conn, $idSiswa, $idTes, '44', $_POST['skorLevel4Perkalian']);
}

//----------------simpan skor pembagian-------------
if (isset($_POST['skorLevel1Pembagian'])) {
    updateSkor($conn, $idSiswa, $idTes, '51', $_POST['skorLevel1Pembagian']);
}

if (isset($_POST['skorLevel2Pembagian'])) {
    updateSkor($conn, $idSiswa, $idTes, '52', $_POST['skorLevel2Pembagian']);
}

if (isset($_POST['skorLevel3Pembagian'])) {
    updateSkor($conn, $idSiswa, $idTes, '53', $_POST['skorLevel3Pembagian']);
}

if (isset($_POST['skorLevel4Pembagian'])) {
    updateSkor($conn, $idSiswa, $idTes, '54', $_POST['skorLevel4Pembagian']);
}
$conn->close();
?>

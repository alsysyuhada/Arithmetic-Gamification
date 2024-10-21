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

function insertDialogProgress($conn, $idSiswa, $idTes, $idDialog) {
    $sql = "INSERT INTO progress (id_dialog, id_siswa, id_tes, is_done) VALUES ('$idDialog', '$idSiswa', '$idTes', '1')";

    if ($conn->query($sql) === TRUE) {
        echo "Progres dialog berhasil disimpan";
    } else {
        echo "Terjadi kesalahan saat menyimpan progres dialog: " . $conn->error;
    }
}

if (isset($_POST['dialogUtama'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '11001');
}
//------simpan progress dialog penjumlahan-----
if (isset($_POST['dialogAddPertama'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '11002');
}

if (isset($_POST['dialogAddKeDua'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '11003');
}

if (isset($_POST['dialogAddKeTiga'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '11004');
}

if (isset($_POST['dialogAddKeEmpat'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '11005');
}

if (isset($_POST['dialogAddKeLima'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '11006');
}

if (isset($_POST['dialogAddKeEnam'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '11007');
}

//------simpan progress dialog pengurangan-----
if (isset($_POST['dialogSubtPertama'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '12002');
}

if (isset($_POST['dialogSubtKeDua'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '12003');
}

if (isset($_POST['dialogSubtKeTiga'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '12004');
}

if (isset($_POST['dialogSubtKeEmpat'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '12005');
}

if (isset($_POST['dialogSubtKeLima'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '12006');
}

if (isset($_POST['dialogSubtKeEnam'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '12007');
}
//------simpan progress dialog perkalian-----
if (isset($_POST['dialogmultPertama'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '13002');
}

if (isset($_POST['dialogmultKeDua'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '13003');
}

if (isset($_POST['dialogmultKeTiga'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '13004');
}

if (isset($_POST['dialogmultKeEmpat'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '13005');
}

if (isset($_POST['dialogmultKeLima'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '13006');
}

if (isset($_POST['dialogmultKeEnam'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '13007');
}

//------simpan progress dialog pembagian-----
if (isset($_POST['dialogDivPertama'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '14002');
}

if (isset($_POST['dialogDivKeDua'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '14003');
}

if (isset($_POST['dialogDivKeTiga'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '14004');
}

if (isset($_POST['dialogDivKeEmpat'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '14005');
}

if (isset($_POST['dialogDivKeLima'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '14006');
}

if (isset($_POST['dialogDivKeEnam'])) {
    insertDialogProgress($conn, $idSiswa, $idTes, '14007');
}

function insertProgress($conn, $idSiswa, $idTes, $idOperasiLevel) {
    $sql = "INSERT INTO progress (id_operasi_levels, id_siswa, id_tes, is_done) VALUES ('$idOperasiLevel', '$idSiswa', '$idTes', '1')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Progres dialog berhasil disimpan";
    } else {
        echo "Terjadi kesalahan saat menyimpan progres dialog: " . $conn->error;
    }
}

//------simpan progress level penjumlahan-----
if (isset($_POST['progresLevel1Penjumlahan'])) {
    insertProgress($conn, $idSiswa, $idTes, 21);
}

if (isset($_POST['progresLevel2Penjumlahan'])) {
    insertProgress($conn, $idSiswa, $idTes, 22);
}

if (isset($_POST['progresLevel3Penjumlahan'])) {
    insertProgress($conn, $idSiswa, $idTes, 23);
}

if (isset($_POST['progresLevel4Penjumlahan'])) {
    insertProgress($conn, $idSiswa, $idTes, 24);
}

//------simpan progress level pengurangan-----
if (isset($_POST['progresLevel1Pengurangan'])) {
    insertProgress($conn, $idSiswa, $idTes, 31);
}

if (isset($_POST['progresLevel2Pengurangan'])) {
    insertProgress($conn, $idSiswa, $idTes, 32);
}

if (isset($_POST['progresLevel3Pengurangan'])) {
    insertProgress($conn, $idSiswa, $idTes, 33);
}

if (isset($_POST['progresLevel4Pengurangan'])) {
    insertProgress($conn, $idSiswa, $idTes, 34);
}

//------simpan progress level perkalian-----
if (isset($_POST['progresLevel1Perkalian'])) {
    insertProgress($conn, $idSiswa, $idTes, 41);
}

if (isset($_POST['progresLevel2Perkalian'])) {
    insertProgress($conn, $idSiswa, $idTes, 42);
}

if (isset($_POST['progresLevel3Perkalian'])) {
    insertProgress($conn, $idSiswa, $idTes, 43);
}

if (isset($_POST['progresLevel4Perkalian'])) {
    insertProgress($conn, $idSiswa, $idTes, 44);
}

//------simpan progress level pembagian-----
if (isset($_POST['progresLevel1Pembagian'])) {
    insertProgress($conn, $idSiswa, $idTes, 51);
}

if (isset($_POST['progresLevel2Pembagian'])) {
    insertProgress($conn, $idSiswa, $idTes, 52);
}

if (isset($_POST['progresLevel3Pembagian'])) {
    insertProgress($conn, $idSiswa, $idTes, 53);
}

if (isset($_POST['progresLevel4Pembagian'])) {
    insertProgress($conn, $idSiswa, $idTes, 54);
}
// Menutup koneksi ke database
$conn->close();
?>
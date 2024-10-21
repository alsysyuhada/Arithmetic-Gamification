<?php
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

// Ambil nama-nama siswa dari database
$query = "SELECT nama_siswa FROM siswa";
$result = $conn->query($query);

$nama_siswa = array();
while ($row = $result->fetch_assoc()) {
    // Ubah nama siswa menjadi huruf kecil sebelum menyimpannya
    $nama_siswa[] = strtolower($row['nama_siswa']);
}

$conn->close();

// Kirim data sebagai respon JSON
header('Content-Type: application/json');
echo json_encode($nama_siswa);
exit; // Pastikan tidak ada output lain setelah ini
?>

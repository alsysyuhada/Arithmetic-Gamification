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

if (isset($_GET['progressDialogUtama'])) {
    // Menjalankan kueri SQL untuk memeriksa data di database
    $sql = "SELECT id_dialog FROM progress WHERE id_siswa = '$idSiswa' AND id_tes = '$idTes' ORDER BY id_siswa DESC LIMIT 1";
    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            // Data ada di database
            echo "data_ada";
        } else {
            // Data tidak ditemukan di database
            echo "data_tidak_ada";
        }
    } else {
        // Kesalahan dalam kueri
        http_response_code(500); // Internal Server Error
        echo "Kesalahan dalam kueri: " . $conn->error;
    }
}

if (isset($_GET['progressLevelPenjumlahan'])) {
    $response = '';
    // Daftar level yang ingin diperiksa
    $levels = [21, 22, 23, 24]; // Sesuaikan dengan id_operasi_level yang Anda gunakan

    foreach ($levels as $level) {
        $levelNumber = $level - 20; // Mengonversi id_operasi_level menjadi nomor level 1, 2, 3, 4
        $sql = "SELECT is_done FROM progress WHERE id_operasi_levels = '$level' AND id_siswa = '$idSiswa' AND id_tes ='$idTes' ORDER BY id_siswa DESC LIMIT 1";
        $result = mysqli_query($conn, $sql);

        if (is_object($result) && $result->num_rows > 0) {
            // ambil data skor dari hasil query
            $row = $result->fetch_assoc();
            $is_done = $row["is_done"];
            
            // Menyimpan status level sesuai dengan is_done
            if ($is_done == 1) {
                $response .= "level{$levelNumber}_sudah ";
            } else {
                $response .= "level{$levelNumber}_belum ";
            }
        } else {
            $response .= "data_tidak_ada ";
        }
    }

    echo $response;
}

if (isset($_GET['progressLevelPengurangan'])) {
    $response = '';
    // Daftar level yang ingin diperiksa
    $levels = [31, 32, 33, 34]; // Sesuaikan dengan id_operasi_level yang Anda gunakan

    foreach ($levels as $level) {
        $levelNumber = $level - 30; // Mengonversi id_operasi_level menjadi nomor level 1, 2, 3, 4
        $sql = "SELECT is_done FROM progress WHERE id_operasi_levels = '$level' AND id_siswa = '$idSiswa' AND id_tes = '$idTes' ORDER BY id_siswa DESC LIMIT 1";
        $result = mysqli_query($conn, $sql);

        if (is_object($result) && $result->num_rows > 0) {
            // ambil data skor dari hasil query
            $row = $result->fetch_assoc();
            $is_done = $row["is_done"];
            
            // Menyimpan status level sesuai dengan is_done
            if ($is_done == 1) {
                $response .= "level{$levelNumber}_sudah ";
            } else {
                $response .= "level{$levelNumber}_belum ";
            }
        } else {
            $response .= "data_tidak_ada ";
        }
    }

    echo $response;
}

if (isset($_GET['progressLevelPerkalian'])) {
    $response = '';
    // Daftar level yang ingin diperiksa
    $levels = [41, 42, 43, 44]; // Sesuaikan dengan id_operasi_level yang Anda gunakan

    foreach ($levels as $level) {
        $levelNumber = $level - 40; // Mengonversi id_operasi_level menjadi nomor level 1, 2, 3, 4
        $sql = "SELECT is_done FROM progress WHERE id_operasi_levels = '$level' AND id_siswa = '$idSiswa' AND id_tes ='$idTes' ORDER BY id_siswa DESC LIMIT 1";
        $result = mysqli_query($conn, $sql);

        if (is_object($result) && $result->num_rows > 0) {
            // ambil data skor dari hasil query
            $row = $result->fetch_assoc();
            $is_done = $row["is_done"];
            
            // Menyimpan status level sesuai dengan is_done
            if ($is_done == 1) {
                $response .= "level{$levelNumber}_sudah ";
            } else {
                $response .= "level{$levelNumber}_belum ";
            }
        } else {
            $response .= "data_tidak_ada ";
        }
    }

    echo $response;
}

if (isset($_GET['progressLevelPembagian'])) {
    $response = '';
    // Daftar level yang ingin diperiksa
    $levels = [51, 52, 53, 54]; // Sesuaikan dengan id_operasi_level yang Anda gunakan

    foreach ($levels as $level) {
        $levelNumber = $level - 50; // Mengonversi id_operasi_level menjadi nomor level 1, 2, 3, 4
        $sql = "SELECT is_done FROM progress WHERE id_operasi_levels = '$level' AND id_siswa = '$idSiswa' AND id_tes = '$idTes' ORDER BY id_siswa DESC LIMIT 1";
        $result = mysqli_query($conn, $sql);

        if (is_object($result) && $result->num_rows > 0) {
            // ambil data skor dari hasil query
            $row = $result->fetch_assoc();
            $is_done = $row["is_done"];
            
            // Menyimpan status level sesuai dengan is_done
            if ($is_done == 1) {
                $response .= "level{$levelNumber}_sudah ";
            } else {
                $response .= "level{$levelNumber}_belum ";
            }
        } else {
            $response .= "data_tidak_ada ";
        }
    }

    echo $response;
}

function cekProgress($id_dialog, $id_siswa, $id_operasi_levels, $conn) {

    $idTes = $_SESSION['id_tes'] ;
    // Buat query berdasarkan apakah $id_dialog dan $id_operasi_levels adalah NULL atau memiliki nilai
    if ($id_dialog === null && $id_operasi_levels === null) {
        $sql = "SELECT is_done FROM progress WHERE id_siswa = '$id_siswa' AND id_tes = '$idTes' AND id_dialog IS NULL AND id_operasi_levels IS NULL  ORDER BY id_siswa DESC LIMIT 1";
    } elseif ($id_dialog === null) {
        $sql = "SELECT is_done FROM progress WHERE id_siswa = '$id_siswa' AND id_tes = '$idTes' AND id_dialog IS NULL AND id_operasi_levels = '$id_operasi_levels' AND id_tes = '$idTes' ORDER BY id_siswa DESC LIMIT 1";
    } elseif ($id_operasi_levels === null) {
        $sql = "SELECT is_done FROM progress WHERE id_dialog = '$id_dialog' AND id_siswa = '$id_siswa' AND id_tes = '$idTes' AND id_operasi_levels IS NULL AND id_tes = '$idTes' ORDER BY id_siswa DESC LIMIT 1";
    } else {
        $sql = "SELECT is_done FROM progress WHERE id_dialog = '$id_dialog' AND id_siswa = '$id_siswa' AND id_operasi_levels = '$id_operasi_levels' AND id_tes = '$idTes' ORDER BY id_siswa DESC LIMIT 1";
    }

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $is_done = $row["is_done"];

        if ($is_done == 1 || $is_done == true) {
            return "sudah";
        } else {
            return "belum";
        }
    } else {
        return "belum";
    }
}

//--------------check dialog penjumlahan------
if (isset($_GET['progressDialogPertamaPenjumlahan'])) {
    echo "dialog1_" . cekProgress('11002', $idSiswa, null , $conn);
}

if (isset($_GET['progressDialogKeDuaPenjumlahan'])) {
    $dialog1 = cekProgress('11002', $idSiswa, null , $conn);
    $dialog2 = cekProgress('11003', $idSiswa, null , $conn);

    echo "dialog1_$dialog1 dan dialog2_$dialog2";
}

if (isset($_GET['progressDialogKeTigaPenjumlahan'])) {
    $dialog2 = cekProgress('11003', $idSiswa, null, $conn);
    $level1 = cekProgress(null, $idSiswa, '21', $conn);
    $dialog3 = cekProgress('11004', $idSiswa, null, $conn);

    echo "dialog2_$dialog2 dan level1_$level1 dan dialog3_$dialog3";
}

if (isset($_GET['progressDialogKeEmpatPenjumlahan'])) {
    $dialog3 = cekProgress('11004', $idSiswa, null, $conn);
    $level2 = cekProgress(null, $idSiswa, '22', $conn);
    $dialog4 = cekProgress('11005', $idSiswa, null, $conn);

    echo "dialog3_$dialog3 dan level2_$level2 dan dialog4_$dialog4";
}

if (isset($_GET['progressDialogKeLimaPenjumlahan'])) {
    $dialog4 = cekProgress('11005', $idSiswa, null, $conn);
    $level3 = cekProgress(null, $idSiswa, '23', $conn);
    $dialog5 = cekProgress('11006', $idSiswa, null, $conn);

    echo "dialog4_$dialog4 dan level3_$level3 dan dialog5_$dialog5";
}

if (isset($_GET['progressDialogKeEnamPenjumlahan'])) {
    $dialog5 = cekProgress('11006', $idSiswa, null, $conn);
    $level4 = cekProgress(null, $idSiswa, '24', $conn);
    $dialog6 = cekProgress('11007', $idSiswa, null, $conn);

    echo "dialog5_$dialog5 dan level4_$level4 dan dialog6_$dialog6";
}

//------------------cek dialog pengurangan
if (isset($_GET['progressDialogPertamaPengurangan'])) {
    echo "dialog1_" . cekProgress('12002', $idSiswa, null , $conn);
}

if (isset($_GET['progressDialogKeDuaPengurangan'])) {
    $dialog1 = cekProgress('12002', $idSiswa, null , $conn);
    $dialog2 = cekProgress('12003', $idSiswa, null , $conn);

    echo "dialog1_$dialog1 dan dialog2_$dialog2";
}

if (isset($_GET['progressDialogKeTigaPengurangan'])) {
    $dialog2 = cekProgress('12003', $idSiswa, null, $conn);
    $level1 = cekProgress(null, $idSiswa, '31', $conn);
    $dialog3 = cekProgress('12004', $idSiswa, null, $conn);

    echo "dialog2_$dialog2 dan level1_$level1 dan dialog3_$dialog3";
}

if (isset($_GET['progressDialogKeEmpatPengurangan'])) {
    $dialog3 = cekProgress('12004', $idSiswa, null, $conn);
    $level2 = cekProgress(null, $idSiswa, '32', $conn);
    $dialog4 = cekProgress('12005', $idSiswa, null, $conn);

    echo "dialog3_$dialog3 dan level2_$level2 dan dialog4_$dialog4";
}

if (isset($_GET['progressDialogKeLimaPengurangan'])) {
    $dialog4 = cekProgress('12005', $idSiswa, null, $conn);
    $level3 = cekProgress(null, $idSiswa, '33', $conn);
    $dialog5 = cekProgress('12006', $idSiswa, null, $conn);

    echo "dialog4_$dialog4 dan level3_$level3 dan dialog5_$dialog5";
}

if (isset($_GET['progressDialogKeEnamPengurangan'])) {
    $dialog5 = cekProgress('12006', $idSiswa, null, $conn);
    $level4 = cekProgress(null, $idSiswa, '34', $conn);
    $dialog6 = cekProgress('12007', $idSiswa, null, $conn);

    echo "dialog5_$dialog5 dan level4_$level4 dan dialog6_$dialog6";
}
//--------------check dialog perkalian------
if (isset($_GET['progressDialogPertamaPerkalian'])) {
    echo "dialog1_" . cekProgress('13002', $idSiswa, null , $conn);
}

if (isset($_GET['progressDialogKeDuaPerkalian'])) {
    $dialog1 = cekProgress('13002', $idSiswa, null , $conn);
    $dialog2 = cekProgress('13003', $idSiswa, null , $conn);

    echo "dialog1_$dialog1 dan dialog2_$dialog2";
}

if (isset($_GET['progressDialogKeTigaPerkalian'])) {
    $dialog2 = cekProgress('13003', $idSiswa, null, $conn);
    $level1 = cekProgress(null, $idSiswa, '41', $conn);
    $dialog3 = cekProgress('13004', $idSiswa, null, $conn);

    echo "dialog2_$dialog2 dan level1_$level1 dan dialog3_$dialog3";
}

if (isset($_GET['progressDialogKeEmpatPerkalian'])) {
    $dialog3 = cekProgress('13004', $idSiswa, null, $conn);
    $level2 = cekProgress(null, $idSiswa, '42', $conn);
    $dialog4 = cekProgress('13005', $idSiswa, null, $conn);

    echo "dialog3_$dialog3 dan level2_$level2 dan dialog4_$dialog4";
}

if (isset($_GET['progressDialogKeLimaPerkalian'])) {
    $dialog4 = cekProgress('13005', $idSiswa, null, $conn);
    $level3 = cekProgress(null, $idSiswa, '43', $conn);
    $dialog5 = cekProgress('13006', $idSiswa, null, $conn);

    echo "dialog4_$dialog4 dan level3_$level3 dan dialog5_$dialog5";
}

if (isset($_GET['progressDialogKeEnamPerkalian'])) {
    $dialog5 = cekProgress('13006', $idSiswa, null, $conn);
    $level4 = cekProgress(null, $idSiswa, '44', $conn);
    $dialog6 = cekProgress('13007', $idSiswa, null, $conn);

    echo "dialog5_$dialog5 dan level4_$level4 dan dialog6_$dialog6";
}

//--------------check dialog pembagian------

if (isset($_GET['progressDialogPertamaPembagian'])) {
    echo "dialog1_" . cekProgress('14002', $idSiswa, null , $conn);
}

if (isset($_GET['progressDialogKeDuaPembagian'])) {
    $dialog1 = cekProgress('14002', $idSiswa, null , $conn);
    $dialog2 = cekProgress('14003', $idSiswa, null , $conn);

    echo "dialog1_$dialog1 dan dialog2_$dialog2";
}

if (isset($_GET['progressDialogKeTigaPembagian'])) {
    $dialog2 = cekProgress('14003', $idSiswa, null, $conn);
    $level1 = cekProgress(null, $idSiswa, '51', $conn);
    $dialog3 = cekProgress('14004', $idSiswa, null, $conn);

    echo "dialog2_$dialog2 dan level1_$level1 dan dialog3_$dialog3";
}

if (isset($_GET['progressDialogKeEmpatPembagian'])) {
    $dialog3 = cekProgress('14004', $idSiswa, null, $conn);
    $level2 = cekProgress(null, $idSiswa, '52', $conn);
    $dialog4 = cekProgress('14005', $idSiswa, null, $conn);

    echo "dialog3_$dialog3 dan level2_$level2 dan dialog4_$dialog4";
}

if (isset($_GET['progressDialogKeLimaPembagian'])) {
    $dialog4 = cekProgress('14005', $idSiswa, null, $conn);
    $level3 = cekProgress(null, $idSiswa, '53', $conn);
    $dialog5 = cekProgress('14006', $idSiswa, null, $conn);

    echo "dialog4_$dialog4 dan level3_$level3 dan dialog5_$dialog5";
}

if (isset($_GET['progressDialogKeEnamPembagian'])) {
    $dialog5 = cekProgress('14006', $idSiswa, null, $conn);
    $level4 = cekProgress(null, $idSiswa, '54', $conn);
    $dialog6 = cekProgress('14007', $idSiswa, null, $conn);

    echo "dialog5_$dialog5 dan level4_$level4 dan dialog6_$dialog6";
}

// Tutup koneksi database
$conn->close();
?>
<?php
session_start();

// Hapus data pengguna dari session
session_unset();
session_destroy();

// Arahkan pengguna kembali ke halaman login.php
header("Location: login.php");
exit();
?>
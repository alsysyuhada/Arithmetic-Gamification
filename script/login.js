function periksaNama() {
    var inputNama = document.getElementById('username').value.trim().toLowerCase();
    var pattern = /^[A-Za-z ]+$/;
    if (inputNama === "") {
        alert("Nama Harus Diisi");
        return; // Hentikan eksekusi jika input kosong
    }

    if (!pattern.test(inputNama)) {
        alert("Nama hanya boleh mengandung huruf");
        return;
    }

    if (inputNama === "admin") {
        suaraButtonKeHalaman('admin/login_admin.php');
    } else {

        // Lakukan permintaan AJAX ke file PHP
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var namaSiswa = JSON.parse(xhr.responseText);
                    if (namaSiswa.includes(inputNama)) {
                        var btnMasuk = document.getElementById('masuk').style.visibility = 'hidden';
                        var customConfirm = document.getElementById('custom-confirm').style.display = 'block';
                        var konfirmasi = document.getElementById('confirm-message');
                        konfirmasi.innerHTML = "Kamu Sudah Belajar, Ulangi Atau Lanjutkan?";
                        username.disabled = true;
                    } else {
                        var xhr1 = new XMLHttpRequest();
                        xhr1.open('POST', 'login.php', true);
                        xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        xhr1.onreadystatechange = function () {
                            if (xhr1.readyState === 4) {
                                console.log(xhr1.status);
                                if (xhr1.status === 200) {
                                    console.log('Nama siswa berhasil disimpan');
                                    suaraButtonKeHalaman('firstpage.php');
                                } else {
                                    console.log('Terjadi kesalahan saat menyimpan nama siswa');
                                }
                            }
                        };
                        xhr1.send('namaBelumAda=' + encodeURIComponent(inputNama));

                    }
                } else {
                    console.error('Terjadi kesalahan saat mengambil data.');
                }
            }
        };
        xhr.open('GET', 'data/ambil_nama.php', true);
        xhr.send();
    }
}

//mengirim nama ke php
function ulangBaru() {
    var inputNama = document.getElementById('username').value.trim();
    var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', 'login.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            if (xhr1.status === 200) {
                console.log('Nama siswa berhasil dikirim');
                suaraButtonKeHalaman('firstpage.php');
            } else {
                console.log('Terjadi kesalahan saat mengirim nama siswa');
            }
        }
    };
    xhr1.send('ulangBaru=' + encodeURIComponent(inputNama));
}

//mengirim nama ke php
function lanjut() {
    var inputNama = document.getElementById('username').value.trim();
    var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', 'login.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            if (xhr1.status === 200) {
                console.log('Nama siswa berhasil dikirim');
                suaraButtonKeHalaman('firstpage.php');
            } else {
                console.log('Terjadi kesalahan saat mengirim nama siswa');
            }
        }
    };
    xhr1.send('lanjut=' + encodeURIComponent(inputNama));
}

function suaraButtonKeHalaman(url) {
    // Memainkan suara
    var audio = document.getElementById('suara-tombol');
    audio.play();

    // Setelah beberapa waktu (misalnya, 2 detik), mengarahkan ke halaman yang diberikan sebagai parameter
    setTimeout(function () {
        window.location.href = url;
    }, 1000); // 2000 milidetik = 2 detik
}
let posisiSuaraBelakang = 0;
const suaraBelakang = document.getElementById('suara-belakang');
var pilihMasuk = document.getElementById('pilih-masuk');
var pilihDaftar = document.getElementById('pilih-daftar');
var daftar = document.getElementById('daftar');
var masuk = document.getElementById('masuk');
var teksElement = document.getElementById('masuk-atau-daftar');
var inputElement = document.getElementsByTagName("input");
const buttons = document.querySelectorAll("button");
var suara = document.getElementById("suara-tombol");

masuk.onclick = function masuk() {
    var inputNama = document.getElementById('username').value.trim().toLowerCase();
    var password = document.getElementById('password').value;
    var pattern = /^[A-Za-z ]+$/;

	if (inputNama === "") {
    alert("Nama Harus Diisi");
        return; // Hentikan eksekusi jika input kosong
    }

    if (!pattern.test(inputNama)) {
        alert("Nama hanya boleh mengandung huruf");
        return;
    }
    
	var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', 'login_admin.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
    if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
            var response = xhr1.responseText.split("\n")[0];
            console.log (response);
            if (response.trim() === 'success') {
                suaraButtonKeHalaman('admin_page.php');
                console.log('berhasil');
            } else {
                alert('Login failed. ' + response);
                console.log('Login failed. ' + response);
            }
        } else {
            console.log('Terjadi kesalahan saat mengirim nama admin. Status: ' + xhr1.status);
            }
        }
    };
    xhr1.send('username=' + encodeURIComponent(inputNama) + '&password=' + encodeURIComponent(password));
}

daftar.onclick = function daftar() {
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
	var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', 'login_admin.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            console.log(xhr1.responseText);
            if (xhr1.status === 200) {
                console.log('Nama admin berhasil daftar');
                suaraButtonKeHalaman('admin_page.php');
            } else {
                console.log('Terjadi kesalahan saat mengirim nama admin');
            }
        }
    };
    xhr1.send('daftarAdmin=' + encodeURIComponent(inputNama));
}

pilihMasuk.onclick = function() {
	document.getElementsByClassName("pilihan")[0].style.display = 'none';
	masuk.style.display = 'block';
	teksElement.innerHTML = 'Silahkan Masuk';
	for (var i = 0; i < inputElement.length; i++) {
		inputElement[i].style.display = 'block';
	}
	teksElement.style.transform = 'translateY(0vw)';
}

pilihDaftar.onclick = function() {
	document.getElementsByClassName("pilihan")[0].style.display = 'none';
	daftar.style.display = 'block';
	teksElement.innerHTML = 'Silahkan Daftar';
	for (var i = 0; i < inputElement.length; i++) {
		inputElement[i].style.display = 'block';
	}
	teksElement.style.transform = 'translateY(0vw)';
}

window.onload = function () {
	masuk.style.display = 'none';
	daftar.style.display = 'none';

	for (var i = 0; i < inputElement.length; i++) {
		inputElement[i].style.display = 'none';
	}
	teksElement.style.transform = 'translateY(5vw)';
	document.getElementsByClassName("pilihan")[0].style.transform = 'translateY(-5vw)';
}

// Menyimpan posisi waktu pemutaran musik sebelum halaman berganti
window.addEventListener('beforeunload', () => {
	posisiSuaraBelakang = suaraBelakang.currentTime;
	sessionStorage.setItem('posisiSuaraBelakang', posisiSuaraBelakang);
});

// Memulai musik latar belakang dan mengatur posisi waktu pemutaran setelah halaman dimuat kembali
window.addEventListener('DOMContentLoaded', () => {
	suaraBelakang.currentTime = parseFloat(sessionStorage.getItem('posisiSuaraBelakang')) || 0;
	suaraBelakang.play();
	suaraBelakang.volume = 0.05;
});

function suaraButtonKeHalaman(url) {
    // Memainkan suara
    var audio = document.getElementById('suara-tombol');
    audio.play();

    // Setelah beberapa waktu (misalnya, 2 detik), mengarahkan ke halaman yang diberikan sebagai parameter
    setTimeout(function() {
        window.location.href = url;
    }, 1000); // 2000 milidetik = 2 detik
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        suara.play();
    });
}); 
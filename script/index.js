const suaraBelakang = document.getElementById('suara-belakang');
let posisiSuaraBelakang = 0;

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("jumlahSkor").innerHTML = "<?php echo $skorFormatted; ?>";
    // ...
});

// Dapatkan referensi ke iframe dialog-utama
var iframe1 = document.getElementById('dialog-utama');

// Tambahkan event listener ke iframe dialog-utama untuk mendeteksi saat iframe selesai dimuat
iframe1.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-utama
    var iframe1Document = iframe1.contentDocument || iframe1.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-utama
    var button1 = iframe1Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-utama
    button1.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-add2 menjadi 'none' saat tombol diklik
        iframe1.style.display = 'none';
    });
});

window.onload = function(){
// Menggunakan AJAX untuk mengambil total skor dari database
var xhr = new XMLHttpRequest();
xhr.open('GET', 'data/ambil_skor.php?skorKeseluruhan', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var skorDariDatabase = parseInt(xhr.responseText);
        document.getElementById("jumlahSkor").innerHTML = String(skorDariDatabase).padStart(2, '0');
        keseluruhanSkor =skorDariDatabase;
    }
};
xhr.send();

var dialogUtama = document.getElementById('dialog-utama');
var xhr1 = new XMLHttpRequest();
xhr1.open('GET', 'data/cek_progres.php?progressDialogUtama', true);
xhr1.onreadystatechange = function(){
    if (xhr1.readyState === 4 && xhr1.status === 200) {
        var responseData = xhr1.responseText.trim(); // Menghapus spasi ekstra jika ada
        if (responseData === "data_ada") {
            // Data ada di database
            dialogUtama.style.display = 'none';
        } else {
            // Data tidak ditemukan di database
            dialogUtama.style.display = 'block';
        }
    }
};
xhr1.send();

var piala = document.getElementById('piala-penjumlahan');
var xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'data/cek_progres.php?progressLevelPenjumlahan', true);
xhr2.onreadystatechange = function(){
    if (xhr2.readyState === 4 && xhr2.status === 200) {
        var responseData = xhr2.responseText.trim(); // Menghilangkan spasi ekstra

        // Mengubah gambar latar belakang berdasarkan status level
        if (responseData.includes("level4_sudah")) {
            piala.style.backgroundImage = 'url(gambar/ppenjumlahanfull.png)';
            penjumlahanSelesai();
        } else if (responseData.includes("level3_sudah")) {
            piala.style.backgroundImage = 'url(gambar/ppenjumlahan3.png)';	
        } else if (responseData.includes("level2_sudah")) {
            piala.style.backgroundImage = 'url(gambar/ppenjumlahan2.png)';
        } else if (responseData.includes("level1_sudah")) {
            piala.style.backgroundImage = 'url(gambar/ppenjumlahan1.png)';
        } else {
            piala.style.backgroundImage = 'url(gambar/empty-add.png)';
        }
    }
};
xhr2.send();

var pialaPengurangan = document.getElementById('piala-pengurangan');
var xhr3 = new XMLHttpRequest();
xhr3.open('GET', 'data/cek_progres.php?progressLevelPengurangan', true);
xhr3.onreadystatechange = function(){
    if (xhr3.readyState === 4 && xhr3.status === 200) {
        var responseData = xhr3.responseText.trim(); // Menghilangkan spasi ekstra

        // Mengubah gambar latar belakang berdasarkan status level
        if (responseData.includes("level4_sudah")) {
            pialaPengurangan.style.backgroundImage = 'url(gambar/ppenguranganfull.png)';
            penguranganSelesai();
        } else if (responseData.includes("level3_sudah")) {
            pialaPengurangan.style.backgroundImage = 'url(gambar/ppengurangan3.png)';	
        } else if (responseData.includes("level2_sudah")) {
            pialaPengurangan.style.backgroundImage = 'url(gambar/ppengurangan2.png)';
        } else if (responseData.includes("level1_sudah")) {
            pialaPengurangan.style.backgroundImage = 'url(gambar/ppengurangan1.png)';
        } else {
            pialaPengurangan.style.backgroundImage = 'url(gambar/empty-subt.png)';
        }
    }
};
xhr3.send();

var pialaPerkalian = document.getElementById('piala-perkalian');
var xhr4 = new XMLHttpRequest();
xhr4.open('GET', 'data/cek_progres.php?progressLevelPerkalian', true);
xhr4.onreadystatechange = function(){
    if (xhr4.readyState === 4 && xhr4.status === 200) {
        var responseData = xhr4.responseText.trim(); // Menghilangkan spasi ekstra

        // Mengubah gambar latar belakang berdasarkan status level
        if (responseData.includes("level4_sudah")) {
            pialaPerkalian.style.backgroundImage = 'url(gambar/pperkalianfull.png)';
            perkalianSelesai();
        } else if (responseData.includes("level3_sudah")) {
            pialaPerkalian.style.backgroundImage = 'url(gambar/pperkalian3.png)';  
        } else if (responseData.includes("level2_sudah")) {
            pialaPerkalian.style.backgroundImage = 'url(gambar/pperkalian2.png)';
        } else if (responseData.includes("level1_sudah")) {
            pialaPerkalian.style.backgroundImage = 'url(gambar/pperkalian1.png)';
        } else {
            pialaPerkalian.style.backgroundImage = 'url(gambar/empty-mult.png)';
        }
    }
};
xhr4.send();

var pialaPembagian = document.getElementById('piala-pembagian');
    var xhr5 = new XMLHttpRequest();
    xhr5.open('GET', 'data/cek_progres.php?progressLevelPembagian', true);
    xhr5.onreadystatechange = function(){
        if (xhr5.readyState === 4 && xhr5.status === 200) {
            var responseData = xhr5.responseText.trim(); // Menghilangkan spasi ekstra
            console.log(responseData);
            // Mengubah gambar latar belakang berdasarkan status level
            if (responseData.includes("level4_sudah")) {
                pialaPembagian.style.backgroundImage = 'url(gambar/ppembagianfull.png)';
                pembagianSelesai();
            } else if (responseData.includes("level3_sudah")) {
                pialaPembagian.style.backgroundImage = 'url(gambar/ppembagian3.png)';
                level4Terbuka();
                level3Terbuka();
                level2Terbuka();
            } else if (responseData.includes("level2_sudah")) {
                pialaPembagian.style.backgroundImage = 'url(gambar/ppembagian2.png)';
                level3Terbuka();
                level2Terbuka();
            } else if (responseData.includes("level1_sudah")) {
                pialaPembagian.style.backgroundImage = 'url(gambar/ppembagian1.png)';
                level2Terbuka();
            } else {
                pialaPembagian.style.backgroundImage = 'url(gambar/empty-div.png)';
            }
        }
    };
    xhr5.send();

};

function penjumlahanSelesai() {
	var penjumlahan = document.getElementById('penjumlahan');
	penjumlahan.style.filter = 'brightness(70%)';
	penjumlahan.style.pointerEvents ='none';

	var imgElement = document.createElement("img");
	imgElement.src = "gambar/done.png";
	imgElement.style.transform = 'translate(-2.5vw, -2.5vw)'; // Ubah transform menjadi style.transform
	imgElement.style.width = '5vw';
	imgElement.style.height = '5vw';
	imgElement.style.position = 'absolute';
	document.querySelector(".btambah").appendChild(imgElement);

}

function penguranganSelesai() {
	var pengurangan = document.getElementById('pengurangan');
	pengurangan.style.filter = 'brightness(70%)';
	pengurangan.style.pointerEvents ='none';

	var imgElement = document.createElement("img");
	imgElement.src = "gambar/done.png";
	imgElement.style.transform = 'translate(-2.5vw, -2.5vw)'; // Ubah transform menjadi style.transform
	imgElement.style.width = '5vw';
	imgElement.style.height = '5vw';
	imgElement.style.position = 'absolute';
	document.querySelector(".bkurang").appendChild(imgElement);

}

function perkalianSelesai() {
    var perkalian = document.getElementById('perkalian');
    perkalian.style.filter = 'brightness(70%)';
    perkalian.style.pointerEvents ='none';

    var imgElement = document.createElement("img");
    imgElement.src = "gambar/done.png";
    imgElement.style.transform = 'translate(-2.5vw, -2.5vw)'; // Ubah transform menjadi style.transform
    imgElement.style.width = '5vw';
    imgElement.style.height = '5vw';
    imgElement.style.position = 'absolute';
    document.querySelector(".bkali").appendChild(imgElement);

}

function pembagianSelesai() {
    var pembagian = document.getElementById('pembagian');
    pembagian.style.filter = 'brightness(70%)';
    pembagian.style.pointerEvents ='none';

    var imgElement = document.createElement("img");
    imgElement.src = "gambar/done.png";
    imgElement.style.transform = 'translate(-2.5vw, -2.5vw)'; // Ubah transform menjadi style.transform
    imgElement.style.width = '5vw';
    imgElement.style.height = '5vw';
    imgElement.style.position = 'absolute';
    document.querySelector(".bbagi").appendChild(imgElement);

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
  	suaraBelakang.volume = 0.8;
});
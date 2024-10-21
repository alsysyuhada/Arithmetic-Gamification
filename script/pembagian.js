const suaraBelakang = document.getElementById('suara-belakang');
let posisiSuaraBelakang = 0;
var keseluruhanSkor = 0;

// fungsi ketika level2 terbuka
function level2Terbuka(){
	var level2 = document.getElementById("blevel2");
	level2.disabled = false;
	level2.style.pointerEvents = "auto";
	level2.style.filter = 'none';
	document.getElementById("gembok1").style.display = 'none';
}

// fungsi ketika level3 terbuka
function level3Terbuka(){
	var level3 = document.getElementById("blevel3");
	level3.disabled = false;
	level3.style.pointerEvents = "auto";
	level3.style.filter = 'none';
	document.getElementById("gembok2").style.display = 'none';
}
// fungsi ketika level4 terbuka
function level4Terbuka(){
	var level4 = document.getElementById("blevel4");
	level4.disabled = false;
	level4.style.pointerEvents = "auto";
	level4.style.filter = 'none';
	document.getElementById("gembok3").style.display = 'none';
}

window.onload = function(){
    // Menggunakan AJAX untuk mengambil total skor dari database
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/ambil_skor.php?skorKeseluruhan', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var skorDariDatabase = parseInt(xhr.responseText);
            document.getElementById("jumlahSkor").innerHTML = String(skorDariDatabase).padStart(2, '0');;
            keseluruhanSkor =skorDariDatabase;
        }
    };
    xhr.send();

    var piala = document.getElementById('progres-piala-pembagian');
	var xhr2 = new XMLHttpRequest();
	xhr2.open('GET', '../data/cek_progres.php?progressLevelPembagian', true);
	xhr2.onreadystatechange = function(){
	    if (xhr2.readyState === 4 && xhr2.status === 200) {
	        var responseData = xhr2.responseText.trim(); // Menghilangkan spasi ekstra
	        console.log(responseData);
	        // Mengubah gambar latar belakang berdasarkan status level
	        if (responseData.includes("level4_sudah")) {
	            piala.style.backgroundImage = 'url(../gambar/ppembagianfull.png)';
	            pembagianSelesai();
	        } else if (responseData.includes("level3_sudah")) {
	            piala.style.backgroundImage = 'url(../gambar/ppembagian3.png)';
				level4Terbuka();
				level3Terbuka();
		        level2Terbuka();
	        } else if (responseData.includes("level2_sudah")) {
	            piala.style.backgroundImage = 'url(../gambar/ppembagian2.png)';
				level3Terbuka();
		        level2Terbuka();
	        } else if (responseData.includes("level1_sudah")) {
	            piala.style.backgroundImage = 'url(../gambar/ppembagian1.png)';
		        level2Terbuka();
	        } else {
	            piala.style.backgroundImage = 'url(../gambar/empty-div.png)';
	        }
	    }
	};
	xhr2.send();
};

function pembagianSelesai() {
	level4Terbuka();
	level3Terbuka();
    level2Terbuka();
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

//Suara button
function suaraButtonKeHalaman(pageURL){
	var suara = document.getElementById("suara-tombol");
	suara.play();
	setTimeout(function(){
		location.href = pageURL;
	}, suara.duration * 2000);
}

// Dapatkan referensi ke iframe dialog-div1
var iframe1 = document.getElementById('dialog-div1');

// Tambahkan event listener ke iframe dialog-div1 untuk mendeteksi saat iframe selesai dimuat
iframe1.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-div1
    var iframe1Document = iframe1.contentDocument || iframe1.contentWindow.document;

    //ubah tulisan pelajaran
    var pelajaranElement = iframe1Document.getElementById('pelajaran');
    pelajaranElement.textContent = pelajaranElement.textContent.replace("PENJUMLAHAN", "PEMBAGIAN");

    var pialaPelajaran = iframe1Document.getElementById('piala-pelajaran');
    pialaPelajaran.textContent = pialaPelajaran.textContent.replace("PENJUMLAHAN", "PEMBAGIAN");
    // Mendapatkan referensi ke tombol di dalam iframe dialog-div1
    var button1 = iframe1Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-div1
    button1.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-div2 menjadi 'block' saat tombol diklik
        iframe1.style.display = 'none';
        document.getElementById('dialog-div2').style.display = 'block';
        kirimProgress('dialogDivPertama=');
    });
});

// Dapatkan referensi ke iframe dialog-div1
var iframe2 = document.getElementById('dialog-div2');

// Tambahkan event listener ke iframe dialog-div2 untuk mendeteksi saat iframe selesai dimuat
iframe2.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-div2
    var iframe2Document = iframe2.contentDocument || iframe2.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-div2
    var button2 = iframe2Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-div2
    button2.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-div2 menjadi 'block' saat tombol diklik
        iframe2.style.display = 'none';
        kirimProgress('dialogDivKeDua=');
    });
});

// Dapatkan referensi ke iframe dialog-div1
var iframe3 = document.getElementById('dialog-div3');

// Tambahkan event listener ke iframe dialog-div3 untuk mendeteksi saat iframe selesai dimuat
iframe3.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-div3
    var iframe3Document = iframe3.contentDocument || iframe3.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-div3
    var button3 = iframe3Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-div3
    button3.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-div3 menjadi 'block' saat tombol diklik
        iframe3.style.display = 'none';
        kirimProgress('dialogDivKeTiga=');
    });
});

// Dapatkan referensi ke iframe dialog-div1
var iframe4 = document.getElementById('dialog-div4');

// Tambahkan event listener ke iframe dialog-div4 untuk mendeteksi saat iframe selesai dimuat
iframe4.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-div4
    var iframe4Document = iframe4.contentDocument || iframe4.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-div4
    var button4 = iframe4Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-div4
    button4.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-div4 menjadi 'block' saat tombol diklik
        iframe4.style.display = 'none';
        kirimProgress('dialogDivKeEmpat=');
    });
});

// Dapatkan referensi ke iframe dialog-div1
var iframe5 = document.getElementById('dialog-div5');

// Tambahkan event listener ke iframe dialog-div5 untuk mendeteksi saat iframe selesai dimuat
iframe5.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-div5
    var iframe5Document = iframe5.contentDocument || iframe5.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-div5
    var button5 = iframe5Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-div5
    button5.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-div5 menjadi 'block' saat tombol diklik
        iframe5.style.display = 'none';
        kirimProgress('dialogDivKeLima=');
    });
});

// Dapatkan referensi ke iframe dialog-div1
var iframe6 = document.getElementById('dialog-div6');

// Tambahkan event listener ke iframe dialog-div1 untuk mendeteksi saat iframe selesai dimuat
iframe6.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-div1
    var iframe6Document = iframe6.contentDocument || iframe6.contentWindow.document;

    //ubah tulisan pelajaran
    var pelajaranElement = iframe6Document.getElementById('pelajaran');
    pelajaranElement.textContent = pelajaranElement.textContent.replace("PENJUMLAHAN", "PEMBAGIAN");

    // Mendapatkan referensi ke tombol di dalam iframe dialog-div1
    var button6 = iframe6Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-div1
    button6.addEventListener('click', function () {
    	//ke halaman index
        kirimProgress('dialogDivKeEnam=');
    	suaraButtonKeHalaman('../index.php');
    });
});

function kirimProgress(namaDialog){
	var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '../data/simpan_progres.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            console.log(xhr1.responseText);
            if (xhr1.status === 200) {
                console.log('Progres dialog berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim progres dialog');
            }
        }
    };
    xhr1.send(namaDialog);
}

function checkDialog(dialogId, url, conditions) {
    var dialog = document.getElementById(dialogId);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var responseData = xhr.responseText.trim();
            console.log(responseData);
            if (conditions(responseData)) {
                dialog.style.display = 'block';
            } else {
                dialog.style.display = 'none';
            }
        }
    };
    xhr.send();
}

// Memeriksa dialog pertama
checkDialog('dialog-div1', '../data/cek_progres.php?progressDialogPertamaPembagian', function(responseData) {
    return responseData.includes("dialog1_belum");
});

// Memeriksa dialog kedua
checkDialog('dialog-div2', '../data/cek_progres.php?progressDialogKeDuaPembagian', function(responseData) {
    return responseData.includes("dialog1_sudah") && responseData.includes("dialog2_belum");
});

// Memeriksa dialog ketiga
checkDialog('dialog-div3', '../data/cek_progres.php?progressDialogKeTigaPembagian', function(responseData) {
    return responseData.includes("dialog2_sudah") && responseData.includes("level1_sudah") && responseData.includes("dialog3_belum");
});

// Memeriksa dialog keempat
checkDialog('dialog-div4', '../data/cek_progres.php?progressDialogKeEmpatPembagian', function(responseData) {
    return responseData.includes("dialog3_sudah") && responseData.includes("level2_sudah") && responseData.includes("dialog4_belum");
});

// Memeriksa dialog kelima
checkDialog('dialog-div5', '../data/cek_progres.php?progressDialogKeLimaPembagian', function(responseData) {
    return responseData.includes("dialog4_sudah") && responseData.includes("level3_sudah") && responseData.includes("dialog5_belum");
});

// Memeriksa dialog keenam
checkDialog('dialog-div6', '../data/cek_progres.php?progressDialogKeEnamPembagian', function(responseData) {
    return responseData.includes("dialog5_sudah") && responseData.includes("level4_sudah") && responseData.includes("dialog6_belum");
});
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
        	console.log(xhr.responseText);
            var skorDariDatabase = parseInt(xhr.responseText);
            console.log(skorDariDatabase);
            keseluruhanSkor =skorDariDatabase;
            document.getElementById("jumlahSkor").innerHTML = String(skorDariDatabase).padStart(2, '0');;
        } else{
        	console.log("gagal mengambil skor");
        }
    };
    xhr.send();

    var piala = document.getElementById('progres-piala-penjumlahan');
	var xhr2 = new XMLHttpRequest();
	xhr2.open('GET', '../data/cek_progres.php?progressLevelPenjumlahan', true);
	xhr2.onreadystatechange = function(){
	    if (xhr2.readyState === 4 && xhr2.status === 200) {
	        var responseData = xhr2.responseText.trim(); // Menghilangkan spasi ekstra

	        // Mengubah gambar latar belakang berdasarkan status level
	        if (responseData.includes("level4_sudah")) {
	            piala.style.backgroundImage = 'url(../gambar/ppenjumlahanfull.png)';
	            penjumlahanSelesai();
	        } else if (responseData.includes("level3_sudah")) {
	            piala.style.backgroundImage = 'url(../gambar/ppenjumlahan3.png)';
				level4Terbuka();
				level3Terbuka();
		        level2Terbuka();
	        } else if (responseData.includes("level2_sudah")) {
	            piala.style.backgroundImage = 'url(../gambar/ppenjumlahan2.png)';
				level3Terbuka();
		        level2Terbuka();
	        } else if (responseData.includes("level1_sudah")) {
	            piala.style.backgroundImage = 'url(../gambar/ppenjumlahan1.png)';
		        level2Terbuka();
	        } else {
	            piala.style.backgroundImage = 'url(../gambar/empty-add.png)';
	        }
	    }
	};
	xhr2.send();

};

function penjumlahanSelesai() {
	level4Terbuka();
	level3Terbuka();
    level2Terbuka();
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
checkDialog('dialog-add1', '../data/cek_progres.php?progressDialogPertamaPenjumlahan', function(responseData) {
    return responseData.includes("dialog1_belum");
});

// Memeriksa dialog kedua
checkDialog('dialog-add2', '../data/cek_progres.php?progressDialogKeDuaPenjumlahan', function(responseData) {
    return responseData.includes("dialog1_sudah") && responseData.includes("dialog2_belum");
});

// Memeriksa dialog ketiga
checkDialog('dialog-add3', '../data/cek_progres.php?progressDialogKeTigaPenjumlahan', function(responseData) {
    return responseData.includes("dialog2_sudah") && responseData.includes("level1_sudah") && responseData.includes("dialog3_belum");
});

// Memeriksa dialog keempat
checkDialog('dialog-add4', '../data/cek_progres.php?progressDialogKeEmpatPenjumlahan', function(responseData) {
    return responseData.includes("dialog3_sudah") && responseData.includes("level2_sudah") && responseData.includes("dialog4_belum");
});

// Memeriksa dialog kelima
checkDialog('dialog-add5', '../data/cek_progres.php?progressDialogKeLimaPenjumlahan', function(responseData) {
    return responseData.includes("dialog4_sudah") && responseData.includes("level3_sudah") && responseData.includes("dialog5_belum");
});

// Memeriksa dialog keenam
checkDialog('dialog-add6', '../data/cek_progres.php?progressDialogKeEnamPenjumlahan', function(responseData) {
    return responseData.includes("dialog5_sudah") && responseData.includes("level4_sudah") && responseData.includes("dialog6_belum");
});


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

// Dapatkan referensi ke iframe dialog-add1
var iframe1 = document.getElementById('dialog-add1');

// Tambahkan event listener ke iframe dialog-add1 untuk mendeteksi saat iframe selesai dimuat
iframe1.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-add1
    var iframe1Document = iframe1.contentDocument || iframe1.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-add1
    var button1 = iframe1Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-add1
    button1.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-add2 menjadi 'block' saat tombol diklik
        iframe1.style.display = 'none';
        document.getElementById('dialog-add2').style.display = 'block';
        kirimProgress('dialogAddPertama=');
    });
});

// Dapatkan referensi ke iframe dialog-add2
var iframe2 = document.getElementById('dialog-add2');

// Tambahkan event listener ke iframe dialog-add2 untuk mendeteksi saat iframe selesai dimuat
iframe2.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-add2
    var iframe2Document = iframe2.contentDocument || iframe2.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-add2
    var button2 = iframe2Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-add2
    button2.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-add2 menjadi 'block' saat tombol diklik
        iframe2.style.display = 'none';
        kirimProgress('dialogAddKeDua=');
    });
});

// Dapatkan referensi ke iframe dialog-add1
var iframe3 = document.getElementById('dialog-add3');
// Tambahkan event listener ke iframe dialog-add3 untuk mendeteksi saat iframe selesai dimuat

iframe3.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-add3
    var iframe3Document = iframe3.contentDocument || iframe3.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-add3
    var button3 = iframe3Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-add3
    button3.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-add3 menjadi 'block' saat tombol diklik
        iframe3.style.display = 'none';
        kirimProgress('dialogAddKeTiga=');
    });
});

// Dapatkan referensi ke iframe dialog-add1
var iframe4 = document.getElementById('dialog-add4');

// Tambahkan event listener ke iframe dialog-add4 untuk mendeteksi saat iframe selesai dimuat
iframe4.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-add4
    var iframe4Document = iframe4.contentDocument || iframe4.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-add4
    var button4 = iframe4Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-add4
    button4.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-add4 menjadi 'block' saat tombol diklik
        iframe4.style.display = 'none';
        kirimProgress('dialogAddKeEmpat=');
    });
});

// Dapatkan referensi ke iframe dialog-add1
var iframe5 = document.getElementById('dialog-add5');

// Tambahkan event listener ke iframe dialog-add5 untuk mendeteksi saat iframe selesai dimuat
iframe5.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-add5
    var iframe5Document = iframe5.contentDocument || iframe5.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-add5
    var button5 = iframe5Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-add5
    button5.addEventListener('click', function () {
        // Mengubah properti display iframe dialog-add5 menjadi 'block' saat tombol diklik
        iframe5.style.display = 'none';
        kirimProgress('dialogAddKeLima=');
    });
});

// Dapatkan referensi ke iframe dialog-add1
var iframe6 = document.getElementById('dialog-add6');

// Tambahkan event listener ke iframe dialog-add1 untuk mendeteksi saat iframe selesai dimuat
iframe6.addEventListener('load', function () {
    // Mengakses dokumen di dalam iframe dialog-add1
    var iframe6Document = iframe6.contentDocument || iframe6.contentWindow.document;

    // Mendapatkan referensi ke tombol di dalam iframe dialog-add1
    var button6 = iframe6Document.getElementById('next');

    // Tambahkan event listener ke tombol di dalam iframe dialog-add1
    button6.addEventListener('click', function () {
    	//ke halaman index
        kirimProgress('dialogAddKeEnam=');
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
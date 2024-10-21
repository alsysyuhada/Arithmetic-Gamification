var soal;
var jumlahSoal = 0;
var jeda = document.getElementById("jeda");
var resume = document.getElementById("lanjut");
var next = document.getElementById("bnext");
var pilihan = document.getElementById("jawaban");
var skorDiSini = 0;
var keseluruhanSkor =0;
const suaraBelakang = document.getElementById('suara-belakang');
let posisiSuaraBelakang = 0;
var suara = document.getElementById("suara-tombol");
const buttons = document.querySelectorAll("button");
const gambarBenar = document.getElementById("gambar-benar");
const gambarSalah = document.getElementById("gambar-salah");
var frameSuccess = document.getElementById("success-subt3");
var skorBermain = 0;
var petunjuk = document.getElementById("petunjuk");
var totalJawabanBenar = 0;

//angka random
function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//buat soal random dan tampilkan
function generateQA(){
	var x = generateRandomNumber(1, 20);
	var y = generateRandomNumber(6, 10);
	soal = x-y;

	while (x<=y || soal > 10){
		x = generateRandomNumber(1, 20);
		y = generateRandomNumber(6, 10);
		soal = x - y;
	}
	document.getElementById("soal").innerHTML = x + "-" + y + "=";
}

//buat user input
function pilihAngka(Angka){
	pilihan.value += Angka;
}

//cek jawaban
function cekJawaban(){
	if(pilihan.value != "" && pilihan.value == soal){
		skorDiSini=10;
		keseluruhanSkor += skorDiSini;
		document.getElementById("jumlahSkor").innerHTML =keseluruhanSkor;
		totalJawabanBenar++;
		skorBermain += 10;
		skorLevel3Pengurangan += 10;
		animateNumber();
		menjawabBenar();
		generateQA();
		kirimNilai();
		jumlahSoal++;
		pilihan.value = "";
	}
	if(pilihan.value != "" && pilihan.value != soal) {
		pilihan.value = "";
		jumlahSoal++;
		menjawabSalah();
		generateQA();
	}
//10 soal berhenti
	if(jumlahSoal == 10){	
		isDone();
	}
}

function tampilinJumlahSoal() {
	var jawabanBenarElement = document.getElementById("soal-benar");
	jawabanBenarElement.style.display = 'inline-flex';
	jawabanBenarElement.innerHTML = "Soal yang dijawab benar: " + totalJawabanBenar;

	var jumlahSoalElement = document.getElementById("jumlah-soal");
	jumlahSoalElement.style.display = 'inline-flex';
	jumlahSoalElement.innerHTML = "&nbsp dari " +  jumlahSoal + " soal";
}

// buat tombol selanjutnya membuka level selanjutnya
function openNextLevel(){
	const suara = document.getElementById("suara-tombol");
	suara.play();
	setTimeout(function(){
		window.location= "pengurangan.php";
	}, suara.duration * 2000);
	var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '../data/simpan_progres.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            console.log(xhr1.responseText);
            if (xhr1.status === 200) {
                console.log('Progres level3 Pengurangan berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim progres level');
            }
        }
    };
    xhr1.send('progresLevel3Pengurangan=');
}

//hapus teks
function hapus(){
	pilihan.value = '';
}

//suara salah
function menjawabSalah () {
	const suara = document.getElementById("suara-salah");
	suara.play();
	suara.currentTime = 0;
	animateFadeIn(gambarSalah);
    gambarBenar.style.display = "none";
}

// sound ketika jawab benar
function menjawabBenar(){
	const suara = document.getElementById("suara-benar");
	suara.play();
	suara.currentTime = 0;
	animateFadeIn(gambarBenar);
    gambarSalah.style.display = "none";
}

//mengirim data ke php
function kirimNilai() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../data/simpan_skor.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
    	    console.log(xhr.status);
		    console.log(xhr.responseText);
            if (xhr.status === 200) {
                console.log('Nilai berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim nilai');
            }
        }
    };
    xhr.send('totalSkor=' + encodeURIComponent(keseluruhanSkor));

    var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '../data/simpan_skor.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            console.log(xhr1.responseText);
            if (xhr1.status === 200) {
                console.log('Nilai skorLevel3Pengurangan berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim nilai skorLevel3Pengurangan');
            }
        }
    };
            console.log(skorLevel3Pengurangan);
    xhr1.send('skorLevel3Pengurangan=' + encodeURIComponent(skorLevel3Pengurangan));
}

window.onload = function(){
    // Menggunakan AJAX untuk mengambil total skor dari database
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/ambil_skor.php?skorKeseluruhan', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var skorDariDatabase = parseInt(xhr.responseText);
            document.getElementById("jumlahSkor").innerHTML = String(skorDariDatabase).padStart(2, '0');
            keseluruhanSkor =skorDariDatabase;
        }
    };
    xhr.send();

    //mengambil skor level3 penjumlhan dari database
	var xhr1 = new XMLHttpRequest();
	xhr1.open('GET', '../data/ambil_skor.php?ambilSkorLevel3Pengurangan', true);
	xhr1.onreadystatechange = function(){
		if (xhr1.readyState === 4 && xhr1.status === 200) {
            var skorLevel3DariDatabase = parseInt(xhr1.responseText);
            skorLevel3Pengurangan = skorLevel3DariDatabase;
            console.log(skorLevel3Pengurangan);
        }
	};
    xhr1.send();
    parent.document.body.style.backdropFilter = "blur(5px)";
	document.getElementById("lanjut").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'hidden';
	petunjuk.style.display = 'block';
	pilihan.value = '';		
    generateQA();
};


//membuat jeda
function jedaPermainan(){
	resume.disabled = false;
	jeda.disabled = true;
	isPause();
}

// membuat button jeda, resume, next berfungsi
jeda.addEventListener("click", jedaPermainan);
resume.addEventListener("click", resumePermainan);
next.addEventListener("click", openNextLevel);

function animateNumber() {
	const animasiSkor = document.getElementById('jumlahSkor');
    animasiSkor.style.animation = 'none';
    void animasiSkor.offsetWidth; // Reset animation
      
    animasiSkor.style.animation = 'slideIn 1s forwards';
}

//membuat resume
function resumePermainan(){
	resume.disabled = true;
	jeda.disabled = false;
	isResume();
}
//fungsi ketika resume
function isResume(){
	parent.document.body.style.backdropFilter = "none";
	document.getElementById("popupJeda").style.display = 'none';
	document.getElementById("lanjut").style.visibility = 'hidden';
	document.getElementById("jeda").style.visibility = 'visible';
	const nodeList = document.querySelectorAll(".pilihan");
		for (let i = 0; i < nodeList.length; i++) {
			nodeList[i].style.visibility = 'visible';
	}
	petunjuk.style.display = 'none';
}

//fungsi ketika jeda
function isPause(){
	const nodeList = document.querySelectorAll(".pilihan");
		for (let i = 0; i < nodeList.length; i++) {
			nodeList[i].style.visibility = 'hidden';
	}
	document.getElementById("lanjut").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'hidden';
	document.getElementById("popupJeda").style.display = 'block';
	parent.document.body.style.backdropFilter = "blur(5px)";
}

//ketika selesai
function isDone(){
	const nodeList = document.querySelectorAll(".pilihan");
		for (let i = 0; i < nodeList.length; i++) {
				nodeList[i].style.display = 'none';
		}
	document.getElementById("soal").style.display = 'none'
	document.getElementById("selesai").style.visibility ='visible'	;
	document.querySelector(".pilJawaban").style.display = 'none';
	document.getElementById("bnext").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'hidden';
	frameSuccess.style.display = 'block';
	nilaiDiFrame();
	suaraBelakang.volume = 0.8;
	tampilinJumlahSoal();
}

buttons.forEach(button => {
	button.addEventListener("click", () => {
		suara.play();
	});
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
  	suaraBelakang.volume = 0.2;
});

function animateFadeIn(element) {
    element.style.opacity = "1"; // Set opacity awal menjadi 0
    element.style.display = "block"; // Tampilkan elemen
    element.style.position = 'absolute';
    setTimeout(() => {
        element.style.opacity = "0"; // Set opacity kembali menjadi 0 setelah 1 detik
        setTimeout(() => {
            element.style.display = "none"; // Sembunyikan elemen setelah opacity menjadi 0
        }, 2000); // Waktu tunggu sebelum menyembunyikan elemen setelah animasi selesai (0.5 detik)
    }, 1000); // Waktu tunggu sebelum mengubah opacity kembali menjadi 0 (2 detik)
}

function nilaiDiFrame(){
	// Cek apakah frame ditemukan
	if (frameSuccess) {
	  // Dapatkan dokumen di dalam frame
	  var frameDocument = frameSuccess.contentDocument || frameSuccess.contentWindow.document;

	  // Akses elemen di dalam frame dan ubah teksnya
	  var elem = frameDocument.getElementById("dapat-poin");
	  if (elem) {
	    elem.innerHTML =skorBermain;
	    console.log(elem.innerHTML);
	  }
	  var elemPiala = frameDocument.getElementById("piala");
	  if (elemPiala){
	  	elemPiala.style.background = 'url("../gambar/ppengurangan3.png") no-repeat center';
	  	elemPiala.style.backgroundSize = '85%';
	  }
	}
}
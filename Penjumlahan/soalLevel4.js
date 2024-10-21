var pilihanBenar;
var next = document.getElementById("bnext");
var jeda = document.getElementById("jeda");
var resume = document.getElementById("lanjut");
var x;
var y;
var jumlahSoal = 0;
var skorDiSini = 0;
var keseluruhanSkor = 0;
const suaraBelakang = document.getElementById('suara-belakang');
let posisiSuaraBelakang = 0;
const buttons = document.querySelectorAll("button");
var suara = document.getElementById("suara-tombol");
const gambarBenar = document.getElementById("gambar-benar");
const gambarSalah = document.getElementById("gambar-salah");
var frameSuccess = document.getElementById("success-add4");
var skorBermain = 0;
var totalJawabanBenar = 0;

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

//membuat resume
function resumePermainan(){
	resume.disabled = true;
	jeda.disabled = false;
	isResume();
}

// Fungsi untuk menghasilkan angka acak antara dua nilai
function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//buat soal random dan tampilkan
function generateQA(){
	x = generateRandomNumber(11, 20);
	y = generateRandomNumber(1, 20);
	var soal = x + y;
	document.getElementById("pertanyaan").innerHTML = soal;

// membuat pilihan yang benar dan hasilPenjumlahan
	var pilihanBenar = Math.round(Math.random()+1);
	document.getElementById("pilihan"+pilihanBenar).innerHTML = x+"+"+y;
	var hasilPenjumlahan = [x+"+"+y];

//membuat pilihan salah
	for(i=1; i<3; i++){
		if(i != pilihanBenar){
			var pilihanSalah1;
			var pilihanSalah12;
			do{
				pilihanSalah1 = ((Math.round(Math.random()*20)+3));
				pilihanSalah2 = ((Math.round(Math.random()*20)+3));
			}while (hasilPenjumlahan.indexOf(pilihanSalah1)>-1)
			document.getElementById("pilihan"+i).innerHTML = pilihanSalah1 + "+" + pilihanSalah2 ;
			hasilPenjumlahan.push(pilihanSalah1);
		}
	}
}

// menjawab soal
for (i=1; i<3; i++){
	document.getElementById("pilihan"+i).onclick = function (){
	//jika menjawab benar
		if (this.innerHTML == x+"+"+y) {
			skorDiSini=10;
			keseluruhanSkor += skorDiSini;
			skorLevel4Penjumlahan += 10;
			skorBermain += 10;
			document.getElementById("jumlahSkor").innerHTML = keseluruhanSkor;
			totalJawabanBenar++;
			animateNumber();
			menjawabBenar();
			jumlahSoal++;
			generateQA();
			kirimNilai();
		}else {
			menjawabSalah();
			jumlahSoal++;
			generateQA();
		}
		//10 soal berhenti
		if(jumlahSoal == 10){	
			isDone();
		}
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

//suara salah
function menjawabSalah () {
	const suara = document.getElementById("suara-salah");
	suara.play();
	suara.currentTime = 0;
	animateFadeIn(gambarSalah);
    gambarBenar.style.display = "none";
}

//suara ketika jawab benar
function menjawabBenar(){
	const suara = document.getElementById("suara-benar");
	suara.play();
	suara.currentTime = 0;

	animateFadeIn(gambarBenar);
    gambarSalah.style.display = "none";
}
// buat tombol selanjutnya membuka level selanjutnya
function openNextLevel(){
	const suara = document.getElementById("suara-tombol");
		suara.play();
		setTimeout(function(){
			window.location= "Penjumlahan.php";
		}, suara.duration * 2000);
	var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '../data/simpan_progres.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            console.log(xhr1.responseText);
            if (xhr1.status === 200) {
                console.log('Progres level4 penjumlahan berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim progres level');
            }
        }
    };
    xhr1.send('progresLevel4Penjumlahan=');
}

//mengirim data ke php
function kirimNilai() {
    var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '../data/simpan_skor.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            console.log(xhr1.responseText);
            if (xhr1.status === 200) {
                console.log('Nilai skorLevel4Penjumlahan berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim nilai skorLevel4Penjumlahan');
            }
        }
    };
    xhr1.send('skorLevel4Penjumlahan=' + encodeURIComponent(skorLevel4Penjumlahan));

    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', '../data/simpan_skor.php', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
            console.log(xhr2.status);
            console.log(xhr2.responseText);
            if (xhr2.status === 200) {
                console.log('Nilai totalSkor berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim nilai totalSkor');
            }
        }
    };
    xhr2.send('totalSkor=' + encodeURIComponent(keseluruhanSkor));
}

window.onload = function(){
    //mengambil skor level4 penjumlhan dari database
	var xhr1 = new XMLHttpRequest();
	xhr1.open('GET', '../data/ambil_skor.php?ambilSkorLevel4Penjumlahan', true);
	xhr1.onreadystatechange = function(){
		if (xhr1.readyState === 4 && xhr1.status === 200) {
            var skorLevel4DariDatabase = parseInt(xhr1.responseText);
            skorLevel4Penjumlahan = skorLevel4DariDatabase;
        }
	};
    xhr1.send();

    //mengambil total skor dari database
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', '../data/ambil_skor.php?skorKeseluruhan', true);
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            var skorKeseluruhanDariDatabase = parseInt(xhr2.responseText);
            document.getElementById("jumlahSkor").innerHTML = String(skorKeseluruhanDariDatabase).padStart(2, '0');
            keseluruhanSkor = skorKeseluruhanDariDatabase;
        }
    };

    xhr2.send();
	parent.document.body.style.backdropFilter = "blur(5px)";
	document.getElementById("lanjut").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'hidden';
	document.getElementById("petunjuk").style.display = 'block';
};

function animateNumber() {
	const animasiSkor = document.getElementById('jumlahSkor');
    animasiSkor.style.animation = 'none';
    void animasiSkor.offsetWidth; // Reset animation
      
    animasiSkor.style.animation = 'slideIn 1s forwards';
}
//fungsi ketika resume
function isResume(){
	parent.document.body.style.backdropFilter = "none";
	document.getElementById("popupJeda").style.display = 'none';
	document.getElementById("lanjut").style.visibility = 'hidden';
	document.getElementById("pilihan1").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'visible';
	document.getElementById("pilihan2").style.visibility = 'visible';
	generateQA();
	document.getElementById("petunjuk").style.display = 'none';
}

//fungsi ketika jeda
function isPause(){
	document.getElementById("pilihan1").style.visibility = 'hidden';
	document.getElementById("pilihan2").style.visibility = 'hidden';
	document.getElementById("jeda").style.visibility = 'hidden';
	document.getElementById("popupJeda").style.display = 'block';
	parent.document.body.style.backdropFilter = "blur(5px)";
	document.getElementById("lanjut").style.visibility = 'visible';
}

//ketika selesai
function isDone(){
	document.getElementById("pilihan1").style.visibility = 'hidden';
	document.getElementById("pilihan2").style.visibility = 'hidden';
	document.getElementById("pertanyaan").style.display = 'none'
	document.getElementById("selesai").style.visibility ='visible'	;
	document.getElementById("bnext").style.visibility = 'visible';
	frameSuccess.style.display = 'block';
	nilaiDiFrame();
	tampilinJumlahSoal();
	suaraBelakang.volume = 0.8;
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
  	suaraBelakang.volume = 0.3;
});

buttons.forEach(button => {
	button.addEventListener("click", () => {
		suara.play();
	});
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
	}
}
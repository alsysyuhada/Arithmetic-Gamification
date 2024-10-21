var totalJawabanBenar = 0;
var jumlahSoal = 0;
var pilihanBenar;
var x;
var y;
var next = document.getElementById("bnext");
var jeda = document.getElementById("jeda");
var resume = document.getElementById("lanjut");
var skorDiSini = 0;
var keseluruhanSkor =0;
const suaraBelakang = document.getElementById('suara-belakang');
let posisiSuaraBelakang = 0;
const buttons = document.querySelectorAll("button");
var skorBermain = 0;
var suara = document.getElementById("suara-tombol");
const gambarBenar = document.getElementById("gambar-benar");
const gambarSalah = document.getElementById("gambar-salah");
var frameSuccess = document.getElementById("success-div4");
var petunjuk = document.getElementById("petunjuk");

// membuat button jeda, resume, next berfungsi
// next.addEventListener("click", openNextLevel);

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

// buat angka acak max dan min
function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//buat soal random dan tampilkan
function generateQA(){
		x = generateRandomNumber(1, 50);
		y = generateRandomNumber(6, 10);
	var soal  = Math.floor(x/y);
	//cek bilangan desimal
	while (x % y !=0 || soal > 10) {
		x = generateRandomNumber(1,50);
		y = generateRandomNumber(6,10);
		soal = Math.floor(x/y);
	}
	document.getElementById("pertanyaan").innerHTML = soal;

// membuat pilihan yang benar dan hasilPenjumlahan
	var pilihanBenar = Math.round(Math.random()+1);
	document.getElementById("pilihan"+pilihanBenar).innerHTML = x+"÷"+y;
	var hasilPenjumlahan = [x+"÷"+y];

//membuat pilihan salah
	for(i=1; i<3; i++){
		if(i != pilihanBenar){
			var pilihanSalah1;
			var pilihanSalah12;
			do{
				do{
					pilihanSalah1 = ((Math.round(Math.random()*9)+1));
					pilihanSalah2 = ((Math.round(Math.random()*9)+1));
				} while (pilihanSalah1<=pilihanSalah2);
			}while (hasilPenjumlahan.indexOf(pilihanSalah1)>-1)
			document.getElementById("pilihan"+i).innerHTML = pilihanSalah1 + "÷" + pilihanSalah2 ;
			hasilPenjumlahan.push(pilihanSalah1);
		}
	}
}

// menjawab soal
for (i=1; i<3; i++){
	document.getElementById("pilihan"+i).onclick = function (){
	//jika menjawab benar
		if (this.innerHTML == x+"÷"+y) {
			skorDiSini=10;
			keseluruhanSkor += skorDiSini;
			skorBermain += 10;
			document.getElementById("jumlahSkor").innerHTML =keseluruhanSkor;
			totalJawabanBenar++;
			skorLevel4Pembagian += 10;
			animateNumber();
			menjawabBenar();
			jumlahSoal++;
			generateQA();
			kirimNilai();
		}else {
			jumlahSoal++;
			generateQA();
			menjawabSalah();
		}
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

function animateNumber() {
	const animasiSkor = document.getElementById('jumlahSkor');
    animasiSkor.style.animation = 'none';
    void animasiSkor.offsetWidth; // Reset animation
      
    animasiSkor.style.animation = 'slideIn 1s forwards';
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
                console.log('Nilai skorLevel4Pembagian berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim nilai skorLevel4Pembagian');
            }
        }
    };
    xhr1.send('skorLevel4Pembagian=' + encodeURIComponent(skorLevel4Pembagian));
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

    //mengambil skor level4 Pembagian dari database
	var xhr1 = new XMLHttpRequest();
	xhr1.open('GET', '../data/ambil_skor.php?ambilSkorLevel4Pembagian', true);
	xhr1.onreadystatechange = function(){
		if (xhr1.readyState === 4 && xhr1.status === 200) {
            var skorLevel4DariDatabase = parseInt(xhr1.responseText);
            skorLevel4Pembagian = skorLevel4DariDatabase;
        }
	};
    xhr1.send();
    ubahGambarPetunjuk();
    parent.document.body.style.backdropFilter = "blur(5px)";
	document.getElementById("lanjut").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'hidden';
	petunjuk.style.display = 'block';
};

// buat tombol selanjutnya membuka level selanjutnya
function openNextLevel(){
	const suara = document.getElementById("suara-tombol");
	suara.play();
	setTimeout(function(){
		window.location= "pembagian.php";
	}, suara.duration * 2000);
	var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '../data/simpan_progres.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            console.log(xhr1.responseText);
            if (xhr1.status === 200) {
                console.log('Progres level4 Pembagian berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim progres level');
            }
        }
    };
    xhr1.send('progresLevel4Pembagian=');
}

//fungsi ketika resume
function isResume(){
	parent.document.body.style.backdropFilter = "none";
	document.getElementById("popupJeda").style.visibility = 'hidden';
	document.getElementById("lanjut").style.visibility = 'hidden';
	document.getElementById("jeda").style.visibility = 'visible';
	document.getElementById("pilihan1").style.visibility = 'visible';
	document.getElementById("pilihan2").style.visibility = 'visible';
	generateQA();
	petunjuk.style.display = 'none';
}

//fungsi ketika jeda
function isPause(){
	document.getElementById("pilihan1").style.visibility = 'hidden';
	document.getElementById("pilihan2").style.visibility = 'hidden';
	document.getElementById("lanjut").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'hidden';
	document.getElementById("popupJeda").style.visibility = 'visible';
	parent.document.body.style.backdropFilter = "blur(5px)";
}
//ketika selesai
function isDone(){
	document.getElementById("pertanyaan").style.display = 'none'
	document.getElementById("selesai").style.visibility ='visible';
	document.getElementById("bnext").style.visibility = 'visible';
	document.getElementById("pilihan1").style.visibility = 'hidden';
	document.getElementById("pilihan2").style.visibility = 'hidden';
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
  	suaraBelakang.volume = 0.2;
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
	  var elemPiala = frameDocument.getElementById("piala");
	  if (elemPiala){
	  	elemPiala.style.background = 'url("../gambar/ppembagianfull.png") no-repeat center';
	  	elemPiala.style.backgroundSize = '85%';
	  }
	}
}

function ubahGambarPetunjuk(){
	if(petunjuk){
		var frameDocument = petunjuk.contentDocument || petunjuk.contentWindow.document;

		var elem = frameDocument.body;
		if (elem) {
			elem.style.backgroundImage = 'url("../gambar/petunjuk_divLevel4.png")'
		}
	}
}
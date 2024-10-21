var intervalWaktu;
var waktuMulai = 1;
var waktu = waktuMulai *60;
var jawabanBenar;
var jawaban;
var menit;
var detik;
var waktuMundur = document.getElementById('countdown');
var jeda = document.getElementById("jeda");
var resume = document.getElementById("lanjut");
var next = document.getElementById("bnext");
var skorDiSini = 0;
var keseluruhanSkor =0;
var skorBermain = 0;
const suaraBelakang = document.getElementById('suara-belakang');
let posisiSuaraBelakang = 0;
const buttons = document.querySelectorAll("button");
var suara = document.getElementById("suara-tombol");
var skorLevel1Pembagian = 0;
const gambarBenar = document.getElementById("gambar-benar");
const gambarSalah = document.getElementById("gambar-salah");
var frameSuccess = document.getElementById("success-div1");
var petunjuk = document.getElementById("petunjuk");
var jumlahSoal = 0;
var totalJawabanBenar = 0;

//membuat jeda
function jedaWaktu(){
	resume.disabled = false;
	jeda.disabled = true;
	clearInterval(intervalWaktu);
	isPause();
}

//membuat waktu mundur
function startCountdown(){
	isResume();
	intervalWaktu = setInterval(function(){
		menit = Math.floor(waktu / 60);
		detik = waktu % 60;
		detik = detik < 10 ? '0' + detik : detik;
		menit = menit < 10 ? '0' + menit : menit;
		countdown.innerHTML = menit + ':' +detik;
		waktu--;
		resume.disabled = true;
		jeda.disabled = false;
		waktuHabis();
	}, 1000);
	generateQA();
	petunjuk.style.display = 'none';
	parent.document.body.style.backdropFilter = "none";
}

// membuat button jeda, resume, next berfungsi
jeda.addEventListener("click", jedaWaktu);
resume.addEventListener("click", startCountdown);
next.addEventListener("click", openNextLevel);

//fungsi waktu berhenti
function stopCountdown(){
	clearInterval(intervalWaktu);
}

// Fungsi untuk menghasilkan angka acak antara dua nilai
function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//buat soal random
function generateQA(){
	var x = generateRandomNumber(1, 50);
	var y = generateRandomNumber(1, 5);
	jawabanBenar = Math.floor(x/y);
//cek bilangan desimal
	while (x % y !=0 || jawabanBenar > 10) {
		x = generateRandomNumber(1,50);
		y = generateRandomNumber(1,5);
		jawabanBenar = Math.floor(x/y);
	}
	document.getElementById("pertanyaan").innerHTML = x + "÷" + y + "=";

// membuat pilihan yang benar dan jawaban
	var pilihanBenar = Math.round(Math.random()+1);
	document.getElementById("pilihan"+pilihanBenar).innerHTML = jawabanBenar;

	var jawaban = [jawabanBenar];

//membuat pilihan salah
	for(i=1; i<3; i++){
		if(i != pilihanBenar){
			var pilihanSalah;
			do{
				do{
					pilihanSalah = Math.floor((generateRandomNumber(1, 50)/generateRandomNumber(2, 10)));
				} while (pilihanSalah == 0 || pilihanSalah > 10);
			}while (jawaban.indexOf(pilihanSalah)>-1)
			document.getElementById("pilihan"+i).innerHTML = pilihanSalah;
			jawaban.push(pilihanSalah);
		}
	}
}

// menjawab soal
for (i=1; i<3; i++){
	document.getElementById("pilihan"+i).onclick = function (){
	//jika menjawab benar
		if (this.innerHTML == jawabanBenar) {
			skorDiSini=10;
			keseluruhanSkor += skorDiSini;
			skorBermain += 10;
			document.getElementById("jumlahSkor").innerHTML =keseluruhanSkor;
			totalJawabanBenar++;
			jumlahSoal++;
			skorLevel1Pembagian += 10;
			animateNumber();
			menjawabBenar();
			generateQA();
			kirimNilai();
		}else {
			jumlahSoal++;
			menjawabSalah();
			generateQA();
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
                console.log('Progres level1 Pembagian berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim progres level');
            }
        }
    };
    xhr1.send('progresLevel1Pembagian=');
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
                console.log('Nilai skorLevel1Pembagian berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim nilai skorLevel1Pembagian');
            }
        }
    };
    xhr1.send('skorLevel1Pembagian=' + encodeURIComponent(skorLevel1Pembagian));
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

    //mengambil skor level1 Pembagian dari database
	var xhr1 = new XMLHttpRequest();
	xhr1.open('GET', '../data/ambil_skor.php?ambilSkorLevel1Pembagian', true);
	xhr1.onreadystatechange = function(){
		if (xhr1.readyState === 4 && xhr1.status === 200) {
            console.log(xhr1.responseText);
            var skorLevel1DariDatabase = parseInt(xhr1.responseText);
            skorLevel1Pembagian = skorLevel1DariDatabase;
        }
	};
    xhr1.send();
    ubahGambarPetunjuk();
	document.getElementById("lanjut").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'hidden';
	petunjuk.style.display = 'block';
	parent.document.body.style.backdropFilter = "blur(5px)";
};

//fungsi waktu habis
function waktuHabis(){
	if (menit == 0 & detik == 0){
	stopCountdown();
	countdown.innerHTML = "00:00";
	clearInterval(intervalWaktu);
	document.getElementById("jeda").style.visibility = 'hidden';
	document.getElementById("pilihan1").style.visibility = 'hidden';
	document.getElementById("pilihan2").style.visibility = 'hidden';
	document.getElementById("bnext").style.visibility = 'visible';
	document.getElementById("selesai").style.visibility = 'visible';
	document.getElementById("pertanyaan").style.visibility = 'hidden';
	frameSuccess.style.display = 'block';
	nilaiDiFrame();
	tampilinJumlahSoal();
	suaraBelakang.volume = 0.8;
	}
}

//fungsi ketika resume
function isResume(){
	parent.document.body.style.backdropFilter = "none";
	document.getElementById("popupJeda").style.visibility = 'hidden';
	document.getElementById("lanjut").style.visibility = 'hidden';
	document.getElementById("pilihan1").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'visible';
	document.getElementById("pilihan2").style.visibility = 'visible';
}

//fungsi ketika jeda
function isPause(){
	document.getElementById("pilihan1").style.visibility = 'hidden';
	document.getElementById("pilihan2").style.visibility = 'hidden';
	document.getElementById("jeda").style.visibility = 'hidden';
	document.getElementById("popupJeda").style.visibility = 'visible';
	parent.document.body.style.backdropFilter = "blur(5px)";
	document.getElementById("lanjut").style.visibility = 'visible';
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
	  	elemPiala.style.background = 'url("../gambar/ppembagian1.png") no-repeat center';
	  	elemPiala.style.backgroundSize = '85%';
	  }
	}
}

function ubahGambarPetunjuk(){
	if(petunjuk){
		var frameDocument = petunjuk.contentDocument || petunjuk.contentWindow.document;

		var elem = frameDocument.body;
		if (elem) {
			elem.style.backgroundImage = 'url("../gambar/petunjuk_divLevel1.png")'
		}
	}
}
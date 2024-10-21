var intervalWaktu;
var waktuMulai = 1;
var waktu = waktuMulai *60;
var jawaban;
var jawabanBenar;
var waktuMundur = document.getElementById('countdown');
var jeda = document.getElementById("jeda");
var resume = document.getElementById("lanjut");
var menit;
var detik;
var next = document.getElementById("bnext");
var skorDiSini;
var keseluruhanSkor = 0;
const suaraBelakang = document.getElementById('suara-belakang');
let posisiSuaraBelakang = 0;
const buttons = document.querySelectorAll("button");
var suara = document.getElementById("suara-tombol");
var skorLevel2Penjumlahan = 0;
var skorBermain = 0;
const gambarBenar = document.getElementById("gambar-benar");
const gambarSalah = document.getElementById("gambar-salah");
var frameSuccess = document.getElementById("success-add2");
var framePetunjuk = document.getElementById("petunjuk");
var jumlahSoal = 0;
var totalJawabanBenar = 0;

//membuat jeda
function jedaWaktu(){
	resume.disabled = false;
	jeda.disabled = true;
	clearInterval(intervalWaktu);
	isPause();
}

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
	document.getElementById("petunjuk").style.display = 'none';
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

//buat soal random
function generateQA(){
	
	var x = Math.round(Math.random()*4)+1;
	var y = Math.round(Math.random()*9)+1;
	jawabanBenar = x + y;
	document.getElementById("pertanyaan").innerHTML = x + "+" + y + "=";

// membuat pilihan yang benar dan jawaban
	var pilihanBenar = Math.round(Math.random()+1);
	document.getElementById("pilihan"+pilihanBenar).innerHTML = jawabanBenar;

	var jawaban = [jawabanBenar];

//membuat pilihan salah
	for(i=1; i<3; i++){
		if(i != pilihanBenar){
			var pilihanSalah;
			do{
				pilihanSalah = ((Math.round(Math.random()*9)+2));
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
			document.getElementById("jumlahSkor").innerHTML = keseluruhanSkor;
			
			jumlahSoal++;
			skorBermain += 10;
			skorLevel2Penjumlahan += 10;
			menjawabBenar();
			animateNumber();
			generateQA();
			kirimNilai();
			totalJawabanBenar++;
		}else {
			menjawabSalah();
			generateQA();
			jumlahSoal++;
		}

	}
}

//suara salah
function menjawabSalah () {
	const suara = document.getElementById("suara-salah");
	suara.play();
	suara.currentTime = 0;

	animateFadeIn(gambarSalah);
    gambarBenar.style.display = "none"; // Sembunyikan gambar benar
}

//suara ketika jawab benar
function menjawabBenar(){
	const suara = document.getElementById("suara-benar");
	suara.play();
	suara.currentTime = 0;
	animateFadeIn(gambarBenar);
    gambarSalah.style.display = "none"; // Sembunyikan gambar salah
}

// buat tombol selanjutnya membuka level selanjutnya
function openNextLevel(){
	const suara = document.getElementById("suara-tombol");
	suara.play();
	setTimeout(function(){
		window.location= "penjumlahan.php";
	}, suara.duration * 2000);

	var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '../data/simpan_progres.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            console.log(xhr1.status);
            console.log(xhr1.responseText);
            if (xhr1.status === 200) {
                console.log('Progres level2 penjumlahan berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim progres level');
            }
        }
    };
    xhr1.send('progresLevel2Penjumlahan=');
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
                console.log('Nilai skorLevel2Penjumlahan berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim nilai skorLevel2Penjumlahan');
            }
        }
    };
    xhr1.send('skorLevel2Penjumlahan=' + encodeURIComponent(skorLevel2Penjumlahan));

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
	//mengambil skor level2 penjumlhan dari database
	var xhr1 = new XMLHttpRequest();
	xhr1.open('GET', '../data/ambil_skor.php?ambilSkorLevel2Penjumlahan', true);
	xhr1.onreadystatechange = function(){
		if (xhr1.readyState === 4 && xhr1.status === 200) {
            var skorLevel2DariDatabase = parseInt(xhr1.responseText);
            skorLevel2Penjumlahan = skorLevel2DariDatabase;
            console.log(skorLevel2Penjumlahan);
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
	document.getElementById("lanjut").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'hidden';
	document.getElementById("petunjuk").style.display = 'block';
	parent.document.body.style.backdropFilter = "blur(5px)";
};

//animasi jawab benar
function animateNumber() {
	const animasiSkor = document.getElementById('jumlahSkor');
    animasiSkor.style.animation = 'none';
    void animasiSkor.offsetWidth; // Reset animation
      
    animasiSkor.style.animation = 'slideIn 1s forwards';
}

function tampilinJumlahSoal() {
	var jawabanBenarElement = document.getElementById("soal-benar");
	jawabanBenarElement.style.display = 'inline-flex';
	jawabanBenarElement.innerHTML = "Soal yang dijawab benar: " + totalJawabanBenar;

	var jumlahSoalElement = document.getElementById("jumlah-soal");
	jumlahSoalElement.style.display = 'inline-flex';
	jumlahSoalElement.innerHTML = "&nbsp dari " +  jumlahSoal + " soal";
}

//fungsi waktu habis
function waktuHabis(){
	if (menit == 0 & detik == 0){
	stopCountdown();
	countdown.innerHTML = "00:00";
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
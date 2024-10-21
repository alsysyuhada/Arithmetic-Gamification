var skorDiSini = 0;
var keseluruhanSkor = 0;
let posisiSuaraBelakang = 0;
var skorLevel1Penjumlahan = 0;

let generatedNumbers = [];
let maxBoxes;
const puzzle = document.getElementById('puzzle');

var jeda = document.getElementById("jeda");
var resume = document.getElementById("lanjut");
var next = document.getElementById("bnext");
const animasiSkor = document.getElementById('jumlahSkor');
const suaraBelakang = document.getElementById('suara-belakang');
const buttons = document.querySelectorAll("button");
var suara = document.getElementById("suara-tombol");

//memanggil nomor acak dengan range tertentu
function getRandomRange() {
	maxBoxes = 20;
    generatedNumbers = [];

    // Generate the random range of 20 numbers.
    const rangeStart = Math.floor(Math.random() * 80) + 1; // Generate a random starting number between 1 and 80.
    const rangeEnd = rangeStart + 19; // Create a range of 20 numbers.

    // Randomly choose two positions within the range.
    const firstPosition = Math.floor(Math.random() * 20);
    const secondPosition = (firstPosition + 1 + Math.floor(Math.random() * 18)) % 20;

    for (let i = 1; i <= maxBoxes; i++) {
        if (i === firstPosition || i === secondPosition) {
            // Fill the chosen positions with sorted numbers within the specified rFange.
            const sortedNumber = rangeStart + i - 1;
            generatedNumbers.push(sortedNumber);
        } else {
            generatedNumbers.push(null); // Leave other boxes empty.
        }
    }

    displayNumbers();

	document.getElementById("bnext").style.visibility ='hidden';
	document.getElementById("selesai").style.visibility ='hidden';
	document.getElementById("success-add1").style.display = 'none';
	suaraBelakang.volume = 0.2;
	document.getElementById("check").style.visibility = 'visible';
}

//tampilin angka acak 
function displayNumbers(){
 puzzle.innerHTML = '';

    generatedNumbers.forEach((number, index) => {
        const cell = document.createElement('input');
        cell.type = 'text';
        cell.maxLength = 2;
        cell.classList.add('jawaban-cell');

        if (number !== null) {
            cell.value = number;
            cell.disabled = true; // Disable the input fields for sorted numbers.
        } else {
            cell.value = '';
            cell.placeholder = '_';
        }

        puzzle.appendChild(cell);
    });
}

//cek nomor apakah udah urut
function checkOrder() {

  const inputCells = puzzle.querySelectorAll('.jawaban-cell');
  const inputValue = inputCells.value;
    let isCorrect = true;
    let userInputArray = [];

    inputCells.forEach((cell) => {
        const userInput = parseInt(cell.value, 10);

        if (!isNaN(userInput) && userInput >= 1 && userInput <= 100) {
            userInputArray.push(userInput);
        }
    });
    
	if(isCorrectOrder(userInputArray) && userInputArray.length === maxBoxes){
		isDone();
        inputCells.forEach((cell) => {
            cell.value = cell.value; 
            cell.disabled = true;
        });
	} else {
        setTimeout(function() {
            document.getElementById("tidak-urut").style.display = 'block';
            document.getElementById("suara-salah").play();
            setTimeout(function() {
                document.getElementById("tidak-urut").style.display = 'none';
            }, 1000);
      }, 1000);
    }
}

//cek user input urutan bener
function isCorrectOrder(arr){

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      return false;
    }
  }
  return true;
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
                console.log('Nilai skorLevel1Penjumlahan berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim nilai skorLevel1Penjumlahan');
            }
        }
    };
    xhr1.send('skorLevel1Penjumlahan=' + encodeURIComponent(skorLevel1Penjumlahan));

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

function isDone () {
	skorDiSini = 100;
		keseluruhanSkor += skorDiSini;
		document.getElementById("selesai").style.visibility = 'visible';
		document.getElementById("bnext").style.visibility = 'visible';
		document.getElementById("check").style.display = 'none';
		document.getElementById("jumlahSkor").innerHTML = keseluruhanSkor;
		document.getElementById("success-add1").style.display = 'block';
		document.getElementById("jeda").style.visibility = 'hidden';
		skorLevel1Penjumlahan += 100;
		suaraJawabBenar();
		
		animateNumber();
		suaraBelakang.volume = 0.8;
		kirimNilai();
}

window.onload = function(){
	//mengambil skor level1 penjumlhan dari database
	var xhr1 = new XMLHttpRequest();
	xhr1.open('GET', '../data/ambil_skor.php?ambilSkorLevel1Penjumlahan', true);
	xhr1.onreadystatechange = function(){
		if (xhr1.readyState === 4 && xhr1.status === 200) {
            var skorLevel1DariDatabase = parseInt(xhr1.responseText);
            skorLevel1Penjumlahan = skorLevel1DariDatabase;
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

// buat tombol selanjutnya membuka level selanjutnya
function openNextLevel(){
	setTimeout(function(){
		window.location= "Penjumlahan.php";
		}, suara.duration * 2000);
	var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '../data/simpan_progres.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            // console.log(xhr1.status);
            console.log(xhr1.responseText);
            if (xhr1.status === 200) {
                console.log('Progres level 1 penjumlahan berhasil dikirim');
            } else {
                console.log('Terjadi kesalahan saat mengirim progres dialog');
            }
        }
    };
    xhr1.send('progresLevel1Penjumlahan=');
}

//membuat jeda
function jedaPermainan(){
	resume.disabled = false;
	jeda.disabled = true;
	isPause();
}

//fungsi ketika jeda
function isPause(){
	document.getElementById("check").style.visibility = 'hidden';
	document.getElementById("generate").style.visibility = 'hidden';
	document.getElementById("lanjut").style.visibility = 'visible';
	document.getElementById("jeda").style.visibility = 'hidden';
	document.getElementById("popupJeda").style.visibility = 'visible';
	parent.document.body.style.backdropFilter = "blur(5px)";
	document.getElementById("puzzle").style.visibility = 'hidden';
}

//ketika resume
function isResume(){
	parent.document.body.style.backdropFilter = "none";
	document.getElementById("popupJeda").style.visibility = 'hidden';
	document.getElementById("lanjut").style.visibility = 'hidden';
	document.getElementById("jeda").style.visibility = 'visible';
	document.getElementById("check").style.visibility = 'visible';
	document.getElementById("generate").style.visibility = 'visible';
	document.getElementById("petunjuk").style.display = 'none';
	document.getElementById("puzzle").style.visibility = 'visible';
}

//membuat resume
function resumePermainan(){
	resume.disabled = true;
	jeda.disabled = false;
	isResume();
}

function animateNumber() {
    animasiSkor.style.animation = 'none';
    void animasiSkor.offsetWidth; // Reset animation
      
    animasiSkor.style.animation = 'slideIn 1s forwards';
}

// sound ketika jawab benar
function suaraJawabBenar(){
	const suara = document.getElementById("suara-benar");
	suara.play();
	suara.currentTime = 0;
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

// document.addEventListener("dragstart", function (event) {
//     if (event.target.classList.contains("draggable")) {
//         event.dataTransfer.effectAllowed = "move";
//         event.dataTransfer.setData("text/plain", event.target.textContent);
//         event.target.style.cursor = "grabbing"; // Mengubah kursor menjadi "grabbing" saat elemen di-drag
//     }
// });


// document.addEventListener("dragend", function (event) {
//     if (event.target.classList.contains("draggable")) {
//         event.target.style.cursor = "grab"; // Mengembalikan kursor ke "grab" setelah drag selesai
//     }
// });


getRandomRange();
jeda.addEventListener("click", jedaPermainan);
resume.addEventListener("click", resumePermainan);
next.addEventListener("click", openNextLevel);
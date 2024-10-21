<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="Style/popupjedaa.css">
</head>
<body>
	<h1> Matematika </h1>
	<div class="container">
		<button class="homep" onclick="keHome()">
		</button>
		<button class="backp" onclick="kembali()"> 
		</button>
	    <audio id="suara-tombol" src="Sound/tombol.mp3"></audio>
	</div>

	<script>
	var suara = document.getElementById("suara-tombol");

	function kembali(){
		suara.play();
		setTimeout(function(){
			parent.history.back();
		}, suara.duration * 2000);		
	}

	//Suara button
	function keHome(){
		suara.play();
		setTimeout(function(){
			parent.window.location='index.php';
		}, suara.duration * 2000);
	}

	</script>
</body>
</html>
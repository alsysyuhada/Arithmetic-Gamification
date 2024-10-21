const buttons = document.querySelectorAll("button");
var suara = document.getElementById("suara-tombol");

buttons.forEach(button => {
	button.addEventListener("click", () => {
		suara.play();
	});
});	
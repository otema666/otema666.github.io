window.onbeforeunload = function() {
    return true;
};

function aceptar() {
	document.getElementById("contenido").style.display = "block";
	document.getElementById("mensaje").style.display = "none";
	document.documentElement.requestFullscreen();
}
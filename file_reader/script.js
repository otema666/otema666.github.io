function updateSelectedFile() {
  const fileInput = document.getElementById('txt-file');
  const selectedFile = document.getElementById('selected-file');
  const fileName = fileInput.files[0].name;
  const fileExtension = fileName.split('.').pop();

  const fileTypeNames = { // Objeto que asocia extensiones de archivo con nombres de tipo correspondientes
    js: 'javascript',
    txt: 'texto',
    md: 'markdown'
  };

  const fileType = fileTypeNames[fileExtension] || fileExtension; // Buscamos la extensión del archivo en el objeto y mostramos el nombre de tipo correspondiente, o la extensión si no se encuentra en el objeto

  selectedFile.innerHTML = `Archivo: <span style="color:#34abeb">'<strong>${fileName}</strong>'</span>; tipo: <span style="color: #61C398"><em>${fileType}</em></span>.`;
}

function startLoadingAnimation() {
  const processBtn = document.getElementById("process-btn");

  // Ocultar el botón y mostrar la barra de carga
  processBtn.classList.add("hidden");
  document.getElementById("loader-container").classList.remove("hidden");

  // Iniciar la animación de la barra de carga
  document.getElementById("loader").style.animation = "loading 1.8s ease-in-out forwards, change-color 1.8s ease-in-out forwards";
}

function stopLoadingAnimation() {
  const processBtn = document.getElementById("process-btn");

  // Mostrar el botón y ocultar la barra de carga
  processBtn.classList.remove("hidden");
  document.getElementById("loader-container").classList.add("hidden");

  // Reiniciar la animación de la barra de carga
  document.getElementById("loader").style.animation = "none";
  document.getElementById("loader").offsetHeight;
  document.getElementById("loader").style.animation = "loading 1.8s ease-in-out forwards";
}

function processFile() {
  const fileInput = document.getElementById("txt-file");
  const file = fileInput.files[0];

  if (!file) {
    alert("⚠️ Debes seleccionar un archivo para poder procesarlo. ⚠️");
    return;
  }
  const caja1 = document.getElementById("caja1");
  const caja_result = document.getElementById("result-container");
  const restart = document.getElementById("reset_button");
  const reader = new FileReader();

  reader.onload = function (event) {
    caja_result.classList.remove("hidden");
    caja1.classList.add("hidden");
    restart.classList.remove("hidden");


    const resultElement = document.getElementById("result");
    const lines = event.target.result.split("\n");
    resultElement.innerHTML = lines.map((line, index) => `<span class="line-number">Línea ${index + 1}:</span> <span class="result"> ${line}</span>`).join("<br>");
  };

  reader.readAsText(file);
}

const fileInput = document.getElementById("txt-file");
const processBtn = document.getElementById("process-btn");

fileInput.addEventListener("change", function() {
  if (this.files.length > 0) {
    processBtn.classList.remove("disabled");
    processBtn.classList.add("enabled");
    processBtn.disabled = false;
    updateSelectedFile();

    // Comenzar la animación de la barra de carga
    startLoadingAnimation();

    // Después de 3 segundos, detener la animación de la barra de carga
    setTimeout(function() {
      stopLoadingAnimation();
    }, 1800);
  } else {
    processBtn.classList.remove("enabled");
    processBtn.classList.add("disabled");
    processBtn.disabled = true;
  }
});

function reset() {
   if (confirm("¿Estás seguro de que deseas recargar la página?")) {
    location.reload();
  }
}

window.addEventListener("load", function() {
  fileInput.value = null;
});
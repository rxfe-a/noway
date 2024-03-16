//set original values

document.getElementById('Rammerhead').style.display = 'none';
document.getElementById('Node').style.display = 'none';


fetch('../config.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.isRammerheadEnabled == true) {
            document.getElementById('Rammerhead').style.display = 'flex';
        }
        if (data.isNodeUnblockerEnabled == true) {
            document.getElementById('Node').style.display = 'flex';
        }
      })
      .catch(error => {
        console.error('There was a problem fetching the config:', error);
      });



function SetOpenMethod(mode) {
  document.getElementById('OpenMethod').value = mode
}

document.getElementById('open').onclick = function () {
  SetOpenMethod('open')
  document.getElementById('open').style.backgroundColor = 'green';
  document.getElementById('ab').style.backgroundColor = 'rgb(34, 33, 33)';
  document.getElementById('direct').style.backgroundColor = 'rgb(34, 33, 33)';
}

document.getElementById('ab').onclick = function () {
  SetOpenMethod('ab')
  document.getElementById('open').style.backgroundColor = 'rgb(34, 33, 33)';
  document.getElementById('ab').style.backgroundColor = 'green';
  document.getElementById('direct').style.backgroundColor = 'rgb(34, 33, 33)';
}

document.getElementById('direct').onclick = function () {
  SetOpenMethod('direct')
  document.getElementById('open').style.backgroundColor = 'rgb(34, 33, 33)';
  document.getElementById('ab').style.backgroundColor = 'rgb(34, 33, 33)';
  document.getElementById('direct').style.backgroundColor = 'green';
}
//learn from your mistakes🤫

function ClearOthers() {
  document.getElementById('Dynamic').style.backgroundColor = 'rgb(26, 26, 26)';
  document.getElementById('Rammerhead').style.backgroundColor = 'rgb(26, 26, 26)';
  document.getElementById('Ultraviolet').style.backgroundColor = 'rgb(26, 26, 26)';
  document.getElementById('Node').style.backgroundColor = 'rgb(26, 26, 26)';
}

function SetProxyMode(mode) {
  document.getElementById('ProxySelection').value = mode
}

document.getElementById('Dynamic').onclick = function () {
  ClearOthers()
  document.getElementById('Dynamic').style.backgroundColor = 'green';
  SetProxyMode('Dynamic');
}

document.getElementById('Ultraviolet').onclick = function () {
  ClearOthers()
  document.getElementById('Ultraviolet').style.backgroundColor = 'green';
  SetProxyMode('uv');
}

document.getElementById('Rammerhead').onclick = function () {
  ClearOthers()
  document.getElementById('Rammerhead').style.backgroundColor = 'green';
  SetProxyMode('Rammerhead');
}

document.getElementById('Node').onclick = function () {
  ClearOthers()
  document.getElementById('Node').style.backgroundColor = 'green';
  SetProxyMode('Node');
}

function Fuerza() {
  document.getElementById('Browser').style.display = 'none';
  document.getElementById('Customize').style.display = 'none';
  document.getElementById('ProxySelection').style.display = 'none';
}

document.getElementById('partyparty').onclick = function () {
  Fuerza()
  document.getElementById('ProxySelection').style.display = 'flex';
}

document.getElementById('lashawtydicerarirari').onclick = function () {
  Fuerza()
  document.getElementById('Customize').style.display = 'flex';
}

document.getElementById('semeolvidotuname').onclick = function () {
  Fuerza()
  document.getElementById('Browser').style.display = 'flex';
}


function apply() {
  const WTheme = document.getElementById('themes').value;
  const WProxy = document.getElementById('ProxySelection').value;
  const WEngine = document.getElementById('searchengine').value;
  const WMode = document.getElementById('OpenMethod').value;
  var basicConfig = { 
      theme: WTheme || "main.css",
      proxy: WProxy || "uv",
      search_engine: WEngine || "https://google.com/search?q=%s",
      Mode: WMode|| "open"
     };
   
     var configString = JSON.stringify(basicConfig);
     localStorage.setItem('Client-LastVisited', configString);
}


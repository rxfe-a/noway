const form = document.getElementById("FormIdentification");
const address = document.getElementById("addressbox");
const searchEngine = document.getElementById("Engine");
const Configuration = JSON.parse(localStorage.getItem('Client-LastVisited'))
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = search(address.value, Configuration.search_engine);

  if (['open', 'direct'].includes(Configuration.Mode)) {
    let proxyUrl;
    switch (Configuration.proxy) {
      case 'uv':
        proxyUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
        window.parent.postMessage(`ReplaceURL('${url}')`, '*');
        break;
      case 'Dynamic':
        RegisterDN();
        proxyUrl = __dynamic$config.prefix + Ultraviolet.codec.xor.encode(url);
        break;
      case 'Rammerhead':
        localStorage.setItem('rh_target_url', url);
        window.parent.postMessage(`ReplaceURL('${url}')`, '*');
        proxyUrl = 'rammerhead.html';
        break;
      case 'Node':
        proxyUrl = `/webinstance/${url}`;
        window.parent.postMessage(`ReplaceURL('${url}')`, '*');
        break;
      default:
        alert('Invalid Proxy Configuration!');
        break;
    }
    if (Configuration.Mode == 'open') {
      window.location.href = proxyUrl;
      document.body.innerHTML = '';
    } else {
      window.open(proxyUrl);
    }
  } else if (Configuration.Mode == 'ab') {
    alert('Not finished yet. Please switch to another configuration to avoid this issue.');
  } else {
    console.error('Invalidation');
  }
  
});



function RegisterDN() {
  navigator.serviceWorker.register("../dynamic-sw.js", {
    scope: "/adventuring/"
  });
}

function FetchBare() {
  fetch(__uv$config.bare)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
       document.getElementById('ColorStatus').style.backgroundColor = 'rgb(0, 255, 0)';
      })
      .catch(error => {
        document.getElementById('ColorStatus').style.backgroundColor = 'rgb(255, 0, 0)';
      });
}
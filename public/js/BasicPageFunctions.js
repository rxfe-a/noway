document.getElementById('XB').onclick = function () {
    document.getElementById('tabmanagerc').style.display = 'none';
}

document.getElementById('TabHolder').onclick = function () {
    var TBMGR = document.getElementById('tabmanagerc');
    TBMGR.style.display = TBMGR.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('refreshbutton').onclick = function () {
    const TabIframe = document.getElementById(`${tabModule.ReturnTab()}_iframe`);
    TabIframe.contentDocument.location.reload();
}

function loadHomepage() {
  const TabIframe = document.getElementById(`${tabModule.ReturnTab()}_iframe`);
  TabIframe.src = 'homepage.html';
  document.getElementById('QuickHomeButton').style.display = 'none';
}

document.getElementById('homepage').onclick = loadHomepage;
document.getElementById('QuickAccessHome').onclick = loadHomepage;

document.getElementById('fullscreen').onclick = function () {
    const TabIframe = document.getElementById(`${tabModule.ReturnTab()}_iframe`);
    TabIframe.requestFullscreen();
}

document.getElementById('javascript_').onclick = function () {
    const TabIframe = document.getElementById(`${tabModule.ReturnTab()}_iframe`);
    const JSCode = prompt('Enter your JS/Bookmarklet Code:');
    const TabDocument = TabIframe.contentDocument;
    const Script = TabDocument.createElement('script');
    Script.textContent = 'eval(`' + JSCode +'`)';
    TabDocument.body.appendChild(Script);
}

document.getElementById('searchway').addEventListener("submit", async (event) => {
    event.preventDefault();
    const TabIframe = document.getElementById(`${tabModule.ReturnTab()}_iframe`);
    const url = search(document.getElementById('searchway_input').value, 'https://www.google.com/search?q=%s');
    TabIframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
  });

document.getElementById('Back').onclick = function () {
  const TabIframe = document.getElementById(`${tabModule.ReturnTab()}_iframe`);
    const TabDocument = TabIframe.contentDocument;
    const Script = TabDocument.createElement('script');
    Script.textContent = "window.history.back()";
    TabDocument.body.appendChild(Script);
}

document.getElementById('Forward').onclick = function () {
  const TabIframe = document.getElementById(`${tabModule.ReturnTab()}_iframe`);
    const TabDocument = TabIframe.contentDocument;
    const Script = TabDocument.createElement('script');
    Script.textContent = "window.history.forward()";
    TabDocument.body.appendChild(Script);
}

  function worker() {
    const SW = '../system-sw.js';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration(SW).then(function(registration) {
          if (!registration) {
            navigator.serviceWorker.register(SW, {
              scope: __uv$config.prefix
            }).then(function() {
              console.log('Service worker registered successfully.');
            }).catch(function(error) {
              console.error('Service worker registration failed:', error);
            });
          } else {
            console.log('Service worker already registered.');
          }
        }).catch(function(error) {
          console.error('Error checking service worker registration:', error);
        });
      } else {
        console.log('Service workers are not supported in this browser.');
      }
}

document.getElementById('ngg').onclick = function () {
  const ScriptURL = 'https://cdn.jsdelivr.net/gh/rxfe-a/aria-vercel-deploy@master/public/external/js/nowgg-patcher.js';
  const TabIframe = document.getElementById(`${tabModule.ReturnTab()}_iframe`);
    const TabDocument = TabIframe.contentDocument;
    const Script = TabDocument.createElement('script');
    Script.src = ScriptURL;
    TabDocument.body.appendChild(Script);
}

document.getElementById('inspectelement').onclick = function () {
  const TabIframe = document.getElementById(`${tabModule.ReturnTab()}_iframe`);
    const TabDocument = TabIframe.contentDocument;
    const Script = TabDocument.createElement('script');
    Script.textContent = `javascript:(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/npm/eruda"; document.body.append(script); script.onload = function () { eruda.init(); } })();`;
    TabDocument.body.appendChild(Script);
}


document.body.onload = function () {
    worker();
    RegisterDN();
    tabModule.NewTab();
}


if (localStorage.getItem('Client-LastVisited')) {
  //
} else {
  var basicConfig = { 
    theme: "main.css",
    proxy: "uv",
    search_engine: "https://google.com/search?q=%s",
    Mode: "open"
   };
 
   var configString = JSON.stringify(basicConfig);
   localStorage.setItem('Client-LastVisited', configString);
}


function RegisterDN() {
  navigator.serviceWorker.register("../dynamic-sw.js", {
    scope: "/adventuring/"
  });
}
function convertJSONToHTML(jsonData) {
    let html = '';
    jsonData.forEach(function(app) {
        html += `<div class="App" onclick="OpenApp('${app.URL}')" id="${app.Name}">
                    <img alt="AppLogo" src="${app.Icon}">
                    <p>${app.Name}</p>
                </div>`;
    });
    return html;
}


function OpenApp(app) {
    window.parent.postMessage(`ReplaceURL('${app}')`, '*');
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(app);
    window.parent.postMessage(`document.getElementById('QuickHomeButton').style.display = 'flex'`, '*');
}

document.body.onload = function () {
    fetch('/js/gs-list.json')
    .then(response => response.json())
    .then(jsonData => {
        const htmlOutput = convertJSONToHTML(jsonData);
        const holderElement = document.getElementById('Holder');
        holderElement.innerHTML = htmlOutput;
    })
    .catch(error => console.error('Error fetching JSON:', error));
}
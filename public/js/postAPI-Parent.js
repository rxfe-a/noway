window.addEventListener('message', function(event) {
    eval(event.data)
});

function blow() {
    document.body.innerHTML = '';
}

function ReplaceURL(base) {
    document.getElementById('searchway_input').value = base
}

function ShowHome() {
    document.getElementById('QuickHomeButton').style.display = 'flex';
}
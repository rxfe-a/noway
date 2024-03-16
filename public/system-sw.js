importScripts('build/bundle.js');
importScripts('build/config.js');
importScripts('build/sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes("network/build/client.js") || event.request.url.includes("network/build/bundle.js") || event.request.url.includes("network/build/config.js") || event.request.url.includes("network/build/handler.js")) {
       event.respondWith(
        (async () => {
            fetch(event.request.url.replace("network/", ""));
        })
       )
        
    } else {
        event.respondWith(sw.fetch(event));
    }
})
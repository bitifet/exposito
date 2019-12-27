// Client/pwa/serviceWorker.js
// ===========================


// Example from https://medium.com/dev-channel/learn-how-to-build-a-pwa-in-under-5-minutes-c860ad406ed
//
// NOT WORKING But its because of Webpack overhead.
// (Tested with raw copy and at least it gets executed)
//
// OPTIONS:
//   * Check how to raw-copy a file from webpack to dist directory.

console.log("ooooooooooooooo");

var cacheName = 'hello-world-page';
var filesToCache = [
  '/',
  '/index.html',
  '/hello-world.css'
];self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});


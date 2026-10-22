self.addEventListener('install', (event) => {
  console.log('Service Worker installato con successo');
});

self.addEventListener('fetch', (event) => {
  // Gestione base delle richieste di rete
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
// Service Worker principale (sw.js)
const CACHE_NAME = 'diario-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Gestione notifiche push standard (ignora se gestite da FCM)
self.addEventListener('push', (event) => {
  if (event.data) {
    try {
      const data = event.data.json();
      // Se il messaggio arriva da FCM, non mostrare la notifica generica "Sito aggiornato"
      if (data.fcmOptions || data.notification) {
        return; 
      }
      const title = data.title || 'Nuovo messaggio ❤️';
      const options = {
        body: data.body || '',
        icon: 'icon-192.png',
        badge: 'icon-192.png'
      };
      event.waitUntil(self.registration.showNotification(title, options));
    } catch (e) {
      // Se il dato non è JSON valido, ignora per evitare la notifica "Sito aggiornato"
      console.log('Push ignorato o non valido:', e);
    }
  }
});
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
      apiKey: "AIzaSyDjnjz43Qn2vm7cZhVzVHmoPXMIsYWleRM",
      authDomain: "auguri-compleanno-7ccbc.firebaseapp.com",
      projectId: "auguri-compleanno-7ccbc",
      storageBucket: "auguri-compleanno-7ccbc.firebasestorage.app",
      messagingSenderId: "234250368730",
      appId: "1:234250368730:web:0a9843eff6d38a811597e3"
});

const messaging = firebase.messaging();

// Gestisce la notifica quando arriva sul telefono (app chiusa o in background)
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png', // Icona che apparirà nella notifica
    badge: '/icon-192.png',
    data: { url: payload.fcmOptions?.link || '/' }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Quando tocchi la notifica, apre il sito
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
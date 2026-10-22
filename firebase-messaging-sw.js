// 1) DEVE stare PRIMA degli importScripts, così parte prima del listener di Firebase
self.addEventListener('push', (event) => {
  // Blocca la notifica automatica di Firebase (quella con la "M")
  event.stopImmediatePropagation();

  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch (e) {}

  const n = payload.notification || {};
  const d = payload.data || {};

  const title = n.title || d.title || 'Notifica ❤️';
  const body = n.body || d.body || '';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'unica-notifica-id',
      renotify: true // fa comunque suonare/vibrare se ne arriva una nuova
    })
  );
});

// Dato che bypassiamo l'SDK, gestiamo noi il tap sulla notifica
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes('/auguri_speciali/') && 'focus' in c) return c.focus();
      }
      return clients.openWindow('/auguri_speciali/');
    })
  );
});

// 2) Firebase dopo
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCozTnMZIMr_MdZMAUiuIQZ0GcCVIs23fg",
  authDomain: "prova-auguri.firebaseapp.com",
  databaseURL: "https://prova-auguri-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prova-auguri",
  storageBucket: "prova-auguri.firebasestorage.app",
  messagingSenderId: "826288183353",
  appId: "1:826288183353:web:92696d53ebab0d2efe15e8"
});

firebase.messaging(); // niente più onBackgroundMessage: la notifica la mostriamo sopra
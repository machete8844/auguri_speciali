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

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Notifica ❤️';
  const body = payload.notification?.body || '';

  const options = {
    body: body,
    icon: 'icon-192.png', // Icona personalizzata della PWA
    badge: 'icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'unica-notifica-id' // QUESTO IMPEDisce I DOPPIONI A LIVELLO DI SISTEMA OS
  };

  self.registration.showNotification(title, options);
});
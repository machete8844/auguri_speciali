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

// Questo intercetta il messaggio in arrivo quando l'app è chiusa o in background
messaging.onBackgroundMessage((payload) => {
  console.log('Messaggio ricevuto in background:', payload);

  // Prende titolo e corpo inviati da Firebase
  const title = payload.notification?.title || 'Notifica ❤️';
  const body = payload.notification?.body || '';

  const options = {
    body: body,
    icon: 'icon-192.png', // Forza l'icona della tua PWA!
    badge: 'icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'unica-notifica' // QUESTO È IL SEGRETO: tag univoco che impedisce i doppioni!
  };

  self.registration.showNotification(title, options);
});
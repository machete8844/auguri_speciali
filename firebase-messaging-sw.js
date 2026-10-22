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
  // Estrae titolo e testo sia che siano inviati come notification che come data
  const title = payload.notification?.title || payload.data?.title || 'Notifica ❤️';
  const body = payload.notification?.body || payload.data?.body || '';

  const options = {
    body: body,
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(title, options);
});
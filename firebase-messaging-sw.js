importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

// Inserisci qui la configurazione esatta del tuo progetto Firebase
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

// Gestione della notifica quando l'app è in background o chiusa
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Ricevuta notifica in background:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon-192.png',
    badge: 'icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
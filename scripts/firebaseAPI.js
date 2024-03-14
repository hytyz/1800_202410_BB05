
    var firebaseConfig = {
    apiKey: "AIzaSyA9uKKS-6878uqWeQC8EqLLCJ1rU4sbw3M",
    authDomain: "senior-savvy.firebaseapp.com",
    projectId: "senior-savvy",
    storageBucket: "senior-savvy.appspot.com",
    messagingSenderId: "1007663208803",
    appId: "1:1007663208803:web:e3736bd0def1e6cd885b56"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();
  
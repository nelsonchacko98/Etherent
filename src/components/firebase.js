import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAlYDcLJv2fxg-E0HF2iftVLpBc4spNuDw",
    authDomain: "ether-car.firebaseapp.com",
    databaseURL: "https://ether-car.firebaseio.com",
    projectId: "ether-car",
    storageBucket: "ether-car.appspot.com",
    messagingSenderId: "1012793956571",
    appId: "1:1012793956571:web:f0c6196be4e8a22a5a94fe",
    measurementId: "G-D34Q62846C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


export default firebase
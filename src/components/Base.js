import firebase from "firebase";

var firebaseConfig = {
  // apiKey: "AIzaSyAlYDcLJv2fxg-E0HF2iftVLpBc4spNuDw",
  // authDomain: "ether-car.firebaseapp.com",
  // databaseURL: "https://ether-car.firebaseio.com",
  // projectId: "ether-car",
  // storageBucket: "ether-car.appspot.com",
  // messagingSenderId: "1012793956571",
  // appId: "1:1012793956571:web:f0c6196be4e8a22a5a94fe",
  // measurementId: "G-D34Q62846C",
  apiKey: "AIzaSyDvxAMm8BgKfy4gEmp22ZeTXQe7uICr71s",
  authDomain: "etherrent.firebaseapp.com",
  databaseURL: "https://etherrent.firebaseio.com",
  projectId: "etherrent",
  storageBucket: "etherrent.appspot.com",
  messagingSenderId: "131343823927",
  appId: "1:131343823927:web:690822703fac78226b3bb2",
  measurementId: "G-WRQNJHF3RV",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
firebase.analytics();

export default firebase;

import firebase from "firebase";

// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCUF4IOaMKIk8xSBdeDKd2Rc-bt0dAsXC0",
  authDomain: "petrolstation-233b3.firebaseapp.com",
  databaseURL: "https://petrolstation-233b3.firebaseio.com",
  projectId: "petrolstation-233b3",
  storageBucket: "",
  messagingSenderId: "621512784208",
  appId: "1:621512784208:web:cd7eb918a0bcdb2e"
};
let app = firebase.initializeApp(firebaseConfig);

// Initialize cloud Firestore through database
const db = firebase.firestore();
const database = app.database();
window.firebase = firebase;

const stationsCollection = db.collection("stations");
const suggestedStation = db.collection("suggested_station");
const feedbackCollection = db.collection("feedback");

export {
  db,
  database,
  stationsCollection,
  suggestedStation,
  feedbackCollection
};
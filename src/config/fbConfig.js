import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
let config = {
  apiKey: "AIzaSyBvC-IFLxFHapAbIOhplS8KBUltBhNJdHg",
  authDomain: "groove-scheduler-firestore.firebaseapp.com",
  databaseURL: "https://groove-scheduler-firestore.firebaseio.com",
  projectId: "groove-scheduler-firestore",
  storageBucket: "groove-scheduler-firestore.appspot.com",
  messagingSenderId: "623852329383",
  appId: "1:623852329383:web:c33b955d26a5df56"
};

firebase.initializeApp(config);

export default firebase;

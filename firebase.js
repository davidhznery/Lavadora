import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Reemplaza con tu API Key
  authDomain: "lavadoras-b3194.firebaseapp.com",
  projectId: "lavadoras-b3194",
  storageBucket: "lavadoras-b3194.appspot.com",
  messagingSenderId: "977098772115",
  appId: "YOUR_APP_ID" // Reemplaza con tu App ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };


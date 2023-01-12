// import * as firebase from 'firebase/app'
// import firebase from 'firebase/app'

// import "firebase/auth"
// import 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBXl2l1cHrwOIc7fZTP1Wo6tdDIpc4ybPw",
  authDomain: "react-app-cursos-433e5.firebaseapp.com",
  projectId: "react-app-cursos-433e5",
  storageBucket: "react-app-cursos-433e5.appspot.com",
  messagingSenderId: "73027339155",
  appId: "1:73027339155:web:746820906f7f06904cde66",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// const app = initializeApp(firebaseConfig);
// const googleAuthProvider = new GoogleAuthProvider();
// const db = getFirestore(app);

// export { db, googleAuthProvider, firebase, doc, setDoc, collection};

export {
  firebase,
  db,
  googleAuthProvider,
   
}

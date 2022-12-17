// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBaCvYpB0_vDCGqfNT8q7P2OxkiUJ1-c04",
  authDomain: "fir-tutorial-d60f5.firebaseapp.com",
  projectId: "fir-tutorial-d60f5",
  storageBucket: "fir-tutorial-d60f5.appspot.com",
  messagingSenderId: "51426296497",
  appId: "1:51426296497:web:2057d2efa668e010a61890",
  measurementId: "G-V5MLMLG2N7",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

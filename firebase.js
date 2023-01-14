// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// you can setting firestore rules on firebase console because NEXT_PUBLIC will expose on the client

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASESTORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASEMESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASEAPPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASEMEASUREMENTID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
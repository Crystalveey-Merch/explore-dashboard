// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDWJE0ytStDj7tYrYe9cc7aYwh4IqMNLAI",
    authDomain: "crystaveey-atelier.firebaseapp.com",
    projectId: "crystaveey-atelier",
    storageBucket: "crystaveey-atelier.appspot.com",
    messagingSenderId: "778305329441",
    appId: "1:778305329441:web:a6b8d8e8df7d04c82ec660",
    measurementId: "G-ETN424LPW4"
};



// Initialize Firebase
const app = initializeApp( firebaseConfig, "secondary"  );

export const db = getFirestore(app);
// export const db2 = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
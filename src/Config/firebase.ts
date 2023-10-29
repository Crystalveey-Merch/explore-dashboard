import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    User,
    UserCredential,
    EmailAuthProvider,
    updateProfile,
    updateEmail,
    updatePassword,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    query,
    where,
    getDoc,
    setDoc,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export const createUserProfileDocument = async (userAuth: User,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalData: any) => {
    if (!userAuth) return;

    const userRef = doc(db, `admins/${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {

        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date().toISOString()

        const lastLogin = serverTimestamp();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                photoURL,
                createdAt,
                lastLogin,
                ...additionalData,
            });
            //await updateDoc(userRef, { lastLoginAt});
        } catch (error: unknown) {
            console.log("error creating user", (error as Error).message);
        }

    }
    return userRef;
}

export type {
    User,
    UserCredential
};

export {
    analytics,
    auth,
    storage,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    EmailAuthProvider,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteDoc,
    db,
    collection,
    query,
    where,
    getDoc,
    setDoc,
    addDoc,
    doc,
    getDocs,
    updateDoc,
    serverTimestamp,
}
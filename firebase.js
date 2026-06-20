import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Verify config is loaded
if (!window.FIREBASE_CONFIG) {
    console.error("Firebase configuration not found. Ensure firebase-config.js is loaded before firebase.js.");
}

const app = initializeApp(window.FIREBASE_CONFIG || {});
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google Provider custom parameters if needed
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Expose Firebase services globally
window.firebase = {
    app,
    auth,
    db,
    providers: {
        google: googleProvider
    },
    authMethods: {
        signInWithPopup,
        signOut,
        onAuthStateChanged,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword
    },
    firestoreMethods: {
        doc,
        setDoc,
        getDoc,
        collection,
        addDoc,
        getDocs,
        query,
        where,
        orderBy,
        limit,
        serverTimestamp
    }
};

console.log("🔥 Firebase services initialized and exposed globally.");

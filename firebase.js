import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Verify config is loaded
let app, auth, db, googleProvider;
try {
    if (!window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.apiKey) {
        throw new Error("Firebase configuration credentials are missing or empty.");
    }
    app = initializeApp(window.FIREBASE_CONFIG);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();

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
} catch (error) {
    console.error("❌ Failed to initialize Firebase SDK:", error.message);
    window.firebase = null;
}

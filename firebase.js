import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Verify config is loaded
let app, auth, db, googleProvider, analytics;
try {
    if (!window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.apiKey) {
        throw new Error("Firebase configuration credentials are missing or empty.");
    }
    app = initializeApp(window.FIREBASE_CONFIG);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();

    // Initialize Firebase Analytics
    try {
        analytics = getAnalytics(app);
        console.log("📊 Firebase Analytics initialized.");
    } catch (analyticsErr) {
        console.warn("⚠️ Firebase Analytics could not be initialized:", analyticsErr.message);
    }

    // Configure Google Provider custom parameters if needed
    googleProvider.setCustomParameters({ prompt: 'select_account' });

    // Expose Firebase services globally
    window.firebase = {
        app,
        auth,
        db,
        analytics,
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

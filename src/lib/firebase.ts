import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getDatabase, Database } from 'firebase/database';

// Your web app's Firebase configuration
// Replace with your actual Firebase config from Firebase Console
// Go to Project Settings > General > Your Apps > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyBwuxmcEUWpbiEcfkXa64PD5jfDISraLdg",
  authDomain: "atandra.firebaseapp.com",
  projectId: "atandra",
  storageBucket: "atandra.firebasestorage.app",
  messagingSenderId: "590892650418",
  appId: "1:590892650418:web:fd1cf5702062470da6deab",
  measurementId: "G-SYNCN3ZVY7",
  databaseURL: "https://atandra-default-rtdb.firebaseio.com" // Added Realtime Database URL
};

// Initialize Firebase
console.log("Initializing Firebase with config:", {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  // Omitting sensitive values
});

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let rtdb: Database;

try {
  // Initialize Firebase app
  try {
    app = initializeApp(firebaseConfig);
    console.log("Firebase app initialized successfully");
  } catch (appError) {
    console.error("Error initializing Firebase app:", appError);
    // Don't throw, try to continue with other services
  }

  // Initialize Firebase Auth
  try {
    auth = getAuth(app);
    console.log("Firebase Auth initialized successfully");
  } catch (authError) {
    console.error("Error initializing Firebase Auth:", authError);
    // Don't throw, try to continue with other services
  }

  // Initialize Firestore
  try {
    db = getFirestore(app);
    console.log("Firestore initialized successfully");
  } catch (firestoreError) {
    console.error("Error initializing Firestore:", firestoreError);
    // Don't throw, try to continue with other services
  }

  // Initialize Storage
  try {
    storage = getStorage(app);
    console.log("Firebase Storage initialized successfully");
  } catch (storageError) {
    console.error("Error initializing Firebase Storage:", storageError);
    // Don't throw, try to continue with other services
  }

  // Initialize Realtime Database
  try {
    rtdb = getDatabase(app);
    console.log("Firebase Realtime Database initialized successfully");
  } catch (rtdbError) {
    console.error("Error initializing Firebase Realtime Database:", rtdbError);
    // Don't throw, try to continue with other services
  }

  console.log("Firebase services initialization completed");
} catch (error) {
  console.error("Error in Firebase initialization process:", error);
  // Don't throw, allow the app to continue loading even if Firebase fails
}

// Create fallbacks for any undefined services
if (!auth) {
  console.warn("Auth service is undefined, creating a mock version");
  auth = {} as Auth;
}

if (!db) {
  console.warn("Firestore service is undefined, creating a mock version");
  db = {} as Firestore;
}

if (!storage) {
  console.warn("Storage service is undefined, creating a mock version");
  storage = {} as FirebaseStorage;
}

if (!rtdb) {
  console.warn("Realtime Database service is undefined, creating a mock version");
  rtdb = {} as Database;
}

export { auth, db, storage, rtdb };

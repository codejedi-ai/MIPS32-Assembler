import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBlw_fzjEs-NbOabJkHEpGbfBdDEt7RVvI",
  authDomain: "galatea-ai.firebaseapp.com",
  databaseURL: "https://galatea-ai-default-rtdb.firebaseio.com",
  projectId: "galatea-ai",
  storageBucket: "galatea-ai.appspot.com", // Corrected from firebasestorage.app to appspot.com
  messagingSenderId: "727737899444",
  appId: "1:727737899444:web:16152c4885a96302af7ae1",
  measurementId: "G-6ZQT56XSCV",
}

// Initialize Firebase
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Initialize Firebase Analytics
let analytics
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  })
}

export { app, analytics }
export default app

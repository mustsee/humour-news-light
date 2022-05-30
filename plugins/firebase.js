// Troubles with ESM / CJS
// https://stackoverflow.com/questions/63358905/typeerror-firebase-default-initializeapp-is-not-a-function

// CJS
const firebase = require('firebase/app').default
require('firebase/firestore')

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "humour-news-light",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Code specific to Vue
let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

export default db;

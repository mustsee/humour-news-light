// Troubles with ESM / CJS
// https://stackoverflow.com/questions/63358905/typeerror-firebase-default-initializeapp-is-not-a-function

// CJS
const firebase = require('firebase/app').default
const firebaseConfig = require('~/firebase.config.js')
require('firebase/firestore')
require('firebase/auth')

// Code specific to Vue
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const authProviders = {
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
}

export const increment = firebase.firestore.FieldValue.increment
export const fireDb = firebase.firestore()
export const fireAuth = firebase.auth()
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

// firebase config
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
}

// init firebase
firebase.initializeApp(config)

// use emulators in development
if (location.hostname === 'localhost') {
  firebase.auth().useEmulator(
    process.env.VUE_APP_FIREBASE_EMULATOR_AUTH,
  )

  firebase.firestore().useEmulator(
    process.env.VUE_APP_FIREBASE_EMULATOR_FIRESTORE_HOST,
    process.env.VUE_APP_FIREBASE_EMULATOR_FIRESTORE_PORT,
  )
}

// export firebase instance
export default firebase

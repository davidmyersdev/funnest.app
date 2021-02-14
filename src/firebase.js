import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

// firebase config
const config = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
}

// init firebase
firebase.initializeApp(config)

// use emulators in development
if (location.hostname === 'localhost') {
  firebase.auth().useEmulator(
    import.meta.env.VITE_APP_FIREBASE_EMULATOR_AUTH,
  )

  firebase.firestore().useEmulator(
    import.meta.env.VITE_APP_FIREBASE_EMULATOR_FIRESTORE_HOST,
    import.meta.env.VITE_APP_FIREBASE_EMULATOR_FIRESTORE_PORT,
  )
}

// export firebase instance
export default firebase

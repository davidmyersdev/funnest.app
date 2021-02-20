import firebase from '/src/firebase'

export const getUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user)
      }
    })
  })
}

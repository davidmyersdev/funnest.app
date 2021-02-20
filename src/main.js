import { createApp } from 'vue'
import App from './App.vue'
import firebase from './firebase'
import router from './router'
import store from './store'

firebase.auth().signInAnonymously()
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit('setUser', user)
  }
})

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')

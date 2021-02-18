import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      rooms: [],
    }
  },
  mutations: {
    addRoom(state, room) {
      state.rooms.push(room)
    },
  },
  actions: {
    // nothing yet
  },
})

export default store

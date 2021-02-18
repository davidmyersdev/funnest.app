import { createStore } from 'vuex'

import P2P from '/src/lib/p2p'

const store = createStore({
  state() {
    return {
      peer: null,
      rooms: [],
    }
  },
  mutations: {
    addRoom(state, room) {
      state.rooms.push(room)
    },
    setPeer(state, peer) {
      state.peer = peer
    },
  },
  actions: {
    initWebRtc(context) {
      const peer = new P2P()

      context.commit('setPeer', peer)
    },
  },
})

export default store

import { nanoid } from 'nanoid'
import { createStore } from 'vuex'

import firebase from '/src/firebase'
import P2P from '/src/lib/p2p'
import { getUser } from '/src/lib/user'

const store = createStore({
  state() {
    return {
      handlers: [],
      messages: [],
      peers: [],
      rooms: [],
      user: null,
    }
  },
  mutations: {
    addHandler(state, handler) {
      state.handlers.push(handler)
    },
    addMessage(state, message) {
      const existingMessage = state.messages.find(m => m.id === message.id)

      if (!existingMessage) {
        state.messages.push(message)
      }
    },
    addPeer(state, peer) {
      const existingPeer = state.peers.find(p => p.id === peer.id)

      if (!existingPeer) {
        state.peers.push(peer)
      }
    },
    addRoom(state, room) {
      const existingRoom = state.rooms.find(r => r.id === room.id)

      if (!existingRoom) {
        state.rooms.push(room)
      }
    },
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    async connectToPeer(context, { id }) {
      const user = await getUser()
      const userRef = firebase.database().ref(`peers/${id}`)
      const offerRef = userRef.push()
      const connection = new P2P()
      const offer = await connection.createOffer()

      offerRef.set({
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
        peerId: user.uid,
      })

      connection.onMessage = (message) => {
        context.state.handlers.forEach(handler => handler(message))
      }

      offerRef.on('value', (data) => {
        if (data.val() && data.val().answer) {
          connection.acceptAnswer(data.val().answer)

          offerRef.remove()
        }
      })

      const peer = {
        id,
        connection,
      }

      context.commit('addPeer', peer)
    },
    async connectToPeers(context, peers) {
      return Promise.all(peers.map(peer => context.dispatch('connectToPeer', peer)))
    },
    async createRoom(context) {
      const user = await getUser()
      const roomData = {
        members: [{ id: user.uid }],
        ownerId: user.uid,
      }
      const roomRef = await firebase.firestore().collection('rooms').add(roomData)
      const room = {
        id: nanoid(6),
        inviteId: roomRef.id,
        ...roomData,
      }

      context.commit('addRoom', room)
      context.dispatch('listenForPeers')

      return room
    },
    async joinRoom(context, roomId) {
      const user = await getUser()
      const docRef = firebase.firestore().collection('rooms').doc(roomId)
      const roomRef = await docRef.get()
      const me = { id: user.uid }
      const roomData = roomRef.data()
      const room = {
        id: nanoid(6),
        inviteId: roomRef.id,
        members: [...roomData.members, me],
        ownerId: roomData.ownerId,
      }

      // join room
      docRef.set({
        members: firebase.firestore.FieldValue.arrayUnion(me),
      }, { merge: true })

      context.commit('addRoom', room)
      context.dispatch('connectToPeers', roomData.members)
      context.dispatch('listenForPeers')

      return room
    },
    async listenForPeers(context) {
      const user = await getUser()
      const userRef = firebase.database().ref(`peers/${user.uid}`)

      userRef.remove()

      userRef.on('child_added', async (data) => {
        if (data.val().offer) {
          const connection = new P2P()
          const answerRef = firebase.database().ref(`peers/${user.uid}/${data.key}`)
          const answer = await connection.acceptOffer(data.val().offer)
          const peer = {
            id: data.val().peerId,
            connection,
          }

          answerRef.set({
            answer: {
              type: answer.type,
              sdp: answer.sdp,
            },
            peerId: user.uid,
          })

          connection.onMessage = (message) => {
            context.state.handlers.forEach(handler => handler(message))
          }


          context.commit('addPeer', peer)
        }
      })
    },
    async sendMessage(context, value) {
      const user = await getUser()
      const message = {
        id: nanoid(),
        peer: {
          id: user.uid,
          name: 'local',
        },
        value,
      }

      context.commit('addMessage', message)

      context.state.peers.forEach((peer) => {
        peer.connection.send({
          type: 'message',
          message,
        })
      })
    },
  },
})

export default store

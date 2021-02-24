import { nanoid } from 'nanoid'
import { createStore } from 'vuex'

import firebase from '/src/firebase'
import Peer from '/src/lib/peer'
import { getUser } from '/src/lib/user'

const store = createStore({
  state() {
    return {
      messages: [],
      peers: [],
      rooms: [],
      user: null,
      name: '',
    }
  },
  mutations: {
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
    setName(state, name) {
      state.name = name
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
      const peer = new Peer({ id })
      const offer = await peer.createOffer()

      offerRef.set({
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
        peerId: user.uid,
      })

      peer.onMessage = (message) => {
        context.commit('addMessage', message)
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
        // someone pushed an offer onto our queue
        if (data.val().offer) {
          const peer = new Peer({ id: data.val().peerId })
          const offerRef = firebase.database().ref(`peers/${user.uid}/${data.key}`)
          const answerRef = firebase.database().ref(`peers/${data.val().peerId}`).push()
          const answer = await peer.acceptOffer(data.val().offer)

          offerRef.remove()

          answerRef.set({
            answer: {
              type: answer.type,
              sdp: answer.sdp,
            },
            peerId: user.uid,
          })

          peer.onMessage = (message) => {
            context.commit('addMessage', message)
          }

          context.commit('addPeer', peer)
        // someone pushed an answer onto our queue
        } else if (data.val().answer) {
          const peer = context.state.peers.find(p => p.id === data.val().peerId)
          const answerRef = firebase.database().ref(`peers/${user.uid}/${data.key}`)

          if (peer) {
            peer.acceptAnswer(data.val().answer)
          } else {
            console.info('No peer found...')
          }

          answerRef.remove()
        }
      })
    },
    async sendMessage(context, { type, data }) {
      const user = await getUser()
      const message = {
        id: nanoid(),
        peer: {
          id: user.uid,
          name: context.state.name,
        },
        data,
        type,
      }

      context.commit('addMessage', message)

      return Promise.all(context.state.peers.map((peer) => {
        return new Promise((resolve, reject) => {
          peer.send(message)

          resolve()
        })
      }))
    },
  },
})

export default store

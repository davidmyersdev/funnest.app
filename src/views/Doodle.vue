<template>
  <div class="container mx-auto p-4">
    <fieldset class="flex">
      <button @click="createRoom" type="submit" class="rounded-l block bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300">Create Room</button>
      <input v-model="inviteLink" type="text" class="rounded-r block bg-white border-2 border-gray-100 p-2 flex-grow outline-none focus:border-blue-300">
    </fieldset>
    <Canvas ref="canvas" :p2p="p2p" class="mt-2" />
  </div>
</template>

<script>
import Canvas from '/src/components/Canvas.vue'
import firebase from '/src/firebase'
import P2P from '/src/lib/p2p'

export default {
  name: 'Doodle',
  components: {
    Canvas,
  },
  data() {
    return {
      p2p: null,
      room: {
        id: null,
      },
    }
  },
  computed: {
    inviteLink() {
      return this.room.id ? `${location.protocol}//${location.host}/doodle/${this.room.id}` : null
    },
  },
  methods: {
    async createRoom() {
      const offer = await this.p2p.createOffer()
      const roomRef = await firebase.firestore().collection('rooms').add({
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      })

      this.room.id = roomRef.id

      roomRef.onSnapshot(async (snapshot) => {
        const room = snapshot.data()

        if (room.answer) {
          this.p2p.acceptAnswer(room.answer).catch(console.error)
        }
      })
    },
    onMessage(message) {
      switch (message.type) {
        case 'start':
          this.$refs.canvas.peerStart(message.point, message.options)
          break;
        case 'move':
          this.$refs.canvas.peerMove(message.point)
          break;
        case 'undo':
          this.$refs.canvas.peerUndo()
          break;
        case 'reset':
          this.$refs.canvas.peerReset()
          break;
        default:
          break;
      }
    },
  },
  async mounted() {
    this.p2p = new P2P()

    this.p2p.onMessage = this.onMessage

    if (this.$route.params.roomId) {
      const docRef = firebase.firestore().collection('rooms').doc(this.$route.params.roomId)
      const roomRef = await docRef.get()
      const room = roomRef.data()

      this.p2p.acceptOffer(room.offer).then((answer) => {
        docRef.set({
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        }, { merge: true })
      })
    }
  }
}
</script>

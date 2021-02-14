<template>
  <div class="container">
    <h2>Doodle</h2>
    <fieldset class="mb-3">
      <div class="input-group mb-3">
        <button @click="createRoom" type="submit" class="btn btn-primary">Create Room</button>
        <input v-model="inviteLink" type="text" class="form-control">
      </div>
    </fieldset>
    <Canvas ref="canvas" :p2p="p2p" />
  </div>
</template>

<script>
import Canvas from '@/components/Canvas.vue'
import firebase from '@/firebase'
import P2P from '@/lib/p2p'

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

<style>

</style>

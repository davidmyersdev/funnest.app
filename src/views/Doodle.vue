<template>
  <div class="container">
    <fieldset class="mb-3">
      <legend>Create Room</legend>
      <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Invite Link</label>
        <input v-model="inviteLink" type="text" class="form-control">
      </div>
      <button @click="createRoom" type="submit" class="btn btn-primary">Create</button>
    </fieldset>
    <Canvas ref="canvas" />
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
          this.p2p.acceptAnswer(room.answer).then(() => {
            setTimeout(() => {
              this.p2p.send({
                hello: 'world',
              })
            }, 1000)
          }).catch(console.error)
        }
      })
    },
    onMessage(message) {
      console.log({ message })
    },
  },
  async mounted() {
    this.p2p = new P2P()

    this.p2p.onMessage = this.onMessage

    if (this.$route.params.room_id) {
      const docRef = firebase.firestore().collection('rooms').doc(this.$route.params.room_id)
      const roomRef = await docRef.get()
      const room = roomRef.data()

      this.p2p.acceptOffer(room.offer).then((answer) => {
        console.log({ answer })

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

<template>
  <div class="container mx-auto p-4">
    <p>Looking for Room...</p>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import firebase from '/src/firebase'

export default {
  name: 'Invite',
  props: {
    inviteId: String,
  },
  async mounted() {
    const room = this.$store.state.rooms.find(room => room.inviteId === this.inviteId)

    if (room) {
      this.$router.push({ name: 'doodle_room', params: { roomId: room.id } })
    } else {
      const docRef = firebase.firestore().collection('rooms').doc(this.inviteId)
      const roomRef = await docRef.get()
      const room = roomRef.data()

      await this.$store.state.peer.acceptOffer(room.offer).then((answer) => {
        docRef.set({
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        }, { merge: true })
      })

      const id = nanoid(6)

      this.$store.commit('addRoom', {
        id,
        inviteId: roomRef.id,
        offer: room.offer,
      })

      this.$router.push({ name: 'doodle_room', params: { roomId: id } })
    }
  }
}
</script>

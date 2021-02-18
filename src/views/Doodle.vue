<template>
  <div class="container mx-auto p-4">
    <fieldset class="flex justify-center">
      <button @click="createRoom" :disabled="creating" type="submit" class="rounded block w-1/2 bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300">
        {{ creating ? 'Creating...' : 'Create Room' }}
      </button>
    </fieldset>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import firebase from '/src/firebase'

export default {
  name: 'Doodle',
  data() {
    return {
      creating: false,
    }
  },
  methods: {
    async createRoom() {
      this.creating = true

      try {
        const offer = await this.$store.state.peer.createOffer().catch(console.error)
        const roomRef = await firebase.firestore().collection('rooms').add({
          offer: {
            type: offer.type,
            sdp: offer.sdp,
          },
        })
        const room = {
          id: nanoid(6),
          inviteId: roomRef.id,
          offer: {
            type: offer.type,
            sdp: offer.sdp,
          },
          owner: true,
        }

        this.$store.commit('addRoom', room)

        roomRef.onSnapshot(async (snapshot) => {
          const room = snapshot.data()

          if (room.answer) {
            this.$store.state.peer.acceptAnswer(room.answer).catch(console.error)
          }
        })

        this.$router.push({ name: 'doodle_room', params: { roomId: room.id } })
      } catch (error) {
        // handle error
      }

      this.creating = false
    },
  },
}
</script>

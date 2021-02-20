<template>
  <div class="container mx-auto p-4">
    <fieldset class="flex">
      <input ref="invite" v-model="inviteLink" type="text" class="rounded-l block bg-white border-2 border-gray-100 p-2 flex-grow outline-none focus:border-blue-300" readonly>
      <button @click="copyInvite" type="submit" class="rounded-r block bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300">Copy Invite</button>
    </fieldset>
    <Canvas ref="canvas" class="mt-2" />
  </div>
</template>

<script>
import Canvas from '/src/components/Canvas.vue'

export default {
  name: 'Room',
  components: {
    Canvas,
  },
  props: {
    roomId: String,
  },
  computed: {
    inviteLink() {
      if (this.room) {
        const { href: path } = this.$router.resolve({ name: 'doodle_invite', params: { inviteId: this.room.inviteId } })

        return path ? `${location.protocol}//${location.host}${path}` : null
      }
    },
    room() {
      return this.$store.state.rooms.find(room => room.id === this.roomId)
    },
  },
  methods: {
    copyInvite() {
      this.$refs.invite.select()
      document.execCommand('copy')
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
  async created() {
    if (!this.room) return this.$router.push({ name: 'doodle' })

    this.$store.commit('addHandler', (message) => {
      this.onMessage(message)
    })
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <p>Looking for Room...</p>
  </div>
</template>

<script>
export default {
  name: 'Invite',
  props: {
    inviteId: String,
  },
  async mounted() {
    const room = this.$store.state.rooms.find(room => room.inviteId === this.inviteId) || await this.$store.dispatch('joinRoom', this.inviteId)

    this.$router.push({ name: 'doodle_room', params: { roomId: room.id } })
  }
}
</script>

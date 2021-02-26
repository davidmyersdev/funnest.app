<template>
  <div class="container mx-auto p-4">
    <div v-if="showGame">
      <Game :readonly="readonly" class="mb-2" />
    </div>
    <div v-else>
      <div class="flex mb-2">
        <div class="rounded-l bg-gray-100 border-2 border-gray-100 p-2">Name</div>
        <input v-model="name" type="text" class="rounded-r block bg-white border-2 border-gray-100 p-2 flex-grow outline-none focus:border-blue-300">
      </div>
      <div class="flex">
        <input ref="invite" v-model="inviteLink" type="text" class="rounded-l block bg-white border-2 border-gray-100 p-2 flex-grow outline-none focus:border-blue-300" readonly>
        <button @click="copyInvite" type="submit" class="rounded-r block bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300">Copy Invite</button>
      </div>
      <div v-if="isActive" class="flex justify-center mt-2">
        <button @click="startGame" type="submit" class="rounded block w-1/2 bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300">
          Start Game
        </button>
      </div>
    </div>
    <div>
      <div v-for="peer in peers" class="p-2 mb-2">
        <div class="text-sm text-gray-400">{{ peer.name || peer.id }}</div>
        <button v-if="peer.id !== activeUserId" @click="makeActive(peer.id)" type="submit" class="rounded block bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300">
          Make Active
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Game from '/src/components/Game.vue'

export default {
  name: 'Room',
  components: {
    Game,
  },
  props: {
    roomId: String,
  },
  data() {
    return {
      activeUserId: null,
      showGame: false,
      unsubscribe: null,
    }
  },
  computed: {
    inviteLink() {
      if (this.room) {
        const { href: path } = this.$router.resolve({ name: 'doodle_invite', params: { inviteId: this.room.inviteId } })

        return path ? `${location.protocol}//${location.host}${path}` : null
      }
    },
    isActive() {
      return this.activeUserId && this.user.uid && this.activeUserId === this.user.uid
    },
    name: {
      get() {
        return this.$store.state.name
      },
      set(value) {
        this.$store.commit('setName', value)
      },
    },
    peers() {
      return this.$store.state.peers
    },
    readonly() {
      return !this.isActive
    },
    room() {
      return this.$store.state.rooms.find(room => room.id === this.roomId)
    },
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    copyInvite() {
      this.$refs.invite.select()
      document.execCommand('copy')
    },
    makeActive(peerId) {
      this.$store.dispatch('sendMessage', {
        type: 'switch_user',
        data: {
          userId: peerId,
        },
      })
    },
    startGame() {
      this.showGame = true
      this.$store.dispatch('sendMessage', { type: 'start_game' })
    },
  },
  async created() {
    if (!this.room) return this.$router.push({ name: 'doodle' })

    this.activeUserId = this.room.ownerId

    this.unsubscribe = this.$store.subscribe(({ type, payload: message }, state) => {
      if (type === 'addMessage') {
        switch (message.type) {
          case 'start_game':
            this.showGame = true

            break;
          case 'switch_user':
            this.activeUserId = message.data.userId

            break;
          case 'chat':
            if (message.data)

            break;
          default:
            break;
        }
      }
    })
  },
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
}
</script>

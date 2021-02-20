<template>
  <div class="container mx-auto p-4">
    <fieldset class="flex flex-col items-center">
      <div v-if="errorMessage" class="flex items-center p-4 bg-yellow-100 w-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <span class="ml-4">{{ errorMessage }}</span>
      </div>
      <button @click="createRoom" :disabled="creating" type="submit" class="rounded block w-1/2 bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300">
        {{ creating ? 'Creating...' : 'Create Room' }}
      </button>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'Doodle',
  data() {
    return {
      creating: false,
      errorMessage: null,
    }
  },
  methods: {
    async createRoom() {
      this.creating = true

      try {
        const room = await this.$store.dispatch('createRoom')

        this.$router.push({ name: 'doodle_room', params: { roomId: room.id } })
      } catch (error) {
        this.errorMessage = 'An unknown error occurred.'
        this.creating = false
      }
    },
  },
}
</script>

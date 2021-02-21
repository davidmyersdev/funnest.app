<template>
  <div class="mt-4">
    <div class="rounded border-2 border-gray-100 p-2 h-40 overflow-auto">
      <div v-for="message in messages" class="bg-gray-100 p-2 mb-2">
        <div class="text-sm">{{ message.peer.id }}</div>
        <div>{{ message.value }}</div>
      </div>
    </div>
    <fieldset class="flex mt-4">
      <input @keyup.enter="sendMessage" ref="invite" v-model="text" type="text" class="rounded-l block bg-white border-2 border-gray-100 p-2 flex-grow outline-none focus:border-blue-300">
      <button @click="sendMessage" type="submit" class="rounded-r block bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300">Send Message</button>
    </fieldset>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    }
  },
  computed: {
    messages() {
      return this.$store.state.messages
    },
  },
  methods: {
    sendMessage() {
      this.$store.dispatch('sendMessage', this.text)
    },
  },
  created() {
    this.$store.commit('addHandler', (data) => {
      if (data.type === 'message') {
        this.$store.commit('addMessage', data.message)
      }
    })
  },
}
</script>

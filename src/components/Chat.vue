<template>
  <div>
    <div ref="messagesContainer" class="rounded border-2 border-gray-100 p-2 h-40 overflow-auto">
      <div :ref="setMessageRef" v-for="message in messages" class="bg-gray-100 p-2 mb-2 last:mb-0">
        <div class="text-sm text-gray-400">{{ message.peer.name || message.peer.id }}</div>
        <div class="truncate">{{ message.data }}</div>
      </div>
    </div>
    <fieldset class="flex mt-2">
      <input @keyup.enter="sendMessage" ref="invite" v-model="text" type="text" class="rounded-l block bg-white border-2 border-gray-100 p-2 flex-grow outline-none focus:border-blue-300">
      <button @click="sendMessage" type="submit" class="rounded-r block bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300">Send Message</button>
    </fieldset>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageRefs: [],
      text: '',
    }
  },
  computed: {
    messages() {
      return this.$store.state.messages.filter(message => message.type === 'chat')
    },
  },
  methods: {
    scroll() {
      const container = this.$refs.messagesContainer
      const element = this.messageRefs[this.messageRefs.length - 1]
      const scrolltop = container.scrollTop
      const offsetheight = container.offsetHeight
      const offsettop = element.offsetTop
      const height = element.offsetHeight
      const scrolloffset = (offsettop - offsetheight) + height

      container.scroll(0, scrolloffset)
    },
    sendMessage() {
      this.$store.dispatch('sendMessage', {
        type: 'chat',
        data: this.text,
      })

      this.text = ''
    },
    setMessageRef(element) {
      this.messageRefs.push(element)
    },
  },
  beforeUpdate() {
    this.messageRefs = []
  },
  updated() {
    // todo: move chat history into a standalone component with props
    // this method is called every time the input field is modified (typing)
    if (this.messages.length > 0) {
      this.scroll()
    }
  },
}
</script>

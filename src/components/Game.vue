<template>
  <div class="flex flex-col md:flex-row">
    <Canvas ref="canvas" :readonly="readonly" class="md:w-1/2" />
    <Chat class="md:mt-0 md:ml-4 md:w-1/2 mt-2" />
  </div>
</template>

<script>
import Canvas from '/src/components/Canvas.vue'
import Chat from '/src/components/Chat.vue'

export default {
  name: 'Game',
  props: {
    readonly: Boolean,
  },
  components: {
    Canvas,
    Chat,
  },
}
</script>

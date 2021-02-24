<template>
  <div class="relative rounded border-2 border-gray-100">
    <div v-if="showSizeSlider" @click="toggleSizeSlider" class="absolute top-0 bottom-0 left-0 right-0"></div>
    <div class="absolute top-0 right-0 m-2 flex flex-col">
      <button @click="toggleTools" class="border rounded bg-white p-3 focus:outline-none focus:ring">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
        </svg>
      </button>
      <div v-if="showTools" class="flex flex-col align-items-end">
        <button @click="toggleEraser" :class="{ 'active bg-red-500 border-red-500 text-white': erasing, 'bg-white text-red-500 border-red-300': !erasing }" class="border rounded bg-white p-3 focus:outline-none focus:ring mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16">
            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
          </svg>
        </button>
        <button @click="undo" class="border rounded bg-white p-3 focus:outline-none focus:ring mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
          </svg>
        </button>
        <div class="flex mt-1 relative">
          <button @click="toggleSizeSlider" class="border rounded bg-white p-3 focus:outline-none focus:ring">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-toggle2-on" viewBox="0 0 16 16">
              <path d="M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z"/>
              <path d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z"/>
            </svg>
          </button>
          <div v-if="showSizeSlider" class="border rounded flex items-center p-2 mr-2 absolute right-full bg-white top-0 bottom-0 focus-within:ring">
            <svg :style="{ color: color }" xmlns="http://www.w3.org/2000/svg" :width="minSize" :height="minSize" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
            <input v-model="size" type="range" min="5" max="20" class="mx-2 rounded focus:outline-none">
            <svg :style="{ color: color }" xmlns="http://www.w3.org/2000/svg" :width="maxSize" :height="maxSize" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
          </div>
        </div>
        <label class="border rounded bg-white p-3 focus-within:outline-none focus-within:ring relative mt-1">
          <input v-model="color" type="color" class="absolute h-full w-full top-0 bottom-0 left-0 right-0 focus:outline-none opacity-0">
          <svg :style="{ color: color }" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-palette2" viewBox="0 0 16 16">
            <path d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 .5.5v5.277l4.147-4.131a.5.5 0 0 1 .707 0l3.535 3.536a.5.5 0 0 1 0 .708L10.261 10H15.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H3a2.99 2.99 0 0 1-2.121-.879A2.99 2.99 0 0 1 0 13.044m6-.21l7.328-7.3-2.829-2.828L6 7.188v5.647zM4.5 13a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zM15 15v-4H9.258l-4.015 4H15zM0 .5v12.495z"/>
            <path d="M0 12.995V13a3.07 3.07 0 0 0 0-.005z"/>
          </svg>
        </label>
        <button @click="reset" class="border rounded bg-white text-red-500 border-red-300 p-3 focus:outline-none focus:ring mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </div>
    </div>
    <canvas ref="canvas" :width="width" :height="height" class="block"></canvas>
  </div>
</template>
<script>
import Canvas from '/src/lib/canvas.js'

export default {
  name: 'Canvas',
  data() {
    return {
      canvas: null,
      color: '#000000',
      lines: [],
      size: 5,
      minSize: 5,
      maxSize: 20,
      width: 500,
      height: 400,
      operation: 'source-over',
      showTools: true,
      showSizeSlider: false,
      unsubscribe: null,
    }
  },
  computed: {
    lastLine() {
      return this.lines.slice().reverse().find(line => line.source === 'self')
    },
    lastPeerLine() {
      return this.lines.slice().reverse().find(line => line.source === 'peer')
    },
    lastPoint() {
      return this.lastLine.points[this.lastLine.points.length - 1]
    },
    lastPeerPoint() {
      return this.lastPeerLine.points[this.lastPeerLine.points.length - 1]
    },
    erasing() {
      return this.operation === 'destination-out'
    },
  },
  methods: {
    getCoords(event) {
      const box = this.$refs.canvas.getBoundingClientRect()

      return {
        x: (event.clientX - box.left),
        y: (event.clientY - box.top),
      }
    },
    reset() {
      this.lines = []
      this.canvas.clear()

      this.$store.state.peers.forEach((peer) => {
        peer.send({ type: 'reset' })
      })
    },
    repaint() {
      this.canvas.clear()
      this.canvas.drawLines(this.lines)
    },
    undo() {
      this.lines = this.lines.filter(line => line !== this.lastLine)
      this.repaint()

      this.$store.state.peers.forEach((peer) => {
        peer.send({ type: 'undo' })
      })
    },
    addLine(point) {
      this.lines.push({
        source: 'self',
        points: [point],
        options: {
          color: this.color,
          operation: this.operation,
          size: this.size,
        },
      })

      this.$store.state.peers.forEach((peer) => {
        peer.send({
          type: 'start',
          point,
          options: {
            color: this.color,
            operation: this.operation,
            size: this.size,
          },
        })
      })
    },
    addSeg(end) {
      const [start, ...remaining] = this.lastLine.points.slice().reverse()

      this.lastLine.points.push(end)

      this.canvas.drawLine({
        points: [start, end],
        options: {
          size: this.size,
          color: this.color,
          operation: this.operation,
        },
      })

      this.$store.state.peers.forEach((peer) => {
        peer.send({
          type: 'move',
          point: end,
        })
      })
    },
    peerStart(point, options) {
      this.lines.push({
        source: 'peer',
        points: [point],
        options: {
          color: options.color,
          operation: options.operation,
          size: options.size,
        },
      })
    },
    peerMove(end) {
      const start = this.lastPeerPoint

      this.lastPeerLine.points.push(end)

      this.canvas.drawLine({
        points: [start, end],
        options: this.lastPeerLine.options,
      })
    },
    peerUndo() {
      this.lines = this.lines.filter(line => line !== this.lastPeerLine)
      this.repaint()
    },
    peerReset() {
      this.lines = []
      this.canvas.clear()
    },
    toggleEraser(event) {
      this.operation = this.erasing ? 'source-over' : 'destination-out'
    },
    toggleSizeSlider() {
      this.showSizeSlider = !this.showSizeSlider
    },
    toggleTools() {
      this.showTools = !this.showTools
    },
  },
  created() {
    this.unsubscribe = this.$store.subscribe(({ type, payload: message }, state) => {
      if (type === 'addMessage') {
        switch (message.type) {
          case 'start':
            this.peerStart(message.point, message.options)
            break;
          case 'move':
            this.peerMove(message.point)
            break;
          case 'undo':
            this.peerUndo()
            break;
          case 'reset':
            this.peerReset()
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
  mounted() {
    // Ensure the UI is fully rendered since we're accessing the canvas
    this.$nextTick(() => {
      this.canvas = new Canvas(this.$refs.canvas)

      this.canvas.fit()

      window.addEventListener('resize', () => {
        this.canvas.fit()
        this.repaint()
      })

      const onMouseMove = (event) => {
        const point = this.getCoords(event)

        this.addSeg(point)
      }

      const onMouseUp = (event) => {
        const point = this.getCoords(event)

        this.addSeg(point)

        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }

      const onMouseDown = (event) => {
        const point = this.getCoords(event)

        this.addLine(point)

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
      }

      const onTouchMove = (event) => {
        // only interact if a single finger is on the screen
        if (event.touches.length === 1) {
          const point = this.getCoords(event.touches[0])

          this.addSeg(point)
        }
      }

      const onTouchEnd = (event) => {
        if (event.touches.length === 1) {
          const point = this.getCoords(event.touches[0])

          this.addSeg(point)
        }

        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
      }

      const onTouchStart = (event) => {
        event.preventDefault()
        // only interact if a single finger is on the screen
        if (event.touches.length === 1) {
          const point = this.getCoords(event.touches[0])

          this.addLine(point)

          window.addEventListener('touchmove', onTouchMove)
          window.addEventListener('touchend', onTouchEnd)
        }
      }

      this.$refs.canvas.addEventListener('mousedown', onMouseDown)
      this.$refs.canvas.addEventListener('touchstart', onTouchStart)
    })
  }
}
</script>

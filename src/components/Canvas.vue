<template>
  <div class="position-relative border">
    <div v-if="showSizeSlider" @click="toggleSizeSlider" class="position-absolute top-0 bottom-0 start-0 end-0"></div>
    <div class="position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end">
      <button @click="toggleTools" class="btn bg-white border-primary text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
        </svg>
      </button>
      <div v-if="showTools" class="d-flex flex-column align-items-end">
        <button @click="toggleEraser" :class="{ 'active bg-danger text-white': erasing, 'bg-white text-danger': !erasing }" class="btn border-danger mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16">
            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
          </svg>
        </button>
        <button @click="undo" class="btn bg-white border-primary text-primary mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
          </svg>
        </button>
        <div class="d-flex align-items-center mt-1">
          <div v-if="showSizeSlider" class="d-flex align-items-center p-2 me-2 position-absolute end-100 bg-white rounded">
            <svg :style="{ color: color }" xmlns="http://www.w3.org/2000/svg" :width="minSize" :height="minSize" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
            <input v-model="size" type="range" min="5" max="20" class="mx-2">
            <svg :style="{ color: color }" xmlns="http://www.w3.org/2000/svg" :width="maxSize" :height="maxSize" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
          </div>
          <button @click="toggleSizeSlider" class="btn bg-white border-primary text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-toggle2-on" viewBox="0 0 16 16">
              <path d="M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z"/>
              <path d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z"/>
            </svg>
          </button>
        </div>
        <ButtonInputColor v-model="color" class="bg-white border-primary text-primary mt-1"></ButtonInputColor>
        <button @click="reset" class="btn bg-white border-danger text-danger mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </div>
    </div>
    <canvas ref="canvas" :width="width" :height="height" class="d-block"></canvas>
  </div>
</template>

<script>
import ButtonInputColor from '@/components/ButtonInputColor.vue'
import Canvas from '@/lib/canvas.js'

export default {
  name: 'Canvas',
  components: {
    ButtonInputColor,
  },
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
    }
  },
  props: {
    p2p: Object,
    default: {},
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
      this.p2p.send({ type: 'reset' })
    },
    repaint() {
      this.canvas.clear()
      this.canvas.drawLines(this.lines)
    },
    undo() {
      this.lines = this.lines.filter(line => line !== this.lastLine)
      this.repaint()
      this.p2p.send({ type: 'undo' })
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

      this.p2p.send({
        type: 'start',
        point,
        options: {
          color: this.color,
          operation: this.operation,
          size: this.size,
        },
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

      this.p2p.send({
        type: 'move',
        point: end,
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
  mounted() {
    // Ensure the UI is fully rendered since we're accessing the canvas
    this.$nextTick(() => {
      this.canvas = new Canvas(this.$refs.canvas)

      this.canvas.fit()

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

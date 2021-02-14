<template>
  <div class="position-relative border">
    <div v-if="showSizeSlider" @click="toggleSizeSlider" class="position-absolute top-0 bottom-0 start-0 end-0"></div>
    <div class="position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end">
      <button @click="toggleTools" class="btn border-primary text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
        </svg>
      </button>
      <div v-if="showTools" class="d-flex flex-column align-items-end">
        <button @click="toggleEraser" :class="{ 'active bg-danger text-white': erasing, 'text-danger': !erasing }" class="btn border-danger mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16">
            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
          </svg>
        </button>
        <button @click="undo" class="btn border-primary text-primary mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
          </svg>
        </button>
        <div class="d-flex align-items-center mt-1">
          <div v-if="showSizeSlider" class="d-flex align-items-center p-2 me-2 position-absolute end-100 bg-translucent rounded">
            <svg :style="{ color: color }" xmlns="http://www.w3.org/2000/svg" :width="minSize" :height="minSize" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
            <input v-model="size" type="range" min="5" max="20" class="mx-2">
            <svg :style="{ color: color }" xmlns="http://www.w3.org/2000/svg" :width="maxSize" :height="maxSize" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
          </div>
          <button @click="toggleSizeSlider" class="btn border-primary text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-toggle2-on" viewBox="0 0 16 16">
              <path d="M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z"/>
              <path d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z"/>
            </svg>
          </button>
        </div>
        <button @click="toggleColorPicker" class="btn border-primary text-primary mt-1">
          <div class="position-absolute overflow-hidden" style="width: 0;">
            <input v-model="color" ref="colorPicker" type="color" class="invisible">
          </div>
          <svg :style="{ color: color }" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-palette2" viewBox="0 0 16 16">
            <path d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 .5.5v5.277l4.147-4.131a.5.5 0 0 1 .707 0l3.535 3.536a.5.5 0 0 1 0 .708L10.261 10H15.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H3a2.99 2.99 0 0 1-2.121-.879A2.99 2.99 0 0 1 0 13.044m6-.21l7.328-7.3-2.829-2.828L6 7.188v5.647zM4.5 13a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zM15 15v-4H9.258l-4.015 4H15zM0 .5v12.495z"/>
            <path d="M0 12.995V13a3.07 3.07 0 0 0 0-.005z"/>
          </svg>
        </button>
        <button @click="reset" class="btn border-danger text-danger mt-1">
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
export default {
  name: 'Canvas',
  data() {
    return {
      color: '#000000',
      context: null,
      lines: [],
      size: 5,
      minSize: 5,
      maxSize: 20,
      width: 500,
      height: 400,
      operation: 'source-over',
      showTools: true,
      showSizeSlider: false,
      activeTool: ''
    }
  },
  props: {
    p2p: Object,
    default: {},
  },
  computed: {
    lastLine() {
      return this.lines[this.lines.length - 1]
    },
    lastPoint() {
      return this.lastLine.points[this.lastLine.points.length - 1]
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
      this.clear()

      this.p2p.send({
        type: 'reset',
      })
    },
    clear() {
      this.context.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
    },
    drawLine(line) {
      const [start, ...remaining] = line.points

      this.drawStart(start, {
        color: line.color,
        operation: line.operation,
        size: line.size,
      })

      remaining.forEach(this.drawSeg)
      this.context.stroke()
    },
    repaint() {
      this.clear()
      this.lines.forEach(this.drawLine)
    },
    undo() {
      this.lines = this.lines.slice(0, -1)
      this.repaint()

      this.p2p.send({
        type: 'undo',
      })
    },
    addLine(point) {
      this.lines.push({
        color: this.color,
        operation: this.operation,
        size: this.size,
        points: [point],
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

      this.drawStart(point, {
        size: this.size,
        color: this.color,
        operation: this.operation,
      })
      this.context.stroke()
    },
    addSeg(point) {
      this.lastLine.points.push(point)

      this.drawSeg(point)
      this.context.stroke()
      this.p2p.send({
        type: 'move',
        point,
      })
    },
    peerStart(point, options) {
      this.lines.push({
        color: options.color,
        operation: options.operation,
        size: options.size,
        points: [point],
      })

      this.drawStart(point, {
        size: options.size,
        color: options.color,
        operation: options.operation,
      })
      this.context.stroke()
    },
    peerMove(point) {
      this.lastLine.points.push(point)

      this.drawSeg(point)
      this.context.stroke()
    },
    peerUndo() {
      this.lines = this.lines.slice(0, -1)
      this.repaint()
    },
    peerReset() {
      this.lines = []
      this.clear()
    },
    drawSeg(point) {
      // draw line segment
      this.context.lineTo(point.x, point.y)
    },
    drawStart(point, { size, color, operation }) {
      // draw starting point
      this.context.lineWidth = size
      this.context.strokeStyle = color
      this.context.fillStyle = color
      this.context.lineCap = 'round'
      this.context.globalCompositeOperation = operation
      this.context.moveTo(point.x, point.y)
      this.context.beginPath()
      this.context.arc(point.x, point.y, (size / 2), 0, (2 * Math.PI))
      this.context.closePath()
      this.context.fill()
      this.context.beginPath()
    },
    toggleColorPicker(event) {
      if (this.$refs.colorPicker === document.activeElement) {
        this.$refs.colorPicker.blur()
      } else {
        this.$refs.colorPicker.click()
      }
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
    this.context = this.$refs.canvas.getContext('2d')
    this.context.lineCap = 'round'
    this.context.globalCompositeOperation = 'source-over'
    this.context.translate(0.5, 0.5)

    // match container dimensions
    this.width = this.$refs.canvas.parentElement.clientWidth
    this.height = this.$refs.canvas.parentElement.clientHeight

    const onMouseMove = (event) => {
      const point = this.getCoords(event)

      this.addSeg(point)
    }

    const onMouseDown = (event) => {
      const point = this.getCoords(event)

      this.addLine(point)

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', onMouseMove)
      })
    }

    const onTouchMove = (event) => {
      // only interact if a single finger is on the screen
      if (event.touches.length === 1) {
        const point = this.getCoords(event.touches[0])

        this.addSeg(point)
      }
    }

    const onTouchEnd = (event) => {
      const point = this.lastPoint

      this.addSeg(point)

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
  }
}
</script>

<style scoped>
.bg-translucent {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>

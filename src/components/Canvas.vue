<template>
  <div>
    <div class="d-flex align-items-center justify-content-between my-3">
      <button @click="undo" class="btn btn-sm btn-primary">Undo</button>
      <button @click="reset" class="btn btn-sm btn-danger ms-1">Clear</button>
      <input v-model="size" type="range" min="1" max="10">
      <input v-model="color" type="color">
    </div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
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
      size: 1,
      width: 500,
      height: 500,
    }
  },
  computed: {
    lastLine() {
      return this.lines[this.lines.length - 1]
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
    },
    clear() {
      this.context.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
    },
    drawLine(line) {
      const [start, ...remaining] = line.points

      // draw starting point
      this.context.moveTo(start.x, start.y)
      this.context.lineWidth = line.size
      this.context.strokeStyle = line.color
      this.context.beginPath()
      this.context.stroke()

      remaining.forEach((point) => {
        // draw line segment
        this.context.lineTo(point.x, point.y)
        this.context.stroke()
      })
    },
    repaint() {
      this.clear()
      this.lines.forEach(this.drawLine)
    },
    undo() {
      this.lines = this.lines.slice(0, -1)
      this.repaint()
    },
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.context.lineCap = 'round'

    this.width = this.$refs.canvas.parentElement.clientWidth
    this.height = this.$refs.canvas.parentElement.clientHeight

    const drawSeg = (point) => {
      this.lastLine.points.push(point)

      // draw line segment
      this.context.lineTo(point.x, point.y)
      this.context.stroke()
    }

    const startLine = (point) => {
      this.lines.push({
        color: this.color,
        size: this.size,
        points: [point],
      })

      // draw starting point
      this.context.moveTo(point.x, point.y)
      this.context.lineWidth = this.size
      this.context.strokeStyle = this.color
      this.context.beginPath()
      this.context.stroke()
    }

    const onMouseMove = (event) => {
      const point = this.getCoords(event)

      drawSeg(point)
    }

    const onMouseDown = (event) => {
      const point = this.getCoords(event)

      startLine(point)

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', onMouseMove)
      })
    }

    const onTouchMove = (event) => {
      // only interact if a single finger is on the screen
      if (event.touches.length === 1) {
        const point = this.getCoords(event.touches[0])

        drawSeg(point)
      }
    }

    const onTouchStart = (event) => {
      event.preventDefault()
      // only interact if a single finger is on the screen
      if (event.touches.length === 1) {
        const point = this.getCoords(event.touches[0])

        startLine(point)

        window.addEventListener('touchmove', onTouchMove)
        window.addEventListener('touchend', () => {
          window.removeEventListener('touchmove', onTouchMove)
        })
      }
    }

    this.$refs.canvas.addEventListener('mousedown', onMouseDown)
    this.$refs.canvas.addEventListener('touchstart', onTouchStart)
  }
}
</script>

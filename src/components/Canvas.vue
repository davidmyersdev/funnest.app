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
    lastPoint() {
      return this.lastLine.points[this.lastLine.points.length - 1]
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
      const last = remaining.pop()

      this.drawStart(start, {
        size: line.size,
        color: line.color,
      })

      remaining.forEach(this.drawSeg)

      this.drawFinal(last, {
        size: line.size,
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
    addLine(point) {
      this.lines.push({
        color: this.color,
        size: this.size,
        points: [point],
      })

      this.drawStart(point, {
        size: this.size,
        color: this.color,
      })
    },
    addSeg(point) {
      this.lastLine.points.push(point)

      this.drawSeg(point)
    },
    addFinal(point) {
      this.lastLine.points.push(point)

      this.drawFinal(point, {
        size: this.size,
      })
    },
    drawSeg(point) {
      // draw line segment
      this.context.lineTo(point.x, point.y)
      this.context.stroke()
    },
    drawStart(point, { size, color }) {
      // draw starting point
      this.context.lineWidth = size
      this.context.strokeStyle = color
      this.context.fillStyle = color
      this.context.moveTo(point.x, point.y)
      this.context.beginPath()
      this.context.arc(point.x, point.y, (size / 2), 0, (2 * Math.PI))
      this.context.closePath()
      this.context.fill()
      this.context.beginPath()
      this.context.stroke()
    },
    drawFinal(point, { size }) {
      this.context.lineTo(point.x, point.y)
      this.context.beginPath()
      this.context.arc(point.x, point.y, (size / 2), 0, (2 * Math.PI))
      this.context.closePath()
      this.context.fill()
    },
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.context.lineCap = 'round'
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

      this.addFinal(point)

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

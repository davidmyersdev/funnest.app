class Canvas {
  constructor(canvas) {
    this.context = canvas.getContext('2d')

    this.context.translate(0.5, 0.5)
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }

  drawLine({ points, options }) {
    let [start, ...remaining] = points

    this.context.beginPath()

    remaining.forEach((end) => {
      this.drawLinePath(start, end, options)

      start = end
    })

    this.context.stroke()
  }

  drawLinePath(start, end, options) {
    // apply styles
    this.context.lineCap = 'round'
    this.context.fillStyle = options.color
    this.context.globalCompositeOperation = options.operation
    this.context.lineWidth = options.size
    this.context.strokeStyle = options.color

    // create line
    this.context.moveTo(start.x, start.y)
    this.context.lineTo(end.x, end.y)
  }

  drawLines(lines) {
    lines.forEach(this.drawLine, this)
  }

  fit() {
    this.context.canvas.width = this.context.canvas.parentElement.clientWidth
    this.context.canvas.height = this.context.canvas.parentElement.clientHeight
  }
}

export default Canvas

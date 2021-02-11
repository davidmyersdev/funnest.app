<template>
  <div class="container">
    <div v-if="!starting && !join">
      <button @click="startSession" class="btn btn-primary">Start Session</button>
      <button @click="joinSession" class="btn btn-secondary ms-1">Join Session</button>
    </div>

    <div v-if="starting">
      <div class="mb-3">
        <label class="form-label">Your Request</label>
        <input v-model="myOffer" type="text" class="form-control">
        <div class="form-text">Send this to a friend.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Their Answer</label>
        <input v-model="theirAnswer" type="text" class="form-control">
        <div class="form-text">Get this from a friend.</div>
      </div>
      <button @click="acceptAnswer" class="btn btn-secondary ms-1">Accept Answer</button>
    </div>
    <div v-if="join">
      <div class="mb-3">
        <label class="form-label">Their Request</label>
        <input v-model="theirOffer" type="text" class="form-control">
        <div class="form-text">Send this to a friend.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Your Answer</label>
        <input v-model="myAnswer" type="text" class="form-control">
        <div class="form-text">Get this from a friend.</div>
      </div>
      <button @click="acceptRequest" class="btn btn-secondary ms-1">Accept Request</button>
    </div>
    <canvas ref="canvas" width="500" height="500"></canvas>
  </div>
</template>

<script>
import P2P from '@/lib/p2p'
export default {
  data() {
    return {
      p2p: null,
      myOffer: '',
      myAnswer: '',
      theirOffer: '',
      theirAnswer: '',
      starting: false,
      join: false,
      context: null,
    }
  },
  methods: {
    createOffer() {
      this.p2p.createOffer().then((offer) => {
        this.myOffer = btoa(JSON.stringify(offer))
      })
    },
    acceptOffer() {
      this.p2p.acceptOffer(JSON.parse(atob(this.theirOffer))).then((answer) => {
        this.myAnswer = btoa(JSON.stringify(answer))
      })
    },
    acceptAnswer() {
      this.p2p.acceptAnswer(JSON.parse(atob(this.theirAnswer)))
    },
    startSession() {
      this.starting = true

      this.createOffer()
    },
    joinSession() {
      this.join = true
    },
    acceptRequest() {
      this.acceptOffer()
    },
    onMessage(data) {
      if (data) {
        switch (data.message) {
          case 'start':
            this.start(data.value.x, data.value.y)
            break;
          case 'move':
            this.move(data.value.x, data.value.y)
            break;
          default:
            break;
        }
      }
    },
    start(x, y) {
      this.context.moveTo(x, y)
      this.context.beginPath()
      this.context.stroke()
    },
    startPeer(x, y) {
      this.p2p.send({
        message: 'start',
        value: { x, y },
      })
    },
    move(x, y) {
      this.context.lineTo(x, y)
      this.context.stroke()
    },
    movePeer(x, y) {
      this.p2p.send({
        message: 'move',
        value: { x, y },
      })
    },
  },
  mounted() {
    this.p2p = new P2P()

    this.p2p.onMessage = this.onMessage

    const getCoords = (event) => {
      const box = this.$refs.canvas.getBoundingClientRect()

      return [(event.clientX - box.left), (event.clientY - box.top)]
    }

    this.context = this.$refs.canvas.getContext('2d')

    const onMouseMove = (event) => {
      const [x, y] = getCoords(event)

      this.move(x, y)
      this.movePeer(x, y)
    }

    this.$refs.canvas.addEventListener('mousedown', (event) => {
      const [x, y] = getCoords(event)

      this.start(x, y)
      this.startPeer(x, y)

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', onMouseMove)
      })
    })
  }
}
</script>

<style>
canvas {
  border: 1px solid #000;
}
</style>

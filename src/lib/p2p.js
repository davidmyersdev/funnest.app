const RTCPeerConnection = window.RTCPeerConnection || webkitRTCPeerConnection || mozRTCPeerConnection

class P2P {
  constructor() {
    this.connection = new RTCPeerConnection({
      iceServers: [{
        urls: ['stun:stun.l.google.com:19302'],
      }],
    })

    this.onOpen = () => {}
    this.onMessage = () => {}
    this.channel = null
  }

  send(data) {
    if (this.channel) {
      this.channel.send(JSON.stringify(data))
    }
  }

  createOffer() {
    this.channel = this.connection.createDataChannel('main')

    this.channel.onopen = this.onOpen
    this.channel.onmessage = (message) => {
      this.onMessage(JSON.parse(message.data))
    }

    return new Promise((resolve, reject) => {
      this.connection.createOffer().then((offer) => {
        this.connection.setLocalDescription(offer)
      })

      this.connection.onicecandidate = (event) => {
        if (event.candidate === null) {
          // do a thing
          resolve(this.connection.localDescription)
        }
      }
    })
  }

  acceptOffer(peerOffer) {
    const peerDescription = new RTCSessionDescription(peerOffer)

    this.connection.ondatachannel = (event) => {
      this.channel = event.channel

      this.channel.onopen = this.onOpen
      this.channel.onmessage = (message) => {
        this.onMessage(JSON.parse(message.data))
      }
    }

    return new Promise((resolve, reject) => {
      this.connection.onicecandidate = (event) => {
        if (event.candidate === null) {
          resolve(this.connection.localDescription)
        }
      }

      this.connection.setRemoteDescription(peerDescription)
      this.connection.createAnswer().then((answer) => {
        this.connection.setLocalDescription(answer)
      }).catch(reject)
    })
  }

  acceptAnswer(peerAnswer) {
    return this.connection.setRemoteDescription(new RTCSessionDescription(peerAnswer))
  }
}

export default P2P

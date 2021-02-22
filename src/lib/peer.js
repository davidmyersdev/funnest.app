const RTCPeerConnection = window.RTCPeerConnection || webkitRTCPeerConnection || mozRTCPeerConnection

class Peer {
  constructor({ id }) {
    this.id = id
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
    if (this.connection.connectionState) {
      if (this.channel) {
        if (this.channel.readyState === 'open') {
          this.channel.send(JSON.stringify(data))
        } else {
          // readyState not open
          console.info('dataChannel.readyState', this.channel.readyState)
        }
      } else {
        // no data channel
        console.info('datachannel', this.channel)
      }
    } else {
      // not connected
      console.info('connection', this.connection.connectionState)
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

export default Peer

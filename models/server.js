const express = require('express')
const cors = require('cors')
const { socketController } = require('../sockets/controller')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {}
    this.server = require('http').createServer(this.app)
    this.io = require('socket.io')(this.server)

    // Middlewares
    this.middlewares()

    // Router of app
    this.routers()

    // Sockets
    this.sockets()
  }

  middlewares () {
    // CORS
    this.app.use(cors())

    // Read y whirte of body
    this.app.use(express.json())

    // Dir public
    this.app.use(express.static('public'))
  }

  routers () {}

  sockets () {
    this.io.on('connection', socketController)
  }

  listen () {
    this.server.listen(this.port, () => {
      console.log('Server runing on port ', this.port)
    })
  }
}

module.exports = Server

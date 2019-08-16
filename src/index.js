import { Server } from './server'
const config = require('./configurations/config')

const server = Server()

server.listen(config.port)
  .then((server) => {
    console.log(`Server is running on port ${server.address().port}`)
  })

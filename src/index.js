const config = require('./configurations/config')
import { Server } from './server'

const server = Server();

server.listen(config.port)
  .then((server) => {
    console.log(`Server is running on port ${server.address().port}`)
  })

import { Server } from './server'
import { properties } from './properties'

const server = Server()

server.listen(properties.port)
  .then((server) => {
    console.log(`Server is running on port ${server.address().port}`)
  })

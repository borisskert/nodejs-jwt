import { properties } from './properties'
import { Users } from './users'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function createToken (username) {
  const payload = {
    username
  }

  return jwt.sign(payload, properties.secret, {
    expiresIn: properties.expiry
  })
}

const users = Users()

export const authentication = {
  authenticate: (credentials) => {
    return new Promise((resolve, reject) => {
      const foundUser = users.find(credentials.username)

      if (foundUser) {
        bcrypt.compare(credentials.password, foundUser.password, (error, result) => {
          if (error) {
            reject(error)
          } else if (result) {
            const token = createToken(foundUser.username)
            resolve(token)
          } else {
            console.log(result)
            reject(new Error('Password incorrect'))
          }
        })
      } else {
        reject(new Error('User not found'))
      }
    })
  },
  verify: (token) => {
    return new Promise((resolve, reject) => {
      if (token) {
        jwt.verify(token, properties.secret, (error, decoded) => {
          if (error) {
            reject(new Error('Invalid token'))
          } else {
            resolve(decoded)
          }
        })
      } else {
        reject(new Error('No token provided'))
      }
    })
  }
}

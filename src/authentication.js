const jwt = require('jsonwebtoken')
const config = require('./configurations/config')
const users = require('./users')
const bcrypt = require('bcrypt')

function createToken (username) {
  const payload = {
    username
  }

  return jwt.sign(payload, config.secret, {
    expiresIn: config.expiry
  })
}

module.exports = {
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
        jwt.verify(token, config.secret, (error, decoded) => {
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

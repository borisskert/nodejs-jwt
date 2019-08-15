const jwt = require('jsonwebtoken');
const config = require('./configurations/config');

module.exports = {
  authenticate: (credentials) => {
    const foundUser = config.users
      .find(user => user.username === credentials.username);

    if (foundUser) {
      if (foundUser.password === credentials.password) {
        const payload = {
          username: foundUser.username
        };

        return jwt.sign(payload, config.secret, {
          expiresIn: config.expiry
        });
      } else {
        throw new Error('Password incorrect');
      }
    } else {
      throw new Error('User not found');
    }
  },
  verify: (token) => {
    return new Promise((resolve, reject) => {
      if (token) {
        jwt.verify(token, config.secret, (error, decoded) => {
          if (error) {
            reject('Invalid token')
          } else {
            resolve(decoded);
          }
        });

      } else {
        reject('No token provided');
      }
    })
  }
}

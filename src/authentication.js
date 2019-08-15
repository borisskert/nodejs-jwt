const jwt = require('jsonwebtoken');
const config = require('./configurations/config');

module.exports = (credentials) => {
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
}

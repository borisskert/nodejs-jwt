module.exports = {
  secret: process.env.JWT_SECRET || '01234567890ABCDEF',
  expiry: process.env.JWT_EXPIRY || 1440,
  port: process.env.LISTEN_PORT || 3000
}

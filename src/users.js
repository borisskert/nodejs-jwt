const fs = require('fs')

const filename = './users.json'

function initUsers () {
  if (fs.existsSync(filename)) {
    const content = fs.readFileSync(filename)
    return JSON.parse(content)
  }

  return []
}

export const Users = () => {
  const users = initUsers()

  return {
    find: (username) => {
      return users.find(user => user.username === username)
    }
  }
}

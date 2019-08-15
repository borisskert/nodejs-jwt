const fs = require('fs');

const filename = './users.json'

function initUsers () {
  if (fs.existsSync(filename)) {
    const content = fs.readFileSync(filename);
    return JSON.parse(content);
  }

  return [];
}

const users = initUsers();

module.exports = {
  find: (username) => {
    return users.find(user => user.username === username);
  }
};

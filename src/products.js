const fs = require('fs');

const content = fs.readFileSync('./products.json')
module.exports = JSON.parse(content);

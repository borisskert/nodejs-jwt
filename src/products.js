const fs = require('fs');

const content = fs.readFileSync('./products.json');
const products = JSON.parse(content);

module.exports = {
  getAll: () => {
    return products;
  },
  getById: (id) => {
    return products.find(product => product.id === id);
  }
};

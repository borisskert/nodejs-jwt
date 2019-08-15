const fs = require('fs')

const filename = './products.json'

function initProducts () {
  if (fs.existsSync(filename)) {
    const content = fs.readFileSync(filename)
    return JSON.parse(content)
  }

  return []
}

const products = initProducts()

module.exports = {
  getAll: () => {
    return products
  },
  getById: (id) => {
    return products.find(product => product.id === id)
  },
  add: (product) => {
    products.push(product)

    const productsAsJson = JSON.stringify(products)
    fs.writeFileSync(filename, productsAsJson)
  }
}

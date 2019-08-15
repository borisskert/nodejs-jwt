const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  authentication = require('./authentication'),
  products = require('./products'),
  app = express();

// use morgan to log requests to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

app.post('/authenticate', (request, response) => {
  const credentials = request.body;

  authentication.authenticate(credentials)
    .then(token => {
      response.json({
        message: 'authentication done',
        token: token
      });
    })
    .catch(error => {
      response.status(401).json(error)
    });
})

const protectedRoutes = express.Router();

app.use('/api', protectedRoutes);

protectedRoutes.use((req, res, next) => {
  const token = req.headers['access-token'];

  authentication.verify(token)
    .then(decoded => {
      req.decoded = decoded;
      next();
    })
    .catch(e => {
      res.json({message: e})
    })
});

protectedRoutes.get('/products', (req, res) => {
  res.json(products.getAll())
})

protectedRoutes.get('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = products.getById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send();
  }
});

protectedRoutes.post('/products', (req, res) => {
  const product = req.body;

  if (product) {
    products.add(product);
    res.status(201).send();
  } else {
    res.status(400).send();
  }
});

module.exports = app;

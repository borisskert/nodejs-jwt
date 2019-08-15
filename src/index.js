const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  config = require('./configurations/config'),
  authentication = require('./authentication'),
  app = express();

// use morgan to log requests to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
});

app.post('/authenticate', (request, response) => {
  const credentials = request.body;

  try {
    const token = authentication.authenticate(credentials);
    response.json({
      message: 'authentication done',
      token: token
    });
  } catch (e) {
    response.json({message: e.message})
  }
})

const ProtectedRoutes = express.Router();

app.use('/api', ProtectedRoutes);

ProtectedRoutes.use((req, res, next) => {
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

ProtectedRoutes.get('/getAllProducts', (req, res) => {
  let products = [
    {
      id: 1,
      name: 'cheese'
    },
    {
      id: 2,
      name: 'carottes'
    }
  ]

  res.json(products)
})

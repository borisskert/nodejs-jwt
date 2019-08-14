const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  jwt = require('jsonwebtoken'),
  config = require('./configurations/config'),
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

  const foundUser = config.users
    .find(user => user.username === credentials.username);

  if (foundUser) {
    if (foundUser.password === credentials.password) {
      const payload = {
        check: true
      };

      const token = jwt.sign(payload, config.secret, {
        expiresIn: config.expiry
      });

      response.json({
        message: 'authentication done',
        token: token
      });
    } else {
      response.json({message: 'please check your password!'})
    }
  } else {
    response.json({message: 'user not found !'})
  }
})

const ProtectedRoutes = express.Router();

app.use('/api', ProtectedRoutes);

ProtectedRoutes.use((req, res, next) => {

  // check header for the token
  var token = req.headers['access-token'];

  // decode token
  if (token) {

    // verifies secret and checks if the token is expired
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({message: 'invalid token'});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token

    res.send({
      message: 'No token provided.'
    });

  }
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

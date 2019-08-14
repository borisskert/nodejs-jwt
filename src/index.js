const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  jwt = require('jsonwebtoken'),
  config = require('./configurations/config'),
  app = express();

//set secret
app.set('Secret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

app.listen(3000, () => {

  console.log('server is running on port 3000')

});
app.get('/', function (req, res) {
  res.send('Hello world  app is running on http://localhost:3000/');
});

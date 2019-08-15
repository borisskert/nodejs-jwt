const config = require('./configurations/config'),
  server = require('./server');

const runningServer = server.listen(config.port, () => {
  console.log(`Server is running on port ${runningServer.address().port}`)
});

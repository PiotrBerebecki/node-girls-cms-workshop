var http = require('http');
var router = require('./src/router');

var server = http.createServer(router);

var port = 4000;
server.listen(port, function() {
  console.log('listening on port: ', port);
});

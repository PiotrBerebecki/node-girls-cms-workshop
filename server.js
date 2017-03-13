var http = require('http');

var router = require('./src/router');


var server = http.createServer(router);

var message = "I'm happy";

server.listen(4000, function() {
  console.log('server on port 4000');
});

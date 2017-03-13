var http = require ('http');

var server = http.createServer();

server.listen(3000,function() {
 console.log('server on port 3000'); 
});


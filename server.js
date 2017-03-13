var http = require ('http');

var server = http.createServer(handler);

var message = "I'm happy";

function handler(request, response) {
  response.writeHead(200, { "Content-Type": "text/html"} );
  response.write(message);
  response.end();
}

server.listen(3000,function() {
  console.log('server on port 3000');
});

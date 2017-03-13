var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(handler);

var message = "I'm happy";

function handler(request, response) {
  var endpoint = request.url;
  if (endpoint === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.readFile(path.join(__dirname, 'public', 'index.html'), function(err, file) {
      if (err) {
        throw new Error(err);
      }
      response.end(file);
    });
  } else if (endpoint === '/node') {
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write('This is the node page');
    response.end();

  } else if (endpoint === '/girls') {

    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write('This is the girls page');
    response.end();

  } else {

    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write('Default');
    response.end();
  }
}

server.listen(4000, function() {
  console.log('server on port 4000');
});

var fs = require('fs');
var path = require('path');
var querystring = require ('querystring');


var handler = {};


handler.serveLanding = function(request, response) {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), function(err, file) {
    if (err) {
      throw new Error(err);
    }
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.end(file);
  });
};


handler.serveAssets = function(request, response, extension) {
  var extensionType = {
    "css": "text/css",
    "jpg": "image/jpeg"
  };

  fs.readFile(path.join(__dirname,  '..', 'public', request.url), function(err, file) {
    if (err) {
      throw new Error(err);
    }
    response.writeHead(200, {
      'Content-Type': extensionType[extension]
    });
    response.end(file);
  });
};


handler.createPost = function(request, response) {
  var allTheData = '';

  request.on('data', function(chunkOfData) {
    // do something
    allTheData += chunkOfData;
  });

  request.on('end', function() {
    var convertedData = querystring.parse(allTheData);
    console.log(convertedData);
    response.writeHead(302,{'Location':'/'});
    response.end();
  });
};


handler.serveNotFound = function(request, response) {
  response.writeHead(404, {
    "Content-Type": "text/html"
  });
  response.write('404: Not found');
  response.end();
};


module.exports = handler;

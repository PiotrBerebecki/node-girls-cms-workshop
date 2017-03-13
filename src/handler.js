var handler = {};
var fs = require('fs');
var path = require('path');



handler.serveLanding = function(req, res) {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), function(err, file) {
    if (err) {
      throw new Error(err);
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(file);
    }
  });
};


handler.serveAssets = function(req, res,extension) {
  var extensionType = {
    'js':'application/javascript',
    'css':'text/css',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'ico': 'image/x-icon'
  };
  fs.readFile(path.join(__dirname, '..', 'public',req.url), function(err, file) {
    if (err) {
      throw new Error(err);
    } else {
      res.writeHead(200, {
        'Content-Type': extensionType[extension]
      });
      res.end(file);
    }
  });
};



module.exports = handler;

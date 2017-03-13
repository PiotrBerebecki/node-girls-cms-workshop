var handler = {};
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');



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



handler.savePost = function(req, res) {
  var allData ='';

  req.on('data', function(chunk) {
    allData += chunk;
  });

  req.on('end', function() {
    var convertedData = querystring.parse(allData);


    fs.readFile(path.join(__dirname, 'posts.json'), function(err, file) {
      if (err) {
        throw new Error(err);
      }
      console.log(file.toString());
      var posts = JSON.parse(file.toString());
      posts[Date.now()] = convertedData.post;

      fs.writeFile(path.join(__dirname, './posts.json'), JSON.stringify(posts), function(err) {
        if (err) {
          throw new Error(err);
        } else {
          res.writeHead(302, { 'Location': '/' } );
          res.end();
        }
      });
    });
  });
};



module.exports = handler;

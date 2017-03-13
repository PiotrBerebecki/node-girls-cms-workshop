var fs = require('fs');
var path = require('path');
var querystring = require('querystring');


var handler = {};

handler.serveLanding = function(req, res) {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), function(err, file) {
    if (err) {
      throw new Error(err);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
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
      res.writeHead(200, { 'Content-Type': extensionType[extension] });
      res.end(file);
    }
  });
};


handler.servePosts = function(req, res) {
  fs.readFile(path.join(__dirname, 'posts.json'), 'utf8', function(err, file) {
    if (err) {
      throw new Error(err);
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(file);
  });
};


handler.savePost = function(req, res) {
  var allTheData ='';

  req.on('data', function(chunkOfData) {
    allTheData += chunkOfData;
  });

  req.on('end', function() {
    var convertedData = querystring.parse(allTheData);

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


handler.serveNotFound = function(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404: Not found</h1>');
};


module.exports = handler;

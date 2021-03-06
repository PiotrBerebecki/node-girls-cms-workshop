var path = require('path');

var handler = require('./handler');


function router(req, res) {
  var endpoint = req.url;
  var extension = path.extname(endpoint).slice(1);

  if (endpoint === '/') {
    handler.serveLanding(req, res);
  } else if (extension) {
    handler.serveAssets(req, res, extension);
  } else if (endpoint === '/posts') {
    handler.servePosts(req, res);
  } else if (endpoint === '/create/post') {
    handler.savePost(req, res);
  } else {
    handler.serveNotFound(req, res);
  }
}

module.exports = router;

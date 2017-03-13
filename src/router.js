var path = require('path');

var handler = require('./handler');


function router(request, response) {
  var endpoint = request.url;
  var extension = path.extname(request.url).slice(1);

  if (endpoint === '/') {
    handler.serveLanding(request, response);
  } else if (extension) {
    handler.serveAssets(request, response, extension);
  } else if (endpoint === '/create-post') {
    handler.createPost(request, response);
  } else {
    handler.serveNotFound(request, response);
  }
}


module.exports = router;

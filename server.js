var http = require('http');
var PORT = 3000;
var url = require('url');
var qs = require('querystring')

var server = http.createServer(function(request, response) {
  var queryString = url.parse( request.url );
  var dataBuffer = '';

  request.on('data', function(data) {
    dataBuffer += data;
  });

  request.on('end', function() {
    console.log('done getting data');
    var data = qs.parse(dataBuffer.toString());
    console.log(data);

    response.end('Hello ' + data.weapon + ' ' + data.animal);
  });

  // console.log('server created', request.url);
  // response.write('send data!!');
});


server.listen(PORT, function() {
  console.log('server listening on port' + PORT);
});
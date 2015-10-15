var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var PORT = 3000;

var server = http.createServer(function(request, response) {
  var queryString = url.parse( request.url );
  var dataBuffer = '';

  request.on('data', function(data) {
    dataBuffer += data;
  });


  request.on('end', function() {
    var data = qs.parse(dataBuffer.toString());
    console.log('databuffer', dataBuffer.toString());
    console.log('data', data);
    var insides = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements - ' + data.elementName + '</title><link rel="stylesheet" href="/css/styles.css"></head><body><h1>' + data.elementName + '</h1><h2>' + data.elementSymbol + '</h2><h3>Atomic number ' + data.elementAtomicNumber + '</h3><p>' + data.elementDescription + '</p><p><a href="/">back</a></p></body></html>';

    if (request.method === 'POST') {
      if (request.url === '/elements') {
        fs.writeFile('./public/' + data.elementName + '.html', insides, function(err) {
        if (err) {
          throw err;
        } else {
          console.log('save complete');
        }
      });
      }
      response.end(JSON.stringify({ 'success' : true }));
    }

    if (request.method === 'GET') {
      var inputFromBrowser = url.parse(request.url);

      fs.readFile('./public/' + inputFromBrowser.path, function(err,data) {
      if (err) {
        fs.readFile('./public/404.html', function(err2, data2) {
          response.end(data2.toString());
        });
      } else {
        response.end(data.toString());
      }
    });
    }
  });
});

server.listen(PORT, function() {
  console.log('server listening on port' + PORT);
});
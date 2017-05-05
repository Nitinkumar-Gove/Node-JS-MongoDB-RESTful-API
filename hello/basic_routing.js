var http = require('http');

var server = http.createServer(function(request, response){

  response.writeHead(200, {'Content-Type':'application/JSON'});
  res = {};

  if(request.url === '/home')
    res.route = '/home'
  else if(request.url === '/aboutus')
    res.route = '/aboutus'
  else if(request.url === '/careers')
    res.route = '/careers'
  else
    res.route = 'default'

  response.end(JSON.stringify(res));

});

server.listen(4000, '127.0.0.1');
console.log('live and alert');

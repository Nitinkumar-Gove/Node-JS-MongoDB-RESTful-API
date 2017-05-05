var http = require('http');

var server = http.createServer(function(request, response){
  console.log('request url:' + request.url)
  response.writeHead(200,{'Content-Type':'application/json'});

  var task = {
    'title' : 'finish 280 project backend',
    'description' : 'finish the modules'
  };

  response.end(JSON.stringify(task));
});
server.listen(5000,'127.0.0.1');
console.log('up and running...');

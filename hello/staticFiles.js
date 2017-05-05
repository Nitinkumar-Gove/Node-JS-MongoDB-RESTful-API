

var express = require('express');

//var server = express.createServer();
// express.createServer()  is deprecated.
var server = express(); // better instead

server.listen(3000,function(){

});


server.get("/",function(req, res)
{

  console.log("came here");
  server.use('/public', express.static(__dirname + '/public'));
  server.use(express.static(__dirname + '/public'));

});

// *** This needs to be worked on again.

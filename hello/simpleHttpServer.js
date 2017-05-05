// include the http module
var server = require("http");

// create a server listening on a port
server.createServer(handleRequests).listen(786,"127.0.0.1");

// console ACK
console.log("Server is up and running ...");

// function to handle requests
function handleRequests(req,res)
{
  res.end("my first http server");
}

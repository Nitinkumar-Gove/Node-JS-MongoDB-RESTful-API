// import express module
var express = require ("express");

// create a app variable
var app = express();

// listen on a port  - 1000
app.listen(1000, function(){
  console.log("server started ... ");
});

// handle get requests
app.get("/",function (req, res)
{
  res.end("hi, from nitin !");
});

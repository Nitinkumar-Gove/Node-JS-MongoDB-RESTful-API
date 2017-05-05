// import express module
var express = require("express");

// create express app object
var app = express();

// start listening on a port
app.listen(1234, function(){

console.log("server started ...");

});

// process get routes on home page
app.get("/",function(req, res)
{

  res.end(" GET request served successfully ... ");

});

app.get("/demo",function(req, res){

  res.end(" GET reqest on demo page served successfully");

});

// process post routes on home page
app.post("/", function(req,res){

    res.end(" POST request served successfully ... ")

});

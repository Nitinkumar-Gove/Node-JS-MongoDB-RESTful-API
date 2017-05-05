var express = require('express');
var app = express();

app.get('/', function(requst, response){
  response.send("Default GET Received");
  console.log('Default GET');
});

app.post('/', function(request, response){
  response.send("Default POST Received");
  console.log('Default POST');
});

app.get('/users/:userId', function(request, response){
  response.send("Get Single User");
  console.log('USER GET');
});

app.get('/users', function(request, response){
  response.send('Get All Users');
  console.log('USER GET ALL');
});


app.listen(8086, function(){
  console.log('127.0.0.1 : 8086 / live');
});

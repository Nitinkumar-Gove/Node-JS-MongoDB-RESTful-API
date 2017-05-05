var express = require('express');
var bodyParser = require('body-parser');

app = express();

var jsonParser = bodyParser.json();

app.post('/jobs', jsonParser, function(req,res){
    console.log(req.body);
    res.send(req.body);
});

app.get('/',function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/products', function(req, res){
  res.send('products.html');
});

app.get('/services', function(req, res){
  console.log(req.query);
  res.send('services.html');
});

app.get('/jobs/:jobId', function(req, res){
   console.log('Job requested : ' + req.params.jobId);
   res.send('Job ' + req.params.jobId);
});
app.listen(4400);

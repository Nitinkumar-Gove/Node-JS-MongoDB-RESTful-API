var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var crimeController = require('./controllers/crimeController.js');
var serviceController = require('./controllers/serviceController.js');
var weatherController = require('./controllers/weatherController.js');
var eventController = require('./controllers/eventController.js');

// connect to the db
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:abc123@ds139781.mlab.com:39781/crimedb');
app.use(bodyParser.urlencoded({ extended : true }));
console.log('[crime api] crime db : connected');

// connect to the controllers
crimeController(app);
serviceController(app);
weatherController(app);
eventController(app);

app.listen(1000);

console.log('[crime api] server up');

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var communityController = require('./controllers/communityController.js');
var userController = require('./controllers/userController.js')
var announcementController = require('./controllers/announcementController.js');
var messageController = require('./controllers/messageController.js');
// connect to the db
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:abc123@ds139781.mlab.com:39781/crimedb');
app.use(bodyParser.urlencoded({ extended : true }));
console.log('[community api] community db : connected');

// connect to the controllers
communityController(app);
userController(app);
announcementController(app);
messageController(app);

app.listen(2001);

console.log('[community api] server up');

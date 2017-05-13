var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('client-sessions');

// include all the controllers
var user_controller = require('./controllers/UserController.js');
var job_controller = require('./controllers/JobController.js');
var event_controller = require('./controllers/EventController.js');
var accomodation_controller = require('./controllers/AccomodationController.js');
var analytics_controller = require('./controllers/AnalyticsController.js');

// connect to the db
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://root:root@ds131041.mlab.com:31041/spartascoop');
app.use(bodyParser.urlencoded({ extended : true }));

// connect to the controllers
user_controller(app);
job_controller(app);
event_controller(app);
accomodation_controller(app);
analytics_controller(app);

app.listen(3000);

console.log('[api] Server up');

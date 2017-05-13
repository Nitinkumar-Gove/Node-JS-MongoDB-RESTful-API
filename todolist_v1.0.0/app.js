var express  = require('express');
var app = express();
var todo_controller = require('./controllers/todo_controller');

todo_controller(app);

app.listen('2000');

console.log('listening on 2000');

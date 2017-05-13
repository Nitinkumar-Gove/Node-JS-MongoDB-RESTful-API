var mongoose = require('mongoose');

var toDoSchema = mongoose.Schema({
  task : String,
  completed : Boolean
});
// var ToDo = mongoose.model('ToDo',toDoSchema);
module.exports = toDoSchema;

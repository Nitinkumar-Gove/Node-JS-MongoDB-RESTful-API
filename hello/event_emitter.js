var events = require('events');
var util = require('util');

var myEmitter = new events.EventEmitter();

myEmitter.on('tada',function(msg){
  console.log(msg);
});

myEmitter.emit('tada','ola !');

// util module use - inherit EventEmitter to custom object

var Person = function(name){
  this.name = name;
};

util.inherits(Person, events.EventEmitter);

var gove = new Person("Nitin");

gove.on('help',function(){
    console.log(this.name + ' : what can I do for you ?');
});

gove.emit('help');

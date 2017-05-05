// global object
// console.log(__dirname);
// console.log(__filename);

var utility = require('./utility');

// setInterval function
time = 0;
var timer = setInterval(function(){
  time += 1;
  console.log('tick tick ' + time);
  if(time > 5)
  {
    clearInterval(timer);
  }
}, 1000);

// function expressions
function execute(func){
  func();
}

var sample = function(){
  console.log('function expression sample');
}
execute(sample);


console.log(utility.counter(['a','b','c']));
console.log(utility.add(10,20));
console.log(utility.sub(39,23));

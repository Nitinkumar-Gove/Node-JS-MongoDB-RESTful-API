function counter(farray){
  return farray.length;
}

function add(x, y){
  return x+y;
}

function sub(x, y){
  return x-y;
}

// method 1

// module.exports.counter = counter;
// module.exports.add = add;
// module.exports.sub = sub;

// or method 2

module.exports = {
  counter:counter,
  add:add,
  sub:sub
};

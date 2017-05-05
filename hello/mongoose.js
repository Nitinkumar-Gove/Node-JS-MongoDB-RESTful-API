var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds131041.mlab.com:31041/spartascoop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('live')// we're connected!
});

var userSchema = mongoose.Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email:String
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

module.exports.User = User;

// create a new user

var newUser = User({
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  email:'nitinkumar.gove@sjsu.edu'
});

// save the user

/*

newUser.save(function(err) {
  if (err) throw err;
  console.log('User created!');
});

*/

User.find(function(error, users){
   if(error){
     console.log(error.message);
   }
   console.log(users[0]['name']);
});

var fs = require('fs');

// synchronous read
var contents = fs.readFileSync('readMe.txt','utf8');
console.log(contents);

// synchronous write
fs.writeFileSync('writeMe.txt', contents + '\nminor update - 05/03/2017 : 11:19 AM');

// asynchronous read
fs.readFile('writeMe.txt', 'utf8', function(error, data){
    console.log('async read - writeMe.txt');
    console.log(data);
    // asynchronous write
    fs.writeFile('writeMe.txt',data + '\nminor update - 05/03/2017 : 11:27 AM');
});

// delete file

// fs.unlink('temp.txt') // unsafe delete

// safe file delete
fs.stat('temp.txt', function(error, data){
  if(error){
    console.log(error.message);
  }
  else{
    fs.unlink('temp.txt');
  }
});

// working with directory

fs.mkdir('temp', function(){
   fs.readFile('readMe.txt', function(error, data){
      if(error){
        console.log(error.message);
        return;
      }
      fs.writeFile('./temp/temp.txt', data);
   });
});

// import filesystem module
var fileReader = require("fs");

// call reader function
fileReader.readFile("/api_config.properties","utf-8",printData);

function printData(err, data)
{
  if(err)
  {
    return console.log(err);
  }
  console.log(data);
}

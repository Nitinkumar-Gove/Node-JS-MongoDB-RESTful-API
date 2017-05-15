module.exports = function(app){
  console.log('[weather api] controller up');

  // Require the module
var Forecast = require('forecast');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Initialize
var forecast = new Forecast({
  service: 'darksky',
  key: '70a7152b00ed3af969c028d1ce2e4ddf',
  units: 'celcius',
  cache: true,      // Cache API requests
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
  }
});

app.post('/v1/weather', jsonParser, function(req, res){
   var location = req.body;
  // Retrieve weather information from coordinates (Sydney, Australia)
  forecast.get([location.lat, location.long], function(err, weather) {
    if(err) return console.dir(err);
    // console.dir(weather);
    res.status(200).send(weather);
  });

});


app.get('/v1/weather', jsonParser, function(req, res){

  // Retrieve weather information from coordinates (Sydney, Australia)
  forecast.get([37.3382, 121.8863], function(err, weather) {
    if(err) return console.dir(err);
    // console.dir(weather);
    res.status(200).send(weather.currently);
  });
});


};

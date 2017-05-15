module.exports = function(app){
  console.log('[crime api] controller up');

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  var mongoose = require('mongoose');
  var crimeSchema = require('../models/crime.js');
  var Crime = mongoose.model('Crime', crimeSchema);

  // Crime API v1.0.0

  // get all crimes available
  app.get('/v1/crimes', function(req, res){
    Crime.find({}, function(error, crimes){
      if(error) res.status(500).send('{ "message" : "Unable to fetch crimes"}');
      res.status(200).json(crimes.reverse());
    });
  });

   // get a particular crime
   app.get('/v1/crimes/:crimeid', function(req, res){

     Crime.find( { _id:req.params.crimeid }, function(error, crime){
       if(error) res.status(500).send('{ "message" : "Unable to fetch crime"}');
       else if(crime.length == 0){
         res.status(404).send('{ "message" : "Crime not found"}');
       }
       else
       res.status(200).json(crime[0]);
     });
   });

  // save a new crime
  app.post('/v1/crimes', jsonParser, function(req, res){
    var crime = Crime(req.body);
    // console.log(crime);
    crime.save(function(er){
      if(er){
        console.log(er);
        res.status(500).send('{ "message" : "Unable to save Crime"}');
    }
      else res.status(200).json(Crime(req.body));
    });
  });

  // delete a crime
  app.delete('/v1/crimes/:crimeid', function(req, res){
    Crime.find({_id:req.params.crimeid}, function(err, crime){
      // console.log(job);
      if(err) {
        res.status(500).send('{ "message" : "Unable to delete crime"}');
      }
      else if(crime.length == 0){
        res.status(404).send('{ "message" : "Crime not found"}');
      }
      else{
        try{
          Crime.findOneAndRemove({_id:req.params.crimeid}, function(error){
            if(error) return res.status(500).send('{ "status" : "Unable to delete job" }');
            else{
                res.status(200).send('{ "status" : "Crime deleted" }');
            }
          });
        }
        catch(e){
            res.status(404).send('{ "message" : "Crime not found"}');
        }
      }
    });
  });

    // update a crime
    app.put('/v1/crimes/:crimeid', jsonParser, function(req, res){
      // first find the user and then update him/her
      Crime.find({_id:req.params.crimeid},function(error, crime){
        if(error){res.status(404).send('{ "message" : "Crime not found"}');}
        else if(crime.length ==0){
          res.status(404).send('{ "message" : "Crime not found"}');
        }
        else{
             console.log("[api] Crime found");
             var ncrime = req.body;
             Crime.findOneAndUpdate({_id:req.params.crimeid},ncrime,function(e,u){
               if(e) return res.status(500).send('{ "status" : "Failed to update crime" }');
               else{
                 console.log("[api] crime updated");
                 res.status(200).send(ncrime);
               }
             });
           }
      });
    });
};

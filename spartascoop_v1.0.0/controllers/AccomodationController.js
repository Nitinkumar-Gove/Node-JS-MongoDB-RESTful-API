
module.exports = function(app){

  console.log('[api] Accomodation controller up');

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  var mongoose = require('mongoose');
  var accomodationSchema = require('../models/Accomodation.js');
  var Accomodation = mongoose.model('Accomodation', accomodationSchema);

  // ACCOMODATION API v1.0.0

  // **** accomodation controller starts here *****

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  var mongoose = require('mongoose');

  var userSchema = require('../models/User.js');
  var eventSchema = require('../models/Event.js');
  var accomodationSchema = require('../models/Accomodation.js');
  var jobSchema = require('../models/Job.js');

  var Accomodation = mongoose.model('Accomodation', accomodationSchema);
  var Event = mongoose.model('Event', eventSchema);
  var User = mongoose.model('User', userSchema);
  var Job = mongoose.model('Job', jobSchema);

  // ACCOMODATION API v1.0.0

  // get all accomodations
  app.get('/v1/accomodations', function(req, res){
    Accomodation.find({}, function(err, accomodations){
      if(err) res.status(500).send('{ "message" : "Unable to fetch accomodations"}');
      res.status(200).json(accomodations);
    });
  });

  // get particular accomodation
  app.get('/v1/accomodations/:acmdid', function(req, res){
    Accomodation.find( { _id:req.params.acmdid }, function(error, accomodation){
      if(accomodation.length == 0){
        res.status(404).send('{ "message" : "Accomodation not found"}');
      }
      if(error) res.status(500).send('{ "message" : "Unable to fetch accomodations"}');
      res.status(200).json(accomodation[0]);
    });
  });

  // post new accomodation
  app.post('/v1/accomodations', jsonParser, function(req,res){
    var acc = Accomodation(req.body);
    acc.save(function(err){
      if(err)res.status(500).send('{ "message" : "Unable to save accomodation"}');
      else res.status(200).json(acc);
    });
  });

  // put accomodation
  app.put('/v1/accomodations/:acmdid', jsonParser, function(req, res){
    // first find the accomodation and then update him/her
    Accomodation.find({_id:req.params.acmdid},function(error, accomodation){
      if(error){res.status(404).send('{ "message" : "Accomodation not found"}');}
      if(accomodation.length ==0)
      {res.status(404).send('{ "message" : "Accomodation not found"}');}
      else{
           console.log("[api] accomodation found");
           var new_accomodation = req.body;
           Accomodation.findOneAndUpdate({_id:req.params.acmdid},new_accomodation,function(e,u){
             if(e) return res.status(500).send('{ "status" : "Failed to update accomodation" }');
             else{
               console.log("[api] accomodation updated");
               res.status(200).send(u);
             }
           });
         }
    });
  });


  // delete accomodation
  app.delete('/v1/accomodations/:acmdid', function(req, res){
    Accomodation.find({_id:req.params.acmdid}, function(err, accomodation){
      // console.log(accomodation);
      if(err) {
        res.status(500).send('{ "message" : "Unable to delete accomodation"}');
      }
      else if(accomodation.length == 0){
        res.status(404).send('{ "message" : "Accomodation not found"}');
      }
      else{
        try{
          Accomodation.findOneAndRemove({_id:req.params.acmdid}, function(error){
            if(error) return res.status(500).send('{ "status" : "Unable to delete accomodation" }');
            else{
                res.status(200).send('{ "status" : "Accomodation deleted" }');
            }
          });
        }
        catch(e){
            res.status(404).send('{ "message" : "Accomodation not found"}');
        }
      }
    });
  });

  // **** accomodation controller ends here *****
};

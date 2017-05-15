module.exports = function(app){
  console.log('[crime api] controller up');

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  var mongoose = require('mongoose');
  var serviceSchema = require('../models/service.js');
  var Service = mongoose.model('Service', serviceSchema);

  // Service API v1.0.0

  // get all services available
  app.get('/v1/services', function(req, res){
    Service.find({}, function(error, services){
      if(error) res.status(500).send('{ "message" : "Unable to fetch services"}');
      res.status(200).json(services.reverse());
    });
  });

   // get a particular service
   app.get('/v1/services/:serviceid', function(req, res){

     Service.find( { _id:req.params.serviceid }, function(error, service){
       if(error) res.status(500).send('{ "message" : "Unable to fetch service"}');
       else if(service.length == 0){
         res.status(404).send('{ "message" : "Service not found"}');
       }
       else
       res.status(200).json(service[0]);
     });
   });

  // save a new service
  app.post('/v1/services', jsonParser, function(req, res){
    var service = Service(req.body);
    // console.log(crime);
    service.save(function(er){
      if(er){
        console.log(er);
        res.status(500).send('{ "message" : "Unable to save service"}');
    }
      else res.status(200).json(Service(req.body));
    });
  });

  // delete a service
  app.delete('/v1/services/:serviceid', function(req, res){
    Service.find({_id:req.params.serviceid}, function(err, service){
      // console.log(job);
      if(err) {
        res.status(500).send('{ "message" : "Unable to delete service"}');
      }
      else if(service.length == 0){
        res.status(404).send('{ "message" : "Service not found"}');
      }
      else{
        try{
          Service.findOneAndRemove({_id:req.params.serviceid}, function(error){
            if(error) return res.status(500).send('{ "status" : "Unable to delete service" }');
            else{
                res.status(200).send('{ "status" : "Service deleted" }');
            }
          });
        }
        catch(e){
            res.status(404).send('{ "message" : "Service not found"}');
        }
      }
    });
  });

    // update a service
    app.put('/v1/services/:serviceid', jsonParser, function(req, res){
      // first find the user and then update him/her
      Service.find({_id:req.params.serviceid},function(error, service){
        if(error){res.status(404).send('{ "message" : "service not found"}');}
        else if(service.length ==0){
          res.status(404).send('{ "message" : "service not found"}');
        }
        else{
             console.log("[api] service found");
             var nservice = req.body;
             Service.findOneAndUpdate({_id:req.params.serviceid},nservice,function(e,u){
               if(e) return res.status(500).send('{ "status" : "Failed to update service" }');
               else{
                 console.log("[api] service updated");
                 res.status(200).send(nservice);
               }
             });
           }
      });
    });
};

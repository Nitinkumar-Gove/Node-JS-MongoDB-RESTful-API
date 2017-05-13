module.exports = function(app){
      console.log('[api] Event controller up');

      var bodyParser = require('body-parser');
      var jsonParser = bodyParser.json();

      var mongoose = require('mongoose');
      var eventSchema = require('../models/Event.js');

      var userSchema = require('../models/User.js');
      var eventSchema = require('../models/Event.js');
      var accomodationSchema = require('../models/Accomodation.js');
      var jobSchema = require('../models/Job.js');

      var Accomodation = mongoose.model('Accomodation', accomodationSchema);
      var Event = mongoose.model('Event', eventSchema);
      var User = mongoose.model('User', userSchema);
      var Job = mongoose.model('Job', jobSchema);

      // EVENT API v1.0.0

      // get all events
      app.get('/v1/events', function(req, res){
        Event.find({}, function(err, events){
          if(err) res.status(500).send('{ "message" : "Unable to fetch events"}');
          res.status(200).json(events);
        });
      });

      // get a particular event
      app.get('/v1/events/:eventId', function(req, res){
        Event.find( { _id:req.params.eventId }, function(error, event){
          if(event.length == 0){
            res.status(404).send('{ "message" : "Event not found"}');
          }
          if(error) res.status(500).send('{ "message" : "Unable to fetch events"}');
          res.status(200).json(event[0]);
        });
      });

      // create new event
      app.post('/v1/events', jsonParser, function(req, res){
        var e = Event(req.body);
        e.save(function(err){
          if(err) res.status(500).send('{ "message" : "Unable to save event"}');
          else res.status(200).json(req.body);
        });
      });

      // update event
      app.put('/v1/events/:eventid', jsonParser, function(req, res){
        // first find the user and then update him/her
        Event.find({_id:req.params.eventid},function(error, event){
          if(error){res.status(404).send('{ "message" : "Event not found"}');}
          else if(event.length ==0){
            res.status(404).send('{ "message" : "Event not found"}');
          }
          else{
               console.log("[api] event found");
               var nevent = req.body;
               Event.findOneAndUpdate({_id:req.params.eventid},nevent,function(e,u){
                 if(e) return res.status(500).send('{ "status" : "Failed to update event" }');
                 else{
                   console.log("[api] event updated");
                   res.status(200).send(nevent);
                 }
               });
             }
        });
      });


      // delete event
      app.delete('/v1/events/:eventid', function(req, res){
        Event.find({_id:req.params.eventid}, function(err, event){
          // console.log(event);
          if(err) {
            res.status(500).send('{ "message" : "Unable to delete event"}');
          }
          else if(event.length == 0){
            res.status(404).send('{ "message" : "Event not found"}');
          }
          else{
            try{
              Event.findOneAndRemove({_id:req.params.eventid}, function(error){
                if(error) return res.status(500).send('{ "status" : "Unable to delete event" }');
                else{
                    res.status(200).send('{ "status" : "Event deleted" }');
                }
              });
            }
            catch(e){
                res.status(404).send('{ "message" : "Event not found"}');
            }
          }
        });
      });

      // **** event controller ends here ***********
};

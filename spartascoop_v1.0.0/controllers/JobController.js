
module.exports = function(app){
  console.log('[api] Job controller up');

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  var mongoose = require('mongoose');
  var jobSchema = require('../models/Job.js');


  var userSchema = require('../models/User.js');
  var eventSchema = require('../models/Event.js');
  var accomodationSchema = require('../models/Accomodation.js');
  var jobSchema = require('../models/Job.js');

  var Accomodation = mongoose.model('Accomodation', accomodationSchema);
  var Event = mongoose.model('Event', eventSchema);
  var User = mongoose.model('User', userSchema);
  var Job = mongoose.model('Job', jobSchema);

  // ******** job controller starts here *****

    var bodyParser = require('body-parser');
    var jsonParser = bodyParser.json();
    var mongoose = require('mongoose');
    var Job = mongoose.model('Job', jobSchema);

    // JOB API v1.0.0

    // get all jobs available
    app.get('/v1/jobs', function(req, res){
      Job.find({}, function(error, jobs){
        if(error) res.status(500).send('{ "message" : "Unable to fetch jobs"}');
        res.status(200).json(jobs.reverse());
      });
    });

     // get a particular job
     app.get('/v1/jobs/:jobid', function(req, res){

       Job.find( { _id:req.params.jobid }, function(error, job){
         if(error) res.status(500).send('{ "message" : "Unable to fetch jobs"}');
         else if(job.length == 0){
           res.status(404).send('{ "message" : "Job not found"}');
         }
         else
         res.status(200).json(job[0]);
       });
     });

    // save a new job
    app.post('/v1/jobs', jsonParser, function(req, res){
      var job = Job(req.body);
      job.save(function(er){
        if(er) res.status(500).send('{ "message" : "Unable to save job"}');
        else res.status(200).json(Job(req.body));
      });
    });

    // delete a job
    app.delete('/v1/jobs/:jobid', function(req, res){
      Job.find({_id:req.params.jobid}, function(err, job){
        // console.log(job);
        if(err) {
          res.status(500).send('{ "message" : "Unable to delete job"}');
        }
        else if(job.length == 0){
          res.status(404).send('{ "message" : "Job not found"}');
        }
        else{
          try{
            Job.findOneAndRemove({_id:req.params.jobid}, function(error){
              if(error) return res.status(500).send('{ "status" : "Unable to delete job" }');
              else{
                  res.status(200).send('{ "status" : "Job deleted" }');
              }
            });
          }
          catch(e){
              res.status(404).send('{ "message" : "Job not found"}');
          }
        }
      });
    });

    // update a job
    app.put('/v1/jobs/:jobid', jsonParser, function(req, res){
      // first find the user and then update him/her
      Job.find({_id:req.params.jobid},function(error, job){
        if(error){res.status(404).send('{ "message" : "Job not found"}');}
        else if(job.length ==0){
          res.status(404).send('{ "message" : "Job not found"}');
        }
        else{
             console.log("[api] job found");
             var njob = req.body;
             Job.findOneAndUpdate({_id:req.params.jobid},njob,function(e,u){
               if(e) return res.status(500).send('{ "status" : "Failed to update job" }');
               else{
                 console.log("[api] user updated");
                 res.status(200).send(njob);
               }
             });
           }
      });
    });

  // ****** job controller ends here *****
};

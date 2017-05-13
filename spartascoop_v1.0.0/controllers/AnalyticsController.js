module.exports = function(app){
  console.log('[api] Analytics controller up');

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  var mongoose = require('mongoose');

  var userSchema = require('../models/User.js');
  var eventSchema = require('../models/Event.js');
  var accomodationSchema = require('../models/Accomodation.js');
  var jobSchema = require('../models/Job.js');

  var Event = mongoose.model('Event', eventSchema);
  var User = mongoose.model('User', userSchema);
  var Accomodation = mongoose.model('Accomodation', accomodationSchema);
  var Job = mongoose.model('Job', jobSchema);

  // ********* ANALYTICS API starts here *********

  // ANALYTICS API v1.0.0

  // get no of posts for each category
  app.get('/v1/analytics/postcounts', function(req, res){
       var counts = {};
       Event.find({}, function(e1, es){
            counts.events = es.length;
            Job.find({}, function(e2, jb){
              counts.jobs = jb.length;
              Accomodation.find({}, function(e3,as){
                counts.accomodations = as.length;
                res.status(200).send(counts);
              });
            });
       });
  });

  // get no of users from each branch
  app.get('/v1/analytics/majorcounts', function(req, res){
    var majorcounts = {};
    User.find({"user_major": "IE"}, function(e1, es){
         majorcounts.IE = es.length;
         User.find({"user_major": "CS"}, function(e2, cs){
              majorcounts.CS = cs.length;
              User.find({"user_major": "SE"}, function(e2, se){
                   majorcounts.SE = se.length;
                   User.find({"user_major": "EE"}, function(e2, ee){
                        majorcounts.EE = ee.length;
                        User.find({"user_major": "CE"}, function(e2, ce){
                             majorcounts.CE = ce.length;
                             res.status(200).send(majorcounts);
                           });
                      });
                 });
            });
       });
  });

  // get no of accomodations according to price range
  app.get('/v1/analytics/accomodationprices', function(req, res){
     var pricerangecounts = {};
     Accomodation.find({rent : {$lte:400}}, function(e,a){
       // console.log("a < 400 :" + a.length);
       pricerangecounts.low = a.length;
       Accomodation.find({rent : {$gt:400, $lte:600}}, function(e,a2){
         pricerangecounts.mid = a2.length;
         Accomodation.find({rent : {$gt:600}}, function(e,a3){
           pricerangecounts.high = a3.length;
           res.status(200).send(pricerangecounts);
         });
       });

     });
  });


  // get no of jobs according to pay
  app.get('/v1/analytics/jobrates', function(req, res){
     var jobratecounts = {};
     Job.find({payrate : {$lte:12}}, function(e,a){
       jobratecounts.low = a.length;
       Job.find({payrate : {$gt:12, $lte:18}}, function(e,a2){
         jobratecounts.mid = a2.length;
         Job.find({payrate : {$gt:18}}, function(e,a3){
           jobratecounts.high = a3.length;
           res.status(200).send(jobratecounts);
         });
       });
     });
  });

  // get no of events according to fees
  app.get('/v1/analytics/eventscount', function(req, res){
     var eventscounts = {};
     Event.find({entryfees : {$lte:15}}, function(e,a){
       eventscounts.low = a.length;
       Event.find({entryfees : {$gt:15, $lte:30}}, function(e,a2){
         eventscounts.mid = a2.length;
         Event.find({entryfees : {$gt:30}}, function(e,a3){
           eventscounts.high = a3.length;
           res.status(200).send(eventscounts);
         });
       });
     });
  });

  // ********** ANALYTICS API ends here *************

};

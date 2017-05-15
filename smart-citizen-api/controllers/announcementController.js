module.exports = function(app){
  console.log('[announcement api] controller up');

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  var mongoose = require('mongoose');
  var announcementSchema = require('../models/announcement.js');
  var Announcement = mongoose.model('Announcement', announcementSchema);

  // get all Community available
  app.get('/v1/announcements', function(req, res){
    Announcement.find({}, function(error, announcements){
      if(error) res.status(500).send('{ "message" : "Unable to fetch Announcement"}');
      res.status(200).json(announcements.reverse());
    });
  });

   // get a particular Community
   app.get('/v1/announcements/:announcementid', function(req, res){
     Announcement.find( { _id:req.params.announcementid }, function(error, announcement){
       if(error) res.status(500).send('{ "message" : "Unable to fetch announcement"}');
       else if(announcement.length == 0){
         res.status(404).send('{ "message" : "announcementid not found"}');
       }
       else
       res.status(200).json(announcement[0]);
     });
   });

  // save a new Community
  app.post('/v1/announcements', jsonParser, function(req, res){
    var announcement = Announcement(req.body);
    // console.log(crime);
    announcement.save(function(er){
      if(er){
        console.log(er);
        res.status(500).send('{ "message" : "Unable to save announcement"}');
    }
      else res.status(200).json(Announcement(req.body));
    });
  });


};

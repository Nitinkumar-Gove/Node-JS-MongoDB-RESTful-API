module.exports = function(app){
  console.log('[community api] controller up');

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  var mongoose = require('mongoose');
  var communitySchema = require('../models/community.js');
  var Community = mongoose.model('Community', communitySchema);

  var userSchema = require('../models/user.js');
  var User = mongoose.model('User', userSchema);

  // Community API v1.0.0

  // get all Community available
  app.get('/v1/communities', function(req, res){
    Community.find({}, function(error, community){
      if(error) res.status(500).send('{ "message" : "Unable to fetch community"}');
      res.status(200).json(community.reverse());
    });
  });

   // get a particular Community
   app.get('/v1/communities/:communityid', function(req, res){

     Community.find( { _id:req.params.communityid }, function(error, community){
       if(error) res.status(500).send('{ "message" : "Unable to fetch community"}');
       else if(community.length == 0){
         res.status(404).send('{ "message" : "Community not found"}');
       }
       else
       res.status(200).json(community[0]);
     });
   });

  // save a new Community
  app.post('/v1/communities', jsonParser, function(req, res){
    var community = Community(req.body);
    // console.log(crime);
    community.save(function(er){
      if(er){
        console.log(er);
        res.status(500).send('{ "message" : "Unable to save community"}');
    }
      else res.status(200).json(Community(req.body));
    });
  });

  // delete a Community
  app.delete('/v1/communities/:communityid', function(req, res){
    Community.find({_id:req.params.communityid}, function(err, community){
      // console.log(job);
      if(err) {
        res.status(500).send('{ "message" : "Unable to delete Community"}');
      }
      else if(community.length == 0){
        res.status(404).send('{ "message" : "Community not found"}');
      }
      else{
        try{
          Community.findOneAndRemove({_id:req.params.communityid}, function(error){
            if(error) return res.status(500).send('{ "status" : "Unable to delete community" }');
            else{
                res.status(200).send('{ "status" : "community deleted" }');
            }
          });
        }
        catch(e){
            res.status(404).send('{ "message" : "Community not found"}');
        }
      }
    });
  });

    // update a Community
    app.put('/v1/communities/:communityid', jsonParser, function(req, res){
      // first find the user and then update him/her
      Community.find({_id:req.params.communityid},function(error, community){
        if(error){res.status(404).send('{ "message" : "community not found"}');}
        else if(community.length ==0){
          res.status(404).send('{ "message" : "community not found"}');
        }
        else{
             console.log("[api] Crime found");
             var ncommunity = req.body;
             Community.findOneAndUpdate({_id:req.params.communityid},ncommunity,function(e,u){
               if(e) return res.status(500).send('{ "status" : "Failed to update community" }');
               else{
                 console.log("[api] community updated");
                 res.status(200).send(ncommunity);
               }
             });
           }
      });
    });

    // get user count for community
    app.get('/v1/communities/:communityid/users',jsonParser, function(req, res){
        User.find({"community._id":req.params.communityid},function(err, u){
          if(err) throw err;
          res.status(200).send(u.length);
        });
    });


};

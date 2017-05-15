module.exports = function(app){
  console.log('[message api] controller up');

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  var mongoose = require('mongoose');
  var messageSchema = require('../models/message.js');
  var Message = mongoose.model('Message', messageSchema);

  // get all Community available
  app.get('/v1/messages', function(req, res){
    Message.find({}, function(error, messages){
      if(error) res.status(500).send('{ "message" : "Unable to fetch message"}');
      res.status(200).json(messages.reverse());
    });
  });

   // get a particular Community
   app.get('/v1/messages/:messagesid', function(req, res){
     Message.find( { _id:req.params.messagesid }, function(error, messages){
       if(error) res.status(500).send('{ "message" : "Unable to fetch messages"}');
       else if(messages.length == 0){
         res.status(404).send('{ "message" : "messages not found"}');
       }
       else
       res.status(200).json(messages[0]);
     });
   });

  // save a new Community
  app.post('/v1/messages', jsonParser, function(req, res){
    var message = Message(req.body);
    // console.log(crime);
    message.save(function(er){
      if(er){
        console.log(er);
        res.status(500).send('{ "message" : "Unable to save message"}');
    }
      else res.status(200).json(Message(req.body));
    });
  });

  app.get('/v1/mymessages/:to',jsonParser, function(req, res){
    Message.find({to:req.params.to }, function(error, messages){
      if(error) res.status(500).send('{ "message" : "Unable to fetch messages"}');
      else if(messages.length == 0){
        res.status(404).send('{ "message" : "messages not found"}');
      }
      else
      res.status(200).json(messages.length > 10 ? messages.reverse().slice(0,9) : messages.reverse()) ;
    });
  });

}

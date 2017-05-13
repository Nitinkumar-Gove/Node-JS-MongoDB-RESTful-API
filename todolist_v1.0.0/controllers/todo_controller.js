
module.exports = function(app){

  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();
  var mongoose = require('mongoose');
  var toDoSchema = require('../models/ToDo.js');
  var ToDo = mongoose.model('ToDo',toDoSchema);

  mongoose.Promise = require('bluebird');
  mongoose.connect('mongodb://admin:abc123ABC@ds147510.mlab.com:47510/todolist')

  // get all todo tasks
  app.get('/todo', function(req, res){
      ToDo.find({},function(error,tasks){
        if(error) throw error;
        console.log(tasks);
        res.status(200).json(tasks);
      });
  });

  // save a new task
  app.post('/todo', jsonParser, function(req, res){
     console.log(req.body);
     var task = ToDo(req.body).save(function(error){
       if(error) throw error;
       console.log('task created');
       res.status(200).json(ToDo(req.body));
     });
  });

  // fetch a particular task
  app.get('/todo/:todoId', function(req,res){
    ToDo.find({task:req.params.todoId}, function(error, user){
      if(error) throw error;
      res.status(200).json(user);
    });
  });

  // delete a particular task
  app.delete('/todo/:todoId', function(req, res){
    ToDo.find({task:req.params.todoId}, function(error, task){
      if(error){
       res.status(500).send('{ "status" : "Task not found" }');
     }
     else{
       try{
         // delete the task
         ToDo.findOneAndRemove({ task: task[0].task }, function(err) {
           if (err) return res.status(500).send('{ "status" : "Failed to clear the task" }');

           console.log('task deleted!');
           res.status(200).send('{ "status" : "task deleted" }');
         });
       }
       catch(err){
         res.status(500).send('{ "status" : "Task not found" }');
       }
     }
    });
  });

  app.put('/todo/:todoId', jsonParser, function(req, res){
      ToDo.find({task:req.params.todoId}, function(error, task){
          if(error){
           res.status(500).send('{ "status" : "Task not found" }');
         }{
           try{
              ToDo.findOneAndUpdate({task:req.params.todoId}, {task:req.body.task, completed:req.body.completed}, function(error, task){
                 if(error){
                   return res.status(500).send('{ "status" : "Failed to update task" }');
                 }
                 res.status(200).send('{ "status" : "task updated" }');
              });

           }
           catch(error){
             res.status(500).send('{ "status" : "Task not updated" }');
           }
         }
      });
  });

};

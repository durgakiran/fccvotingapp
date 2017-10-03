'use strict'

var Poll = require('../model/poll.js');
var bodyParser = require('body-parser');
var db = require('../model/db.js');


module.exports = {
  addpoll: function(req,res){
    
    console.log(req.query);
    
    var newPoll = new Poll();
    
    newPoll.Polls.userid = req.user.github.id;
    newPoll.Polls.displayname = req.user.github.username;
    newPoll.Polls.question = req.query.question;
    newPoll.Polls.polloptions = req.query.option;
    newPoll.Polls.votecounts = [];
    for(var i = 0;i<req.query.option.length;i++){
      newPoll.Polls.votecounts.push(0);
    }
    
    newPoll.Polls.uri = 'https://'+process.env.PROJECT_DOMAIN+'.glitch.me' + '/vote/' + req.user.github.id +'/' + newPoll._id;
    console.log(newPoll.Polls.uri);
    
    db.insetNewPoll(newPoll);
    
    res.redirect('/vote/' + req.user.github.id+'/' + newPoll._id);
  }
}
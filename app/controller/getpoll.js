'use strict'

var Poll = require('../model/poll.js');
var bodyParser = require('body-parser');
var db = require('../model/db.js');


module.exports = {
  getPoll: function(req,res){
    
    let path = req.path;
    var lastpath = path.split("\/");
    console.log(lastpath);
    lastpath = lastpath[2];
    console.log(lastpath);
    db.connection();
    db.getPoll(Poll,lastpath,function(doc){
      res.writeHead(200,{'Content-Type': 'application/json'});
      console.log(doc);
      res.end(JSON.stringify(doc));
    });
    
    
  },
  postPoll: function(req,res){
    let path = req.path;
    var lastpath = path.split("\/");
    var option = req.body.option;
    console.log(lastpath);
    lastpath = lastpath[2];
    console.log(lastpath);
    db.connection();
    db.postPoll(Poll,lastpath,option,function(doc){
      res.writeHead(200,{'Content-Type': 'application/json'});
      console.log(doc);
      res.end(JSON.stringify(doc));
    });
    
  },
  getMyPoll: function(req,res){
  
  let userid = req.user.github.id;
    
    db.getMyPoll(Poll,userid,function(docs){
      res.writeHead(200,{'Content-Type': 'application/json'});
      res.end(JSON.stringify(docs));
    })
}
}
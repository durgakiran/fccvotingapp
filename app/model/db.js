'use strict'

const mongoose = require('mongoose');




module.exports={
  /*
  * new version of mongoose has a bug it throws error with mongoose.connect(process.env.MONGO_URI)
  */
  connection: function(){mongoose.connect(process.env.MONGO_URI, {useMongoClient: true/* other options */});},
  
  insetNewPoll : function(newPoll){
            newPoll.save(function (err) {
						if (err) {
							throw err;
						}
					});},
  
  getPoll: function(Poll,id,cb){
            
            Poll.find({_id: id},function(err, doc) {
              //doc = the specific doc
              if (err)
              throw err;
              cb(doc);
            })
    
  },
  
  postPoll: function(Poll,id,options,cb){
    Poll.find({_id: id},function(err, doc) {
              //doc = the specific doc
              if (err)
              throw err;
       console.log(options);       
      ++doc[0]['Polls']['votecounts'][options];
      var option = doc[0]['Polls']['votecounts'];
      console.log(option);
      Poll.findByIdAndUpdate(id,{$set: {'Polls.votecounts': option}}, { new: true },function(err,data){
                cb(data);
              });
            });
    
    
  },
  
  getMyPoll: function(Poll,userId,cb){
  Poll.find({'Polls.userid': userId},function(err,docs){
    if(err) throw err;
    cb(docs);
  })
}
}
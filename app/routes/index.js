'use strict'
var path = require('path');
var createpoll = require('../controller/createPoll');
var getpoll = require('../controller/getpoll');
 
var multer = require('multer');
var upload = multer();

module.exports = function(app,passport) {
  
  
  function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}
  
  app.route('/home').get(isLoggedIn, function(req,res){
      res.sendFile(path.join(__dirname, '../views', 'home.html'));
  });
  
  app.route('/logout').get(function (req, res) {
		req.logout();
		res.redirect('/');
	});
  app.route('/create/newpoll').get(isLoggedIn, function (req,res){
    createpoll.addpoll(req,res);
  });
  app.route('/get/mypolls').get(isLoggedIn, function (req,res){
    getpoll.getMyPoll(req,res);
  });
  
  
  
  
  app.route('/auth/github').get(passport.authenticate('github'));
  
  app.route('/auth/github/callback/').get(passport.authenticate('github', {
    
		successRedirect: '/home',
		failureRedirect: '/'
	}));
  
  app.route('/vote/:userid/:quetionid').get(function(req,res){
    res.sendFile(path.join(__dirname, '../views', 'votepoll.html'))
    
  });
  
  app.route('/:userid/:quetionid').get(function(req,res){
    console.log('i am requested');
    getpoll.getPoll(req,res);
    
    
  });
  app.route('/:userid/:quetionid').post(function(req,res){
    console.log('i am posted');
    getpoll.postPoll(req,res);
    
    
  });
}
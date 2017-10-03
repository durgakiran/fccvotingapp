'use strict';

const express = require('express');
const routes = require('./app/routes/index.js');
const passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');



var app = express();
require('./app/config/passport')(passport);
require('dotenv').load();

app.use('/controllers',express.static(process.cwd()+'app/controller'));
app.use(express.static(process.cwd()+'/public'));
app.use('/',express.static(process.cwd()+'/app/views'));

app.use(session({
	secret: 'its a secret',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routes(app,passport);


app.listen(3000,function(){
  console.log('I am listening');
})
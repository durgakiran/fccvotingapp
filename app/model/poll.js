'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Poll = new Schema({
  Polls : {
    userid: String,
    displayName: String,
    question: String,
    polloptions: [],
    votecounts: [],
    uri: String
  }
});

module.exports = mongoose.model('Poll',Poll);

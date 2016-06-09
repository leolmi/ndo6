'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MessageSchema = new Schema({
  map: String,
  user: String,
  text: String,
  timestamp: Number,
  action: String
});

module.exports = mongoose.model('Message', MessageSchema);

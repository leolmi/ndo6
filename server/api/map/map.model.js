'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MapSchema = new Schema({
  _id: String,
  owner: String,
  center: String,
  active: Boolean
});

module.exports = mongoose.model('Map', MapSchema);

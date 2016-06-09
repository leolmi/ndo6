'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PointSchema = new Schema({
  map: String,
  user: String,
  icon: String,
  name: String,
  notes: String,
  latitude: Number,
  longitude: Number,
  timestamp: Number
});

module.exports = mongoose.model('Point', PointSchema);



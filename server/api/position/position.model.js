'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PositionSchema = new Schema({
  owner: String,
  map: String,
  latitude: Number,
  longitude: Number,
  accuracy: Number,
  altitude: Number,
  altitudeAccuracy: Number,
  heading: Number,
  speed: Number,
  timestamp: Number
},{ versionKey: false });

module.exports = mongoose.model('Position', PositionSchema);

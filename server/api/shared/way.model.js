'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var WayItemSchema = new Schema({
  latitude: Number,
  longitude: Number
});

var WaySchema = new Schema({
  map: String,
  user: String,
  name: String,
  notes: String,
  points: [WayItemSchema]
},{ versionKey: false });

module.exports = mongoose.model('Way', WaySchema);

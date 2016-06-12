'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MapSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  center: String,
  active: {type:Boolean, default:true}
},{ versionKey: false });

module.exports = mongoose.model('Map', MapSchema);

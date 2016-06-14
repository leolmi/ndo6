'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  owner: String,
  target: String,
  map: String,
  message: String,
  userMessage: String,
  nameVolatile: String,
  accepted: {type: Boolean, default: false},
  refused: {type: Boolean, default: false},
  banned: {type: Boolean, default: false},
  expiration: Number
},{ versionKey: false });

module.exports = mongoose.model('Invitation', InvitationSchema);

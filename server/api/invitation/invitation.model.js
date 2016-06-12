'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  id: String,
  owner: String,
  target: String,
  map: String,
  accepted: {type: Boolean, default: false},
  refused: {type: Boolean, default: false},
  expiration: Number
},{ versionKey: false });

module.exports = mongoose.model('Invitation', InvitationSchema);

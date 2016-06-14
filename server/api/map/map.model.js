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

MapSchema.methods = {
  /**
   * Imposta l'invito
   * @param invitation
   */
  setInvite: function(invitation) {
    if (!invitation) return;
    this._doc.invite = {
      id: invitation._id,
      accepted: invitation.accepted
    }
  }
};


module.exports = mongoose.model('Map', MapSchema);

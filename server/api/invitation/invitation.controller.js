'use strict';
var u = require('../../components/utils/utils');
var Invitation = require('./invitation.model');


exports.index = function(req, res) {
  var filter = {target: req.user._id};
  u.index(Invitation, req, res, filter);
};

exports.create = function(req, res) {
  req.body.owner = req.user._id;
  var exp = new Date();
  exp.setDate(exp.getDate() + 10);
  req.body.expiration = req.body.expiration || exp.getTime();
  u.create(Invitation, req, res);
};

exports.accept = function(req, res) {
  Invitation.findById(req.params.id, function (err, invitation) {
    if(err) { return u.error(res, err); }
    if(!invitation) { return u.notfound(res); }
    if (invitation.accepted) { return u.error(res, new Error('Just accepted!')); }
    if (invitation.refused) { return u.error(res, new Error('Just refused!')); }
    var exp = new Date();
    if (invitation.expiration<exp.getTime()) { return u.error(res, new Error('Invitation expired!')); }
    invitation.accepted = true;
    invitation.save(function(err){
      if(err) { return u.error(res, err); }
      u.ok(res, 'You have accepted invitation!');
    });
  });
};

exports.destroy = function(req, res) {
  Invitation.findById(req.params.id, function (err, invitation) {
    if(err) return u.error(res, err);
    if(!invitation) return u.notfound(res);
    if (invitation.owner == req.user._id) {
      invitation.remove(function (err) {
        if (err) return u.error(res, err);
        return u.deleted(res, invitation);
      });
    } else if (invitation.target == req.user._id) {
      invitation.refused = true;
      invitation.accepted = false;
      invitation.save(function(err){
        if (err) return u.error(res, err);
        return u.ok(res);
      });
    } else {
      return u.error(res, new Error('Invalid invitation!'));
    }
  });
};

'use strict';

var _ = require('lodash');
var u = require('../../components/utils/utils');
var mongoose = require('mongoose')
var Map = require('./map.model');
var Invitation = require('../invitation/invitation.model');

var check = function(req, map) {
  return (map.owner == req.user._id);
};


exports.index = function(req, res) {
  // mappe di cui l'user è proprietario
  var filter = {owner: req.user._id};
  Map.find(filter, function (err, maps) {
    if (err) return error(res, err);
    filter = {target: req.user.email, banned: false, refused: false};
    // mappe in cui l'user è stato invitato
    Invitation.find(filter, function (err, invitations) {
      if (invitations && invitations.length) {
        var ids = _.map(invitations, function (i) {
          return mongoose.Types.ObjectId(i.map);
        });
        Map.find({'_id': {$in: ids}}, function (err, imaps) {
          if (imaps && imaps.length) {
            imaps.forEach(function (m) {
              var inv = _.find(invitations, function (i) {
                return i.map == m._id;
              });
              m.setInvite(inv);
            });
            maps.push.apply(maps, imaps);
          }
          return u.ok(res, maps);
        });
      } else {
        return u.ok(res, maps);
      }
    });
  });
};

exports.create = function(req, res) {
  req.body.owner = req.user._id;
  u.create(Map, req, res);
};

exports.update = function(req, res) {
  u.update(Map, req, res, null, null, check);
};

exports.destroy = function(req, res) {
  u.destroy(Map, req, res, null, check);
};

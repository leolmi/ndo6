'use strict';

var u = require('../../components/utils/utils');
var Position = require('./position.model');

exports.index = function(req, res) {
  var filter = {map: req.params.id, last:true};
  u.index(Position, req, res, filter);
};

exports.create = function(req, res) {
  req.body.owner = req.user._id;
  req.body.map = req.params.id;
  req.body.last = true;
  if (!req.body.map)
    return u.error(res, 'Undefined map!');
  Position.findOne({
    map:req.body.map,
    owner:req.body.owner,
    last:true
  }, function(err, pos) {
    if (pos) {
      pos.last = false;
      pos.save(function (err) {
        u.create(Position, req, res);
      });
    } else {
      u.create(Position, req, res);
    }
  });
};

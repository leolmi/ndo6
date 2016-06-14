'use strict';

var u = require('../../components/utils/utils');
var Position = require('./position.model');

exports.index = function(req, res) {
  var filter = {map: req.params.id};
  u.index(Position, req, res, filter);
};

exports.create = function(req, res) {
  req.body.owner = req.user._id;
  if (!req.body.map)
    return u.error(res, 'Undefined map!');
  u.create(Position, req, res);
};

'use strict';

// var _ = require('lodash');
var u = require('../../components/utils/utils');
var Map = require('./map.model');

var check = function(req, map) {
  return (map.owner == req.user._id);
};


exports.index = function(req, res) {
  var filter = {owner: req.user._id};
  u.index(Map, req, res, filter);
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

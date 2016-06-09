
'use strict';

var u = require('../../components/utils/utils');
var Message = require('./message.model');
var Point = require('./point.model');

function index(schema, req, res) {
  var filter = {map:req.params.id};
  u.index(schema, req, res, filter);
}


exports.indexPoints = function(req, res) {
  index(Point, req, res);
};
exports.indexMessages = function(req, res) {
  index(Message, req, res);
};

exports.createPoint = function(req, res) {
  u.create(Point, req, res);
};
exports.createMessage = function(req, res) {
  u.create(Message, req, res);
};

exports.destroyPoint = function(req, res) {
  u.destroy(Point, req, res);
};
exports.destroyMessage = function(req, res) {
  u.destroy(Message, req, res);
};

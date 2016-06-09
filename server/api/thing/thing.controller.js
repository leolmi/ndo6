/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

// var _ = require('lodash');
var u = require('../../components/utils/utils');
var Thing = require('./thing.model');

// Get list of things
exports.index = function(req, res) {
  u.index(Thing, req, res);
};

// Get a single thing
exports.show = function(req, res) {
  u.get(Thing, req, res);
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  u.create(Thing, req, res);
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  u.update(Thing, req, res);
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  u.destroy(Thing, req, res);
};

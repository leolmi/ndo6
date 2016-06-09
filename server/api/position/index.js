'use strict';

var express = require('express');
var controller = require('./position.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', auth.isAuthenticatedOnMap(), controller.index);
router.post('/:id', auth.isAuthenticatedOnMap(), controller.create);

module.exports = router;

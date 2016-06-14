/* Created by Leo on 09/06/2016. */
'use strict';
var express = require('express');
var controller = require('./invitation.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:action', auth.isAuthenticated(), controller.execute);

module.exports = router;

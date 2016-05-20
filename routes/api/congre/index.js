'use strict';

const route = require('express').Router();
const auth = require('../../core/auth/auth.service');
const controller = require('./controller');

route
    .post('/', controller.validateCongre, controller.newCongre);
//    .put('/', controller.updateCongre);

module.exports = route;

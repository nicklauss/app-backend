'use strict';

const route = require('express').Router();
const auth = require('../../core/auth/auth.service');
const controller = require('./controller');

route
    .post('/', controller.validateCongre, controller.newCongre)
    .put('/:congreId', controller.updateCongre)
    .delete('/:congreId', controller.deleteCongre)
    .get('/:congreId', controller.getCongreById);

module.exports = route;

'use strict';

const route = require('express').Router();

const auth = require('../../core/auth/auth.service');
const controller = require('./controller');

route
    .post('/', controller.validateUser, controller.create)
    .put('/', auth.isAuthenticated(), controller.update);
    /*.delete('/:userId', controller.delete)
    .get('/:congreId', controller.getUsersByCongre);*/

module.exports = route;

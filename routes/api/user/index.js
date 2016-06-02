'use strict';

const route = require('express').Router();

const auth = require('../../core/auth/auth.service');
const controller = require('./controller');

route
    .post('/', controller.validateUser, controller.create)
    .put('/:userId', controller.update)
    // .put('/', auth.isAuthenticated(), controller.update)
    .delete('/:userId', controller.delete)
    // .delete('/:userId', auth.isAuthenticated(), controller.delete)
    .get('/:role/congres/:congreId', controller.getUsersByRoleAndCongre)
    .get('/congres/:congreId', controller.getUsersByCongre)
    .get('/publications/:evaluation', controller.getReviewersByEvaluation);

module.exports = route;

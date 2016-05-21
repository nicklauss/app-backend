'use strict';

const route = require('express').Router();

const auth = require('../../core/auth/auth.service');
const controller = require('./controller');

route
    .post('/', controller.validateUser, controller.create)
    .put('/', auth.isAuthenticated(), controller.update)
    .delete('/:userId', auth.isAuthenticated(), controller.delete)
    .get('/:role/congre/:congreId', controller.getUsersByRoleAndCongre)
    .get('/congre/:congreId', controller.getUsersByCongre)
    .get('/publication/:evaluation', controller.getReviewersByEvaluation);

module.exports = route;

'use strict';

const route = require('express').Router();

const auth = require('../../core/auth/auth.service');
const controller = require('./controller');

route
    .use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    })
    .post('/', controller.validateUser, controller.create)
    // .put('/:userId', controller.update)
    // .put('/', auth.isAuthenticated(), controller.update)
    // .delete('/:userId', controller.delete)
    // .delete('/:userId', auth.isAuthenticated(), controller.delete)
    // .get('/:role/congres/:congreId', controller.getUsersByRoleAndCongre)
    // .get('/role/:role', controller.getUsersCount)
    .get('/:userId', controller.getUser)
    .get('/', controller.getUsers)
    .get('/me', auth.isAuthenticated(), controller.me);
    // .get('/publications/:evaluation', controller.getReviewersByEvaluation);

module.exports = route;

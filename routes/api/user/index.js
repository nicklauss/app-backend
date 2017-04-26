'use strict';

const route = require('express').Router();

const auth = require('../../core/auth/auth.service');
const controller = require('./controller');

route
    .use(function(req, res, next) {
        // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    })
    .post('/', controller.validateUser, controller.create)
    // .put('/:userId', controller.update)
    // .put('/', auth.isAuthenticated(), controller.update)
    // .delete('/:userId', controller.delete)
    // .delete('/:userId', auth.isAuthenticated(), controller.delete)
    // .get('/:role/congres/:congreId', controller.getUsersByRoleAndCongre)
    // .get('/role/:role', controller.getUsersCount)
    .get('/user/:userId', controller.getUser)
    .get('/', controller.getUsers)
    .get('/me', auth.isAuthenticated(), controller.me);
    // .get('/publications/:evaluation', controller.getReviewersByEvaluation);

module.exports = route;

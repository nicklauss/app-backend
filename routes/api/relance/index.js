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
    .post('/', auth.hasRole('user'), controller.newRelance)
    // .get('/users/:userId', controller.getRequestsForUser)
    .get('/', controller.getRelances)
    // .get('/NotAssigned', controller.getPublicationsNotAssigned)
    .get('/count/:requestId', controller.getrelancesCount);
    // .get('/:publicationId', controller.getPublicationById)
    // .get('/authors/:authorId', controller.getPublicationsByAuthor)
    // .get('/reviewers/:reviewerId', controller.getPublicationsByReviewer)
    // .put('/:publicationId', controller.updatePublication)
    // .delete('/:requestId', controller.deleteRequest);

module.exports = route;

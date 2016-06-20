'use strict';

const route = require('express').Router();
const auth = require('../../core/auth/auth.service');
const controller = require('./controller');

route
    .post('/', controller.validateSession, controller.newSession)
    .put('/:sessionId', controller.updateSession)
    .delete('/:sessionId', controller.deleteSession)
    .get('/:sessionId', controller.getSessionById)
    .get('/congres/:congreId', controller.getSessionsByCongre)
//    .get('/presentations/:presentationId', controller.getPresentationById)
    .get('/:sessionId/presentations', controller.getPresentationsBySession);

module.exports = route;

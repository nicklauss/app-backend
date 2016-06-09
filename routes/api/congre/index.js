'use strict';

const route = require('express').Router();
const auth = require('../../core/auth/auth.service');
const controller = require('./controller');

route
    .post('/', auth.hasRole('organizer'), controller.validateCongre, controller.newCongre)
    .put('/:congreId', auth.hasRole('organizer'), controller.updateCongre)
    .delete('/:congreId', auth.hasRole('organizer'), controller.deleteCongre)
    .get('/:congreId', controller.getCongreById)
    .get('/organizer/:organizerId', controller.getCongresByOrganizerId);

module.exports = route;

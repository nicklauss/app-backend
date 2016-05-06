'use strict';

const route = require('express').Router();

const controller = require('./controller');
route
    .get('/index', controller.index);

module.exports = route;

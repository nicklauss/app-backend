'use strict';

const router = require('express').Router();

const controller = require('./controller');

router
    .get('/index', controller.index)
    .get('/submit-publication', controller.submitPublication)
    .get('/list-publication', controller.listPublication);

module.exports = router;
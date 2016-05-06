'use strict';

const router = require('express').Router();

const controller = require('./controller');

router
    .get('/index', controller.index);

module.exports = router;

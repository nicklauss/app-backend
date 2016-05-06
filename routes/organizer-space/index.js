'use strict';

const router = require('express').Router();

const controller = require('./controller');

router
    .get('/index', controller.index)
    .get('/list-experts', controller.listExperts);

module.exports = router;

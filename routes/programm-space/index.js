'use strict';

const router = require('express').Router();

const controller = require('./controller');

router
    .get('/index', controller.index)
    .get('/phases', controller.phases)
    .get('/experts', controller.experts)
    .get('/members', controller.members)
    .get('/list-publications', controller.listPublications)
    .get('/schedule', controller.schedule);

module.exports = router;
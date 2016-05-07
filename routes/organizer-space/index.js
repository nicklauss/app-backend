'use strict';

const router = require('express').Router();

const controller = require('./controller');

router
    .get('/index', controller.index)
    .get('/new-confy', controller.newConfy)
    .get('/list-confy', controller.listConfy)
    .get('/list-experts', controller.listExperts)
    .get('/list-membres', controller.listMembres)
    .get('/list-auteurs', controller.listAuteurs)
    .get('/list-participants', controller.listParticipants)
    .get('/badges', controller.badges)
    .get('/mailing', controller.mailing);

module.exports = router;

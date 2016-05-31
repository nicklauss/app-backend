'use strict';

const path = require('path');
const route = require('express').Router();

const config = require('../config');

route.get('/organizer-app', (req, res) => {
    console.log(path.join(config.root,'public/apps/app-organizer/index.html'));
    res.sendFile(path.join(config.root,'public/apps/app-organizer/index.html'));
});

module.exports = route;

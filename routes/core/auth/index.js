'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../../../config');
var User = require('../../../models/user');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.send(200);
        } else {
            next();
        }
    })
    .use('/', require('./local'));

module.exports = router;

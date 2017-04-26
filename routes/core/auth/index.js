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
      res.header("Access-Control-Allow-Headers", "client-security-token, X-Auth-Token, Authorization, Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
      next();
    })
    .use('/', require('./local'));

module.exports = router;

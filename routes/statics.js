'use strict';

const path = require('path');
const route = require('express').Router();

const config = require('../config');
const auth = require('./core/auth/auth.service');

// To change !

route
	.get('/', (req, res) => {
	    console.log(path.join(config.root,'public/apps/app-login/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-login/index.html'));
	})
	.get('/organizer-app', (req, res) => {
	    // console.log(path.join(config.root,'public/apps/app-organizer/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-organizer/index.html'));
	})
	.get('/author-app', (req, res) => {
	    // console.log(path.join(config.root,'public/apps/app-author/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-author/index.html'));
	})
	.get('/reviewer-app', (req, res) => {
	    console.log(path.join(config.root,'public/apps/app-reviewer/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-reviewer/index.html'));
	})
	.get('/program-app', (req, res) => {
	    console.log(path.join(config.root,'public/apps/app-program/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-program/index.html'));
	});

module.exports = route;

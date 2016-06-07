'use strict';

const path = require('path');
const route = require('express').Router();

const config = require('../config');
const auth = require('./core/auth/auth.service');

// To change !

route
	.get('/login', (req, res) => {
	    console.log(path.join(config.root,'public/apps/app-login/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-login/index.html'));
	})
	.get('/', auth.hasRole('organizer'), (req, res) => {
	    // console.log(path.join(config.root,'public/apps/app-organizer/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-organizer/index.html'));
	})
	.get('/author-app', auth.hasRole('author'), (req, res) => {
	    // console.log(path.join(config.root,'public/apps/app-author/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-author/index.html'));
	})
	.get('/reviewer-app', auth.hasRole('reviewer'), (req, res) => {
	    console.log(path.join(config.root,'public/apps/app-reviewer/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-reviewer/index.html'));
	})
	.get('/program-app', auth.hasRole('program'), (req, res) => {
	    console.log(path.join(config.root,'public/apps/app-program/index.html'));
	    res.sendFile(path.join(config.root,'public/apps/app-program/index.html'));
	});

module.exports = route;

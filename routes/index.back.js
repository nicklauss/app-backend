var express = require('express');
var router = express.Router();

/* GET home page. */
router
    .get('/layout', function(req, res, next) {
        res.render('layout', {
            title: 'Express'
        });
    })
    .get('/', function(req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    })
    .get('/register', function(req, res, next) {
        res.render('register', {
            title: 'Express'
        });
    })
    .get('/soumission_publication', function(req, res, next) {
        res.render('soumission_publication', {
            title: 'Express'
        });
    })
    .get('/create_conf', function(req, res, next) {
        res.render('create_conf', {
            title: 'Express'
        });
    })
    .get('/admin', (req, res, next) => {
        res.render('layouts/index', {
			title: 'Admin Space'
		});
    })
    .get('/creation_compte', function(req, res, next) {
        res.render('creation_compte', {
            title: 'Express'
        });
    })
    .get('/dashboard', function(req, res, next) {
        res.render('dashboard', {
            title: 'Express'
        });
    })
    .get('/list', function(req, res, next) {
        res.render('list', {
            title: 'Express'
        });
    })

.get('/forms', function(req, res, next) {
    res.render('forms', {
        title: 'Express'
    });
});

module.exports = router;

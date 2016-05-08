'use strict';

exports.index = (req, res, next) => {
    res.render('expert-space/index.html', {
        title: 'Expert space'
    });
};

exports.publication = (req, res, next) => {
    res.render('expert-space/tpl/publication.html', {
        title: 'Expert space',
        publication: true
    });
};
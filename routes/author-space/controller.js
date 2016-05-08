'use strict';

exports.index = (req, res, next) => {
    res.render('author-space/index.html', {
        title: 'Author space'
    });
};

exports.submitPublication = (req, res, next) => {
    res.render('author-space/tpl/submit-publication.html', {
        title: 'Author space',
        publication: {
            open: true,
            submit: true
        }
    });
};

exports.listPublication = (req, res, next) => {
    res.render('author-space/tpl/list-publication.html', {
        title: 'Author space',
        publication: {
            open: true,
            list: true
        }
    });
};

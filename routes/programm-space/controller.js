'use strict';

exports.index = (req, res, next) => {
    res.render('program-space/index', {
        title: 'Progremm space'
    });
};

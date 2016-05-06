'use strict';

exports.index = (req, res, next) => {
    res.render('layouts/index', {
        title: 'Organizer Space'
    });
};

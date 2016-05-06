'use strict';

exports.index = (req, res, next) => {
    res.render('organizer-space/index', {
        title: 'Organizer Space'
    });
};

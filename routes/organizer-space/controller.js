'use strict';

exports.index = (req, res, next) => {
    res.render('organizer-space/index', {
        title: 'Organizer Space'
    });
};

exports.listExperts = (req, res, next) => {
    res.render('organizer-space/tpl/list-experts.html', {
        title: 'Liste Experts',
        program: {
            open: true,
            list_experts: true
        }
    });
};

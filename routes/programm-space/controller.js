'use strict';

exports.index = (req, res, next) => {
    res.render('program-space/index.html', {
        title: 'Program space'
    });
};

exports.phases = (req, res, next) => {
    res.render('program-space/tpl/phases.html', {
        title: 'Program space',
        confy: {
            open: true,
            phase: true
        }
    });
};

exports.members = (req, res, next) => {
    res.render('program-space/tpl/members.html', {
        title: 'program space',
        program: {
            open: true,
            members: true
        }
    });
};

exports.experts = (req, res, next) => {
    res.render('program-space/tpl/experts.html', {
        title: 'program space',
        program: {
            open: true,
            experts: true
        }
    });
};

exports.listPublications = (req, res, next) => {
    res.render('program-space/tpl/list-publications.html', {
        title: 'Program space',
        publication: {
            open: true,
            list: true
        }
    });
};

exports.schedule = (req, res, next) => {
    res.render('program-space/tpl/schedule.html', {
        title: 'Program space',
        session: {
            open: true,
            schedule: true
        }
    });
};

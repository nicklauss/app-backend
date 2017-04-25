'use strict';
const auth = require('./core/auth/auth.service');

module.exports = (app) => {
    app
        .use('/organizer', require('./organizer-space'))
        .use('/program', require('./programm-space'))
        .use('/expert', require('./expert-space'))
        .use('/author', require('./author-space'))
        .use('/', require('./statics'));

    app
        .use('/api/v1/auth', require('./core/auth'))
        .use('/api/v1/users', require('./api/user'))
        .use('/api/v1/congres', require('./api/congre'))
        .use('/api/v1/requests', require('./api/request'))
        .use('/api/v1/relances', require('./api/relance'))
        .use('/api/v1/sessions', require('./api/session'));
};

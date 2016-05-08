'use strict';


module.exports = (app) => {
    app.use('/organizer', require('./organizer-space'));
    app.use('/program', require('./programm-space'));
    app.use('/expert', require('./expert-space'));
};

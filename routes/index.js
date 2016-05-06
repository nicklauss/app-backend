'use strict';


module.exports = (app) => {
    app.use('/organizer', require('./organizer-space'));
};

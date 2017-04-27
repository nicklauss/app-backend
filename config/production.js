'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    //   uri: 'mongodb://nicklauss:Hamza123@ds117931.mlab.com:17931/structis'
    // uri:    process.env.MONGOLAB_URI ||
    //         process.env.MONGOHQ_URL ||
    //         process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
        uri: 'mongodb://localhost/structis'
  }
};

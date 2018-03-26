const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

// let connectPath, options;
// //Check if we are on Heroku
// if (process.env.MONGODB_URI){
//  connectPath = "mongodb://Wojtaszek@ds115579.mlab.com:15579/nodejs-course";
//  options= {
//      auth: {
//          user: 'Wojtaszek',
//          password: 'P@ssw0rd'
//      }
//  }
// } else {
//  connectPath = "mongodb://localhost:27017/TodoApp";
//  options = {}
// }
// mongoose.connect(connectPath, options);

const db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://Wojtaszek:P@ssw0rd@ds115579.mlab.com:15579/nodejs-course'
};

mongoose.connect(db.localhost || db.mlab);

module.exports = { mongoose }


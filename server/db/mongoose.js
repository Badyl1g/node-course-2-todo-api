const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect(process.env.PORT || 'mongodb://localhost:27017/TodoApp');

const db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://Wojtaszek:P@ssw0rd@ds115579.mlab.com:15579/nodejs-course'
};

mongoose.connect( process.env.PORT ? db.mlab : db.localhost);

module.exports = { mongoose }


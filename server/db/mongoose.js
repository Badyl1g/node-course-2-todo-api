const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://Wojtaszek:P%40ssw0rd@ds115579.mlab.com:15579/nodejs-course');

module.exports = { mongoose }


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<Wojtaszek>:<wojtas.98>@ds115579.mlab.com:15579/nodejs-course' || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose }
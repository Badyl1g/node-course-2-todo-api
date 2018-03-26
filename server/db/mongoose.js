const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

let connectPath, options;
//Check if we are on Heroku
if (process.env.PORT){
 connectPath = "mongodb://<dbuser>@ds115579.mlab.com:15579/durgesh-todo";
 options= {
     auth: {
         user: '<dbuser>',
         password: '<dbpassword>'
     }
 }
} else {
 connectPath = "mongodb://localhost:27017/TodoApp";
 options = {}
}
mongoose.connect(connectPath, options);

module.exports = { mongoose }


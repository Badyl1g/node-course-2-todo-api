const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({})
//   .then(result => console.log(result));

Todo.findOneAndRemove({text: 'New todo 1'})
  .then(doc => console.log(doc));

// Todo.findByIdAndRemove('5aba45087824af30a4ce91a3')
//   .then(todo => console.log(todo));
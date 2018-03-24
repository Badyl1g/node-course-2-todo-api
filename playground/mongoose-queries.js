const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose'); // get mongoose object from mongoose module.exports
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// const id = '5ab610b6c0cbb2249ceb3d4611';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({ _id: id })
//   .then(todos => {
//     console.log('Todos', JSON.stringify(todos, undefined, 2));
//   });

// Todo.findOne({ _id: id })
//   .then(todo => {
//     console.log('Todo', JSON.stringify(todo, undefined, 2));
//   });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('Id not found');
//     }
//     console.log('Todo By Id', JSON.stringify(todo, undefined, 2));
//   })
//   .catch(err => console.log(err));

const userId = '5ab399238002c224cc72b63e';

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(err => console.log(err));
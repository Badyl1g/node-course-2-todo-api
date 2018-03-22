// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MonbgoDB server');
  };
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos')
  //   .findOneAndUpdate( // takes up to 4 {object} arguments
  //     {
  //       _id: new ObjectID('5ab371087dc171227e3be916')
  //     }, 
  //     {
  //       $set: {
  //         completed: true
  //       }
  //     },
  //     {
  //       returnOriginal: false
  //     }
  //   )
  //   .then(res => console.log(res));

    db.collection('Users')
    .findOneAndUpdate( // takes up to 4 {object} arguments
      {
        name: 'Jim Carrey'
      }, 
      {
        $set: {
          name: 'Robert Downey Jr.',
        },
        $inc: {
          age: -24
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(res => console.log(res));

  // client.close();
});
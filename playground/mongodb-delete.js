// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MonbgoDB server');
  };
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  db.collection('Users')
    .deleteMany({name: 'Morgan Freeman'})
    .then(res => console.log(res));

  db.collection('Users')
    .findOneAndDelete({_id: new ObjectID('5ab3635dc99d940d60eac53d')})
    .then(res => console.log(res));

  // db.collection('Todos')
  //   .findOneAndDelete({completed: false})
  //   .then(res => console.log(res));

  // client.close();
});
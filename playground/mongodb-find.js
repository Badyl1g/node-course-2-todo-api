// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MonbgoDB server');
  };
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos')
  //   .find({
  //     _id: new ObjectID('5ab366ae7dc171227e3be69b')
  //   })
  //   .toArray()
  //   .then(documents => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(documents, undefined, 2));
  //   }, err => {
  //     console.log('Unable to fetch Todos', err);
  //   });

  // db.collection('Todos')
  //   .find()
  //   .count()
  //   .then(count => {
  //     console.log(`Todos count: ${count}`);
  //   }, err => {
  //     console.log('Unable to fetch Todos', err);
  //   });

  db.collection('Users')
    .find({name: 'Morgan Freeman'})
    .toArray()
    .then(documents => console.log(JSON.stringify(documents, undefined, 2)))

  // client.close();
});
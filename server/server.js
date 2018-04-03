require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// GET /todos
app.get('/', (req, res) => {
  res.send('Todo App, go to /todos, or todos/:id');
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then(todos => res.send({todos}))
    .catch(err => res.status(400).send(err));
});

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // Todo.findById(id)
  Todo.findOne({ _id: id, _creator: req.user._id })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => res.status(404).send());
});

// POST /todos
app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err));
});

// DELETE /todos
app.delete('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({ _id: id, _creator: req.user._id })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch((err => res.status(400).send()));
});

// PATCH / todos
app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  // const body = _.pick(req.body, ['text', 'completed']);
  const body = { text: req.body.text, completed: req.body.completed }

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true})
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => res.status(400).send());
});

// POST /users
app.post('/users', (req, res) => {
  // const body = _.pick(req.body, ['email','password']);
  const body = { email: req.body.email, password: req.body.password };
  const newUser = new User(body);

  newUser.save()
    .then(() => newUser.generateAuthToken())
    .then(token => res.header('x-auth', token).send(newUser))
    .catch(err => res.status(400).send(err));
});

app.get('/users/me', authenticate, (req, res) => { // use middleware here
  res.send(req.user)
});

// POST /users/login
app.post('/users/login', (req, res) => {
  const body = { email: req.body.email, password: req.body.password };
  const newUser = new User(body);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken()
        .then(token => res.header('x-auth', token).send(user));
    })
    .catch(err => res.status(401).send());
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => res.status(200).send())
    .catch(() => res.status(400).send());
});

app.listen(port, () => console.log(`Started on port ${port}`));

module.exports = { app }
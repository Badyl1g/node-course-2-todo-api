const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  // return _.pick(user, ['_id', 'email']);
  return { _id: user._id, email: user.email };
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({
    _id: user._id.toHexString(), // signed token contains user _id and access prop 
    access
  }, 'abc123').toString();

  // user.tokens = user.tokens.concat([{ access, token }]);
  user.tokens = [...user.tokens, {access, token}];

  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(err) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
  // return User.findOne({
  //   _id: decoded._id,
  //   tokens: {
  //     access: 'auth',
  //     token: token
  //   },
  // })
};

const User = mongoose.model('User', UserSchema);

module.exports = { User }
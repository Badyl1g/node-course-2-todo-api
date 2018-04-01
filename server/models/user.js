const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
  // return User.findOne({    the same
  //   _id: decoded._id,
  //   tokens: {
  //     access: 'auth',
  //     token: token
  //   },
  // })
};

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({ email })
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      return bcrypt.compare(password, user.password)
        .then(res => {
          if (res) {
            return Promise.resolve(user);
          } else {
            return Promise.reject();
          }
        })
      // return new Promise((resolve, reject) => { // old (when bcrypt didn't support promises)
      //   bcrypt.compare(password, user.password, (err, res) => {
      //     res ? resolve(user) : reject();
      //   });
      // });
    })
};

UserSchema.pre('save', function(next) {
  const user = this; // before saving change text password to hashed and salted password

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User }
const { User } = require('../models/user');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject(); // go to catch()
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => res.status(401).send()); // auth is required
};

module.exports = { authenticate };
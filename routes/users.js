const omit = require('lodash/omit');
const usersRouter = require('express').Router();
const promise = require('bluebird');
const { User } = require('../models');
const { hashPassword, hashPasswordCompare, generateToken,
  validateRegisterInput, validateLoginInput } = require('../utils');
const { errors } = require('../middleware');

usersRouter.post('/', (req, res, next) => {
  const { username, password } = req.body;
  const { errors: errors_, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    next(new errors.BadRequest(errors_));
  }

  const user = new User();
  user.username = username;

  hashPassword(password)
    .then(hash => {
      user.password = hash;
      return user.save();
    })
    .then(user => res.json({ success: true, user }))
    .catch(err => next(err));
});


usersRouter.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  const { errors: errors_, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    next(new errors.BadRequest(errors_));
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return promise.reject(new errors.Forbidden('Wrong credentials'));
      }
      return hashPasswordCompare(password, user.password)
        .then(passCheck => {
          if (!passCheck) {
            return promise.reject(new errors.Forbidden('Wrong credentials'));
          }
          return passCheck;
        })
        .then(() => generateToken(omit(user.toObject(), ['videos', 'token'])))
        .then(token => (user.token = token))
        .then(() => user.save());
    })
    .then(user => res.json({ success: true, token: user.token, user: user.toObject() }))
    .catch(err => next(err));
});

module.exports = usersRouter;


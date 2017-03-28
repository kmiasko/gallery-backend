const omit = require('lodash/omit');
const promise = require('bluebird');
const { hashPasswordCompare, generateToken, validateLoginInput, validate } = require('../../utils');
const { User } = require('../../models');
const { errors } = require('../../middleware');

const login = (req, res, next) =>
  validate(validateLoginInput, req.body)
    .then(() => User.findOne({ username: res.locals.username }))
    .then(user => {
      if (!user) {
        return promise.reject(new errors.Forbidden('Wrong credentials'));
      }
      return hashPasswordCompare(res.locals.password, user.password)
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
    .then(user => res.json({ token: user.token, user: user.toObject() }))
    .catch(next);

module.exports = login;


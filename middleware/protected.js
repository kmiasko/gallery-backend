const promise = require('bluebird');
const { verifyToken } = require('../utils');
const { User } = require('../models');
const { errors } = require('../middleware');

const protected = (req, res, next) => {
  if (!req.headers['x-auth']) {
    next(new errors.BadRequest('No auth header'));
  }

  const token = req.headers['x-auth'];
  verifyToken(token)
    .then(() => User.findOne({ token }))
    .then(user => {
      if (!user) {
        return promise.reject(new errors.Forbidden('Cant find user with that token'));
      }
      res.locals.user_id = user._id;
      next();
    })
    .catch(err => next(err))
};

module.exports = protected;


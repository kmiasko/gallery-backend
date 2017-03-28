const promise = require('bluebird');
const { errors } = require('../middleware');
const { User } = require('../models');

const checkIfVideoOwner = (req, res, next) => {
  const videoid = req.params.id;
  if (!videoid) {
    next(new errors.BadRequest('Missing id of resource'));
  }

  User.findOne({ _id: res.locals.user._id, videos: videoid })
    .then(user => {
      if (!user) {
        return promise.reject(new errors.NotFound());
      }
      next();
    })
    .catch(next);
};

module.exports = checkIfVideoOwner;


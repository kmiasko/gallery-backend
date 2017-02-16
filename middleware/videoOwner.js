const promise = require('bluebird');
const { errors } = require('../middleware');
const { User } = require('../models');

const videoOwner = (req, res, next) => {
  const videoid = req.params.id;
  if (!videoid) {
    next(new errors.BadRequest('Missing id of resource'));
  }

  const user_id = res.locals.user_id;

  User.findOne({ _id: user_id, videos: videoid })
    .then(user => {
      if (!user) {
        return promise.reject(new errors.NotFound());
      }
      next();
    })
    .catch(err => next(err));
};

module.exports = videoOwner;


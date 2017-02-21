const promise = require('bluebird');
const { Video } = require('../../models');
const { errors } = require('../../utils');

const videoFavorite = (req, res, next) =>
  Video.findOne({ _id: req.params.id })
    .then(video => {
      if (!video) {
        return promise.reject(new errors.NotFound());
      }
      return video.fav();
    })
    .then(video => res.json({ success: true, video }))
    .catch(next);

module.exports = videoFavorite;


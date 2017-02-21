const { Video } = require('../../models');

const deleteVideo = (req, res, next) =>
  Video.findOne({ _id: req.params.id })
    .remove()
    .then(() => res.locals.user)
    .then(user => {
      user.videos.remove(req.params.id);
      user.markModified('videos');
      return user.save();
    })
    .then(() => res.json({ }))
    .catch(next);

module.exports = deleteVideo;


const videosRouter = require('express').Router();
const promise = require('bluebird');
const { Video, User } = require('../models');
const { protected, videoOwner, errors } = require('../middleware');

videosRouter.get('/', protected, (req, res, next) => {
  const user_id = res.locals.user_id;

  User.findOne({ _id: user_id })
    .populate('videos')
    .then(user => {
      if (!user) {
        return promise.reject(new errors.NotFound())
      }
      return res.json({ success: true, videos: user.videos });
    })
    .catch(err => next(err));
});

videosRouter.get('/feed', (req, res, next) => {
  Video.feed()
    .then(feed => res.json({ success: true, feed }))
    .catch(err => next(err));
});

videosRouter.post('/', protected, (req, res, next) => {
  const io = req.app.get('socketio');

  if (!req.body) {
    next(new errors.BadRequest('Empty body'));
  }

  const { title, thumbnail } = req.body;
  const vid = new Video(req.body);

  return User.findOne({ _id: res.locals.user_id })
    .then(user => {
      if (!user) {
        promise.reject(new errors.NotFound());
      }
      return vid.save()
        .then((video) => {
          user.videos.push(video._id);
          user.markModified('videos');
          user.save();
          res.json({ success: true, video })
          if (title && thumbnail) {
            io.emit('new:video', { title, thumbnail });
          }
        })
    })
    .catch(err => next(err));
});

const ownerProtection = [protected, videoOwner];

videosRouter.delete('/:id', ownerProtection, (req, res, next) => {
  Video.findOne({ _id: req.params.id })
    .remove()
    .then(() => User.findOne({ _id: res.locals.user_id }))
    .then(user => {
      user.videos.remove(req.params.id);
      user.markModified('videos');
      return user.save();
    })
    .then(() => res.json({ success: true }))
    .catch(err => next(err));
});

videosRouter.put('/:id', ownerProtection, (req, res, next) => {
  Video.findOne({ _id: req.params.id })
    .then(video => {
      if (!video) {
        return promise.reject(new errors.NotFound());
      }
      return video.fav();
    })
    .then(video => res.json({ success: true, video }))
    .catch(err => next(err));
});

module.exports = videosRouter;


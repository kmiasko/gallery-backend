const videosRouter = require('express').Router();
const { Video, User } = require('../models');
const { protected, videoOwner } = require('../middleware');

videosRouter.get('/', protected, (req, res) => {
  if (!res.locals.user_id) {
    return res.status(401).json({ success: false, error: 'Forbidded' });
  }

  const user_id = res.locals.user_id;

  User.findOne({ _id: user_id })
    .populate('videos')
    .then(user => {
      if (!user) {
        return res.status(401).json({ success: false, error: 'Forbidded' });
      }
      return res.json({ success: true, videos: user.videos });
    })
    .catch(err => res.status(500).json({ success: false, error: err }));
});

videosRouter.get('/feed', (req, res) => {
  Video.feed()
    .then(feed => res.json({ success: true, feed }))
    .catch(err => res.status(500).json({ error: err }));
});

videosRouter.post('/', protected, (req, res) => {
  const io = req.app.get('socketio');

  if (!req.body) {
    return res.status(400).json({ success: false, error: 'Empty body' });
  }

  const { title, thumbnail } = req.body;
  const vid = new Video(req.body);

  return User.findOne({ _id: res.locals.user_id })
    .then(user => {
      if (!user) {
        return res.status(404).json({ success: false, error: 'Unknow user' });
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
});

const ownerProtection = [protected, videoOwner];

videosRouter.delete('/:id', ownerProtection, (req, res) => {
  Video.findOne({ _id: req.params.id })
    .remove()
    .then(() => User.findOne({ _id: res.locals.user_id }))
    .then(user => {
      user.videos.remove(req.params.id);
      user.markModified('videos');
      return user.save();
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ success: false, error: err }));
});

videosRouter.put('/:id', ownerProtection, (req, res) => {
  Video.findOne({ _id: req.params.id })
    .then(video => {
      if (!video) {
        return res.status(404).json({ success: false, error: 'No such video' });
      }
      return video.fav();
    })
    .then(video => res.json({ success: true, video }))
    .catch(err => res.status(500).json({ success: false, error: err }));
});

module.exports = videosRouter;


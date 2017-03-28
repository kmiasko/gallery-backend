const { Video } = require('../../models');

const addVideo = (req, res, next) => {
  const io = req.app.get('socketio');
  const { title, thumbnail } = req.body;
  const { user } = res.locals;
  const vid = new Video(req.body);

  vid.save()
    .then((video) => {
      user.videos.push(video._id);
      user.markModified('videos');
      user.save();
      res.json({ video })
      if (title && thumbnail) {
        io.emit('new:video', { title, thumbnail });
      }
    })
    .catch(next);
};

module.exports = addVideo;


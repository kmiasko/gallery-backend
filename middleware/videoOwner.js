const { User } = require('../models');

const videoOwner = (req, res, next) => {
  if (!res.locals.user_id) {
    res.status(401).json({ success: false, error: 'You dont have access to resource' });
    next();
  }

  const videoid = req.params.id;
  if (!videoid) {
    res.status(500).json({ success: false, error: 'Missing video id' });
    next();
  }

  const user_id = res.locals.user_id;

  User.findOne({ _id: user_id, videos: videoid })
    .then(user => {
      if (!user) {
        res.status(404).json({ success: false, error: 'No such resource' });
        next();
      }
      next();
    })
    .catch(err => next(err));
};

module.exports = videoOwner;


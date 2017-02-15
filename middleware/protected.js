const { verifyToken } = require('../utils');
const { User } = require ('../models');

const protected = (req, res, next) => {
  if (!req.headers['x-auth']) {
    res.status(400).json({ success: false, error: 'No authorization header' });
    next();
  }

  const token = req.headers['x-auth'];
  verifyToken(token)
    .then(() => User.findOne({ token }))
    .then(user => {
      if (!user) {
        res.status(401).json({ success: false, error: 'Bad autorization token' });
        next();
      }
      res.locals.user_id = user._id;
      next();
    })
    .catch(() => {
      res.status(401).json({ success: false, error: 'Bad autorization token' });
      next();
    });
};

module.exports = protected;


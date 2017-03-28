const { User } = require('../../models');

const getOne = (req, res, next) => {
  const { user } = res.locals;
  User.findOne(user)
    .populate('videos')
    .then(user => res.json({ videos: user.videos }))
    .catch(next);
};

module.exports = getOne;

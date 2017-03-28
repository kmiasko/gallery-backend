const { Video } = require('../../models');

const getFeed = (req, res, next) =>
  Video.feed()
    .then(feed => res.json({ feed }))
    .catch(next);

module.exports = getFeed;


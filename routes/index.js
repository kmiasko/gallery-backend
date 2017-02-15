const router = require('express').Router();
const users = require('./users');
const videos = require('./videos');

router.use('/users', users);
router.use('/videos', videos);

module.exports = router;


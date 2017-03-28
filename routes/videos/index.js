const router = require('express').Router();
const { protected, checkIfVideoOwner, checkIfBodyValid } = require('../../middleware');
const getOne = require('./get-one');
const getFeed = require('./get-feed');
const deleteVideo = require('./delete');
const addVideo = require('./add-video');
const videoFavorite = require('./video-favorite');

router.get('/', protected, getOne);
router.post('/', [checkIfBodyValid, protected], addVideo);
router.delete('/:id', [protected, checkIfVideoOwner], deleteVideo);
router.put('/:id', [protected, checkIfVideoOwner], videoFavorite);
router.get('/feed', getFeed);

module.exports = router;


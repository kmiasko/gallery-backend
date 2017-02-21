const router = require('express').Router();
const { checkIfBodyValid } = require('../../middleware');
const login = require('./login');
const addUser = require('./add-user');

router.post('/', checkIfBodyValid, addUser);
router.post('/login', checkIfBodyValid, login);

module.exports = router;


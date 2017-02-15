const omit = require('lodash/omit');
const usersRouter = require('express').Router();
const { User } = require('../models');
const { hashPassword, hashPasswordCompare, generateToken,
  validateRegisterInput, validateLoginInput } = require('../utils');
const { protected } = require('../middleware');

usersRouter.post('/', (req, res) => {
  const { username, password } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json({ success: false, errors });
    return null;
  }

  const user = new User();
  user.username = username;
  hashPassword(password)
    .then(hash => {
      user.password = hash;
      return user.save();
    })
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.errmsg }));
});


usersRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json({ success: false, errors });
    return null;
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(401).json({ success: false, error: 'Wrong credentials' });
      }
      return hashPasswordCompare(password, user.password)
        .then(passCheck => {
          if (!passCheck) {
            return res.status(401).json({ success: false, error: 'Wrong credentials' });
          }
          return passCheck;
        })
        .then(() => generateToken(omit(user.toObject(), ['videos', 'token'])))
        .then(token => (user.token = token))
        .then(() => user.save())
        .then(() => res.json({ succes: true, token: user.token, user: user.toObject() }));
    })
    .catch(err => res.status(500).json({ success: false, error: err }));
});

module.exports = usersRouter;


const { validateRegisterInput, hashPassword, validate } = require('../../utils');
const { User } = require('../../models/user');

const addUser = (req, res, next) => {
  validate(validateRegisterInput, req.body)
    .then(() => {
      const user = new User();
      user.username = res.locals.username;
      return user;
    })
    .then(user => hashPassword(res.locals.password)
      .then(hash => {
        user.password = hash;
        return user.save();
      })
      .then(user => res.json({ user })))
    .catch(next);
}

module.exports = addUser;


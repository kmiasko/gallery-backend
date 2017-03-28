const { errors } = require('./errors');

const checkIfBodyValid = (req, res, next) => {
  if (!req.body) {
    next(new errors.BadRequest('Empty error body'));
  }

  res.locals.username = req.body.username;
  res.locals.password = req.body.password;
  next();
};

module.exports = checkIfBodyValid;


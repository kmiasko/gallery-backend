const protected = require('./protected');
const videoOwner = require('./videoOwner');
const { errorHandler, errors } = require('./errors');

module.exports = {
  protected,
  videoOwner,
  errors,
  errorHandler,
};


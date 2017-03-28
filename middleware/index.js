const protected = require('./protected');
const checkIfVideoOwner = require('./checkIfVideoOwner');
const checkIfBodyValid = require('./checkIfBodyValid');
const { errorHandler, errors } = require('./errors');

module.exports = {
  protected,
  checkIfVideoOwner,
  checkIfBodyValid,
  errors,
  errorHandler,
};


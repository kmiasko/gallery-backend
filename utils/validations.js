const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const isNil = require('lodash/isNil');

const validateRegisterInput = (body) => {
  let errors = {};

  if (isNil(body.username) || Validator.isEmpty(body.username)) {
    errors.username = 'Username field is required';
  }

  if (isNil(body.password) || Validator.isEmpty(body.password)) {
    errors.password = 'Password field is required';
  }

  if (body.password !== body.passwordConfirmation) {
    errors.passwordConfirmation = 'Passowrds must match';
  }

  if (isNil(body.passwordConfirmation) || Validator.isEmpty(body.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password confirmation field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

const validateLoginInput = (body) => {
  let errors = {};

  if (isNil(body.username) || Validator.isEmpty(body.username)) {
    errors.username = 'Username field is required';
  }

  if (isNil(body.password) || Validator.isEmpty(body.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validateRegisterInput,
  validateLoginInput,
};


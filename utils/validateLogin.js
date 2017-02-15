const Validator = require('validator');

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

module.exports = validateLoginInput;

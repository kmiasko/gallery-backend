const {
  hashPasswordSync,
  hashPassword,
  hashPasswordCompare,
  hashPasswordCompareSync,
} = require('./passwords');

const {
  generateToken,
  verifyToken,
} = require('./jwt');

const {
  validateRegisterInput,
  validateLoginInput,
} = require('./validations');

module.exports = {
  hashPasswordSync,
  hashPassword,
  hashPasswordCompare,
  hashPasswordCompareSync,
  generateToken,
  verifyToken,
  validateRegisterInput,
  validateLoginInput,
};


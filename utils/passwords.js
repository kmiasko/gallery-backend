const bcrypt = require('bcryptjs');
const promise = require('bluebird');

const hashFunc = promise.promisify(bcrypt.hash);
const saltFunc = promise.promisify(bcrypt.genSalt);
const compareFunc = promise.promisify(bcrypt.compare);

const hashPasswordSync = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const hashPassword = password =>
  saltFunc(10)
    .then(salt => hashFunc(password, salt))

const hashPasswordCompareSync = (password, hash) =>
  bcrypt.compareSync(password, hash);

const hashPasswordCompare = (password, hash) =>
  compareFunc(password, hash);

module.exports = {
  hashPasswordSync,
  hashPassword,
  hashPasswordCompare,
  hashPasswordCompareSync,
};


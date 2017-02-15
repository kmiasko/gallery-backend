const promise = require('bluebird');
const jwt = require('jsonwebtoken');
const config = require('../config');
const jwtVerify = promise.promisify(jwt.verify);
const jwtSign = promise.promisify(jwt.sign);

const generateToken = data => {
  if (!data) {
    return promise.reject(Error('No token payload data'));
  }
  return jwtSign({data}, config.jwt.secret, config.jwt.options);
};

const verifyToken = token => {
  if (!token) {
    return promise.reject(Error('Missing token'));
  }
  return jwtVerify(token, config.jwt.secret);
};

module.exports = {
  generateToken,
  verifyToken,
};


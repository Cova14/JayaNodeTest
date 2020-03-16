const hashPassword = require('./hashPassword');
const returnServiceSchema = require('./returnServiceSchema');
const JWTsign = require('./jwtSign');
const checkJWTToken = require('./checkJWTToken');
const checkPassword = require('./checkPassword');

module.exports = {
  hashPassword,
  returnServiceSchema,
  JWTsign,
  checkJWTToken,
  checkPassword
}
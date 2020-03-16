const repoValidator = require('./repoValidator');
const serviceValidator = require('./serviceValidator');
const loginSchemaValidator = require('./loginValidator');
const createUserValidator = require('./createUserValidator');

module.exports = {
  repoValidator,
  serviceValidator,
  loginSchemaValidator,
  createUserValidator
};
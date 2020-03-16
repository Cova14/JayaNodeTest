const Joi = require('@hapi/joi')
const joiValidator = require('./joiValidator')

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  token: Joi.string()
})

const loginSchemaValidator = data => joiValidator(schema, data)

module.exports = loginSchemaValidator
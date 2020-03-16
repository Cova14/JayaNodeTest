const Joi = require('@hapi/joi')
const joiValidator = require('./joiValidator')

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const loginSchemaValidator = data => joiValidator(schema, data)

module.exports = loginSchemaValidator
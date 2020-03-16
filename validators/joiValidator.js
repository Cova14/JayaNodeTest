const joiValidator = (schema, data) => {
  const result = schema.validate(data, { abortEarly: false })
  if (result.error) {
    const errors = result.error.details.map(detail => {
      return `${detail.message}`
    })
    return { error: true, errors }
  } else {
    return { error: false }
  }
}

module.exports = joiValidator
const returnServiceSchema = (response, isError = false) => {
  return { isError, response }
}

module.exports = returnServiceSchema
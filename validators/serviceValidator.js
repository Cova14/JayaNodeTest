const serviceValidator = serviceResponse => {
  if (!!!serviceResponse || typeof serviceResponse === 'undefined' || serviceResponse.isError) {
    return false
  }
  return true
}

module.exports = serviceValidator
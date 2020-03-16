const repoValidator = result => {
  if (!!!result || result === 'undefined' || typeof result === "undefined") {
      return false
  }
  return true
}

module.exports = repoValidator
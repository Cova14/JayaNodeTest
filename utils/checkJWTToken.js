const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'defaultSecret'

const checkJWTToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports = checkJWTToken
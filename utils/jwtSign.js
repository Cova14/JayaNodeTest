require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'defaultSecret';


const JWTsign = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: 86400 }, (err, token) => {
      if (err) reject(err)
      if(token) resolve(token)
    })
  })
}

module.exports = JWTsign
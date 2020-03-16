const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config;
const secret = process.env.JWT_SECRET || 'defaultSecret';
const User = require('../models/User');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

module.exports = passport => {
  console.log(opts)
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      console.log('payload')
      console.log(payload)
      User
        .findById(payload.id)
        .then(user => {
          if(user) {
            const { name, email } = user
            return done(null, {
              id: user._id,
              name,
              email
            });
          }
          return done(null, false);
        })
        .catch(error => {
          console.error(error);
        });
    })
  );
};
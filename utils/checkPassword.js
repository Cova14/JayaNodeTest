const bcrypt = require('bcrypt-nodejs');

const checkPassword = (rawPassword, userPasssword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(rawPassword, userPasssword, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = checkPassword
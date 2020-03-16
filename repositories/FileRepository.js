const { User } = require('../models');

class UserRepository {

  static getAll() {
    return new Promise((resolve, reject) => {
      User
        .find({ deletedAt: null }, {userName: 1, email: 1})
        .then(users => resolve(users))
        .catch(error => reject({
          hasError: true,
          error
        })
      );
    });
  };

  static getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      User
        .findOne({ email: email }, {userName: 1, email: 1})
        .then(user => resolve(user))
        .catch(error => reject({
          hasError: true,
          error
        })
      );
    });
  };

  static getUserWithPassword(email) {
    return new Promise((resolve, reject) => {
      User
        .findOne({ email: email }, {email: 1, password: 1})
        .then(user => resolve(user))
        .catch(error => reject({
          hasError: true,
          error
        })
      );
    });
  };

  static create(data) {
    return new Promise((resolve, reject) => {
      const newUser = new User(data);
      newUser
        .save()
        .then(user => resolve(user.id))
        .catch(error => reject({
          hasError: true,
          error
        })
      );
    });
  };
};

module.exports = UserRepository;
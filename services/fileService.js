const { UserRepository } = require('../repositories')
const { repoValidator } = require('../validators')
const fs = require('fs')

const {
  returnServiceSchema
} = require('../utils')

class FileService {

  constructor() {}

  static async OrderByAsc(arrays) {
    try {
      function sortNumberAsc(a, b) {
        return a - b;
      }
      let newArr = []
      await arrays.forEach(arr => {
        arr.sort(sortNumberAsc)
        newArr.push(arr)
      });

      fs.writeFile('ordered.txt', newArr, 'utf8', (err) => {
        if (err) return returnServiceSchema(newArr, true)
        console.log('The file has been saved!!');
      });

      return returnServiceSchema(newArr)
    } catch (error) {
      return returnServiceSchema(error, true)
    }
  }

  static getAll() {
    return UserRepository.getAll();
  };
}

module.exports = FileService
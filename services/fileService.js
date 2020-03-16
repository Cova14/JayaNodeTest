const { UserRepository } = require('../repositories')
const fs = require('fs')

const {
  returnServiceSchema
} = require('../utils')

function sortNumberAsc(a, b) {
  return a - b;
}

function sortNumberDes(a, b) {
  return b - a;
}

function writeFile(fileData) {
  fs.writeFile('./public/assets/sorted.txt', fileData, 'utf8', (err) => {
    if (err) return returnServiceSchema(err, true)
    console.log('The file has been saved!');
  });
}

class FileService {

  constructor() {}

  static async SortByAsc(arrays) {
    try {
      let newArr = []
      await arrays.forEach(arr => {
        arr.sort(sortNumberAsc)
        newArr.push(arr)
      });

      const txtArr = JSON.stringify(newArr)
      const fileData = txtArr.slice(1, (txtArr.length -1))

      writeFile(fileData)

      return returnServiceSchema(newArr)
    } catch (error) {
      return returnServiceSchema(error, true)
    }
  }

  static async SortByDes(arrays) {
    try {
      let newArr = []
      await arrays.forEach(arr => {
        arr.sort(sortNumberDes)
        newArr.push(arr)
      });

      const txtArr = JSON.stringify(newArr)
      const fileData = txtArr.slice(1, (txtArr.length -1))

      writeFile(fileData)

      return returnServiceSchema(newArr)
    } catch (error) {
      return returnServiceSchema(error, true)
    }
  }

  static async SortByMix(arrays) {
    try {
      let newArr = []
      await arrays.forEach((arr, index) => {
        if((index + 1) % 2) {
          arr.sort(sortNumberAsc)
        } else {
          arr.sort(sortNumberDes)
        }
        newArr.push(arr)
      });

      const txtArr = JSON.stringify(newArr)
      const fileData = txtArr.slice(1, (txtArr.length -1))

      writeFile(fileData)

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
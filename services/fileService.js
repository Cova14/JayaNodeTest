const fs = require('fs')

const {
  returnServiceSchema
} = require('../utils')

const sortNumberAsc = (a, b) => {
  return a - b;
}

const sortNumberDes = (a, b) => {
  return b - a;
}

const writeFile = async (fileData) => {
  await fs.writeFile('./public/assets/sorted.txt', fileData, 'utf8', async (err) => {
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

      await writeFile(fileData)

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

      await writeFile(fileData)

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

      await writeFile(fileData)

      return returnServiceSchema(newArr)
    } catch (error) {
      return returnServiceSchema(error, true)
    }
  }
}

module.exports = FileService
const { FileService } = require('../services');
const fs = require('fs')
const addLog = require('../utils/winstonLogger')

const getNumbers = async (str, arr) => {
  if(str.length > 1) {
    const number = str.slice(0, str.indexOf(','))
    const restOfStr = str.slice((str.indexOf(',') + 1), (str.length + 1))
    await arr.push(parseInt(number))
    await getNumbers(restOfStr, arr)
  } else if (str.length === 1) {
    const number = str
    await arr.push(parseInt(number))
    return arr
  }
  return arr
}

const getArrays = async (str, arrays) => {
  if(str.includes('[')) {
    const arrStr = str.slice((str.indexOf('[') + 1), str.indexOf(']'))
    const newStr = str.slice(str.indexOf(']') + 2, (str.length + 1))
    const numArr = await getNumbers(arrStr, [])
    await arrays.push(numArr)
    await getArrays(newStr, arrays)
  }
  return arrays
};

class FileController {

  static async sortByAsc(req, res) {
    fs.readFile('./public/assets/original.txt', 'utf8' , async (err, data) => {
      if(err) {
        return res.status(400).json({
          message: error
        })
      }
      const arrays = await getArrays(data, [])

      const ordered = await FileService.SortByAsc(arrays)

      if(!ordered || !!ordered.isError) {
        return res.status(400).json({
          message: ordered.response
        })
      }

      addLog('ascending')
      
      return res.status(200).json({
        message: 'Ordered succesfully',
        ordered
      })
    })
  }

  static async sortByDes(req, res) {
    fs.readFile('./public/assets/original.txt', 'utf8' , async (err, data) => {
      if(err) {
        return res.status(400).json({
          message: error
        })
      }
      const arrays = await getArrays(data, [])

      const ordered = await FileService.SortByDes(arrays)

      if(!ordered || !!ordered.isError) {
        return res.status(400).json({
          message: ordered.response
        })
      }
      
      addLog('descending')

      return res.status(200).json({
        message: 'Ordered succesfully',
        ordered
      })
    })
  }

  static async sortByMix(req, res) {
    fs.readFile('./public/assets/original.txt', 'utf8' , async (err, data) => {
      if(err) {
        return res.status(400).json({
          message: error
        })
      }
      const arrays = await getArrays(data, [])

      const ordered = await FileService.SortByMix(arrays)

      if(!ordered || !!ordered.isError) {
        return res.status(400).json({
          message: ordered.response
        })
      }

      addLog('mixed')
      
      return res.status(200).json({
        message: 'Ordered succesfully',
        ordered
      })
    })
  }

}

module.exports = FileController
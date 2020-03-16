const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers');
const { FileController } = require('../controllers')

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.login);
router.get('/users', AuthController.getUsers);
router.get('/asc', FileController.sortByAsc);

module.exports = router
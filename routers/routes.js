const express = require('express');
const router = express.Router();

const passport = require('passport');
const { AuthController } = require('../controllers');
const { FileController } = require('../controllers')

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.login);
router.get('/asc',
  passport.authenticate('jwt', { session: false }),
  FileController.sortByAsc
);
router.get('/des',
  passport.authenticate('jwt', { session: false }),
  FileController.sortByDes
);
router.get('/mix',
  passport.authenticate('jwt', { session: false }),
  FileController.sortByMix
);

module.exports = router
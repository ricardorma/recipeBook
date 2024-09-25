const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth-v2');
const userController = require('../controllers/userCtrl');
const passport = require('passport')

router.get('/user', isAuth, userController.getUser)

router.get('/check-session', userController.checkSession)

module.exports = router;
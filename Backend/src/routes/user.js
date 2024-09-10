const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/userCtrl');


router.get('/user', isAuth, userController.getUser)

module.exports = router;
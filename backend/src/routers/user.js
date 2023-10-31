const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const loginHandler = require('../helper/loginhandler');

router.post('/login', loginHandler.loginUser);
router.get('/getUsers', userController.getUser);
router.post('/signup', userController.addUser);

module.exports = router;
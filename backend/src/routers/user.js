const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const loginHandler = require('../helper/loginhandler');
const userValidation = require('../middleware/validations/userValidation')

router.post('/login', userValidation.loginValidation, loginHandler.loginUser);
router.get('/getUsers', userController.getUser);
router.post('/signup', userValidation.signupValidation, userController.addUser);

module.exports = router;
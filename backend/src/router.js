const express = require('express');
const router = express.Router();
const studentRouter = require('./apis/student.js');
const userRouter = require('./apis/user.js');
router.use(studentRouter);
router.use(userRouter);

module.exports = router;

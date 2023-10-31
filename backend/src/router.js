const express = require('express');
const router = express.Router();
const studentRouter = require('./routers/student.js');
const userRouter = require('./routers/user.js');
router.use(studentRouter);
router.use(userRouter);

module.exports = router;
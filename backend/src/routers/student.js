const express = require('express');
const router = new express.Router();
const studentController = require('../controller/studentController');
const verifyToken = require('../middleware/verifyToken');

router.post('/addStudent',verifyToken, studentController.addStudent);
router.get('/getStudents', verifyToken, studentController.getStudents);
router.delete('/deleteStudent/:id',verifyToken, studentController.deleteStudent);
router.put('/updateStudent/:id',verifyToken, studentController.updateStudent);

module.exports = router;
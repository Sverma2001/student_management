const express = require('express');
const router = new express.Router();
const studentController = require('../controller/studentController');
const verifyToken = require('../middleware/verifyToken');

router.post('/addStudent',verifyToken, studentController.addStudent);
router.get('/getStudents', verifyToken, studentController.getStudents);
router.delete('/deleteStudent/:id',verifyToken, studentController.deleteStudent);
router.patch('/updateStudent',verifyToken, studentController.updateStudent);
router.get('/filterSearch/:searchTerm',verifyToken, studentController.filterStudents);

module.exports = router;
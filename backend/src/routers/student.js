const express = require('express');
const router = new express.Router();
const studentController = require('../controller/studentController');
const verifyToken = require('../middleware/verifyToken');
const studentValidation = require('../middleware/validations/studentValidation');

router.post('/addStudent', verifyToken, studentValidation.addStudentValidation, studentController.addStudent);
router.get('/getStudents', verifyToken, studentController.getStudents);
router.delete('/deleteStudent/:uuid', verifyToken, studentValidation.deleteStudentValidation, studentController.deleteStudent);
router.put('/updateStudent/:uuid', verifyToken, studentValidation.updateStudentValidation, studentController.updateStudent);

module.exports = router;
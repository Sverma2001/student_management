const studentService = require('../services/studentService');

//adding student to the database
async function addStudent(req, res) {
    try {
        const response = await studentService.addStudent(req.body);
        res.status(201).send(response);
    }
    catch (error) {
        res.status(500).send({ error: 'Adding Student Failed' });
    }
}

//get all students
async function getStudents(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit
    const searchTerm = req.query.searchTerm;
    try {
        const fetchedStudents = await studentService.fetchStudents(page,limit,searchTerm);
        res.status(200).send(fetchedStudents);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

//delete student from the database
async function deleteStudent(req, res) {
    const studentid = req.params.uuid;
    try {
        const deletedStudent = await studentService.deleteStudent(studentid);
        res.status(201).send(`${deletedStudent.name}'s data has been deleted successfully`);
    }
    catch (error) {
        res.status(500).send({ error: 'Student Deletion Failed' });
    }
}

//update student data
async function updateStudent(req, res) {
    const uuid = req.params.uuid;
    const { address, contact } = { ...req.body };  
    try {
        const updatedStudent = await studentService.updateStudent(uuid, address, contact);
        console.log(updatedStudent)
        res.status(201).send(updatedStudent);
    }
    catch (error) {
        res.status(500).send({ error: 'Updating Student Failed' });
    }
}

module.exports = {
    addStudent,
    getStudents,
    deleteStudent,
    updateStudent,
};
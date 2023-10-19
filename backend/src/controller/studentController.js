const studentService = require('../services/studentService');

//adding student to the database
async function addStudent(req, res) {
    try {
        await studentService.addStudent(req.body);
        res.send(`${req.body.name} Student added successfully`);
    }
     catch (err) {
        res.status(400).send({err:'Adding Student Failed'});
    }
}

//get all students
async function getStudents(req, res) {
    const page = parseInt(req.query.page) || 1;
    try {
        const student = await studentService.getStudents(page);
        res.status(200).send(student);
    }
    catch (err) {
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

//delete student from the database
async function deleteStudent(req, res) {
    const id = req.params.id;
    try {
        const deletedStudent = await studentService.deleteStudent(id);
        res.status(200).send(`student ${deletedStudent.name} is deleted successfully`);
    }
    catch (err) {
        res.status(500).send({err:'Student Deletion Failed'});
    }
}

//update student data
async function updateStudent(req, res) {
    const { id, address, contact } = { ...req.body };
    try {
        const updatedStudent = await studentService.updateStudent(id, address, contact);
        res.status(201).send(`${updatedStudent.name}'s data updated successfully`);
    }
    catch (err) {
        res.status(400).send({err:'Updating Student Failed'});
    }
}

//filtering student on the basis of search term
async function filterStudents(req, res) {
    const page = parseInt(req.query.page) || 1;
    const query = req.params.searchTerm;
    try {
        const students = await studentService.filterStudents(query, page);
        res.send(students);
    }
    catch (err) {
        res.status(401).send({err:'Unable to display data'});
    }
}

module.exports = {
    addStudent,
    getStudents,
    deleteStudent,
    updateStudent,
    filterStudents
};
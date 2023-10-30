const studentService = require('../services/studentService');

//adding student to the database
async function addStudent(req, res) {
    try {
        await studentService.addStudent(req.body);
        res.status(201).send(`${req.body.name} added successfully`);
    }
     catch (error) {
        res.status(500).send({error:'Adding Student Failed'});
    }
}

//get all students
async function getStudents(req, res) {
    const page = parseInt(req.query.page) || 1;
    try {
        const student = await studentService.getStudents(page);
        res.status(200).send(student);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//delete student from the database
async function deleteStudent(req, res) {
    const studentid = req.params.id;
    try {
        const deletedStudent = await studentService.deleteStudent(studentid);
        res.status(201).send(`${deletedStudent.name}'s data has been deleted successfully`);
    }
    catch (error) {
        res.status(500).send({error:'Student Deletion Failed'});
    }
}

//update student data
async function updateStudent(req, res) {
    const { id, address, contact } = { ...req.body };
    try {
        const updatedStudent = await studentService.updateStudent(id, address, contact);
        res.status(201).send(`${updatedStudent.name}'s data updated successfully`);
    }
    catch (error) {
        res.status(500).send({error:'Updating Student Failed'});
    }
}

//filtering student on the basis of search term
async function filterStudents(req, res) {
    const searchTerm = req.params.searchTerm;
    const page = parseInt(req.query.page) || 1;
    try {
        const students = await studentService.filterStudents(searchTerm, page);
        res.status(200).send(students);
    }
    catch (error) {
        res.status(500).send({error:'Unable to display data'});
    }
}

module.exports = {
    addStudent,
    getStudents,
    deleteStudent,
    updateStudent,
    filterStudents
};
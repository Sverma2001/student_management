const Student = require('../models/studentSchema');
const studentRepo = require('../repositories/studentRepositories');

//adding the student into the database
const addStudent = async (data) => {
    try {
        return await studentRepo.addStudent(data);
    }
    catch (err) {
        return err;
    }
}

//fetching all the students
const getStudents = async (page) => {
    limit = 10;
    try {
        const totalPage = await studentRepo.totalPages(limit);
        const students = await studentRepo.getStudents(page, limit);
        const student = {
            students,
            currentPage: page,
            totalPages: totalPage,
        };
        return student;
    }
    catch (err) {
        return err;
    }
}

//deleting the student
const deleteStudent = async (id) => {
    try {
        return await studentRepo.deleteStudent(id);
    }
    catch {
        return "Unable to delete";
    }
}

//updating the student
const updateStudent = async (id, address, contact) => {
    try {
        return await studentRepo.updateStudent(id, address, contact);
    }
    catch {
        return "Unable to update";
    }
}

//filtering students
const filterStudents = async (query, pages) => {
    limit = 10;
    try {
        const students = await studentRepo.filterStudents(query, pages, limit);
        const student = {
            students,
            currentPage: pages,
            totalPages: Math.ceil(students.length / limit) + 1,
        };
        return student;
    }
    catch {
        return "Unable to filter data";
    }
}

module.exports = {
    addStudent,
    getStudents,
    deleteStudent,
    updateStudent,
    filterStudents
};
const studentRepo = require('../repositories/studentRepositories');

//adding the student into the database
const addStudent = async (data) => {
    try {
        return await studentRepo.addStudent(data);
    }
    catch (error) {
        return error;
    }
}

const fetchStudents = async (searchTerm, page, limit = 10) => {
    try {
        // using ternary operation based on searchterm  
        const students = searchTerm
            ? await studentRepo.filterStudents(searchTerm, page, limit)
            : await studentRepo.getStudents(page, limit);
        
        const totalPage = await studentRepo.totalPages(limit);
        return {
            students,
            currentPage: page,
            totalPages: totalPage ,
        };
    } catch (error) {
        return searchTerm ? "Unable to filter data" : error;
    }
}

//deleting the student
const deleteStudent = async (uuid) => {
    try {
        return await studentRepo.deleteStudent(uuid);
    }
    catch {
        return "Unable to delete";
    }
}

//updating the student
const updateStudent = async (uuid, address, contact) => {
    try {
        return await studentRepo.updateStudent(uuid, address, contact);
    }
    catch {
        return "Unable to update";
    }
}

module.exports = {
    addStudent,
    fetchStudents,
    deleteStudent,
    updateStudent
};
const Student = require('../models/studentSchema');

//adding student
const addStudent = async (data) => {
    try {
        const id = await getStudentId();
        const student = new Student({
            id: id,
            ...data
        });
        await student.save() ;
        return student;
    }
    catch{
        return "Unable to add student to the database";
    }
}

//fetching total pages
const totalPages = async (limit) => {
    try {
        const totalStudents = await Student.countDocuments();
        return Math.ceil(totalStudents / limit);
    }
    catch {
        return 'Unable to fetch total pages';
    }
}

//getting students by limit
const getStudents = async (page, limit) => {
    const skip = (page - 1) * limit;
    try {
        return await Student.find().skip(skip).limit(limit);
    } catch {
        return 'Unable to fetch students';
    }
}

//getting student id
const getStudentId = async () => {
    try {
        const studentId = await Student.find().sort({ id: -1 }).limit(1);
        if (!studentId || studentId.length === 0) {
            return id = 1;
        }
        else {
            return id = studentId[0].id + 1;
        }
    }
    catch {
        return 'unable to get id';
    }
}

//deleting student
const deleteStudent = async (id) => {
    try {
        return await Student.findOneAndDelete({ id: id });
    }
    catch (err) {
        return "Unable to delete";
    }
}

//updating student
const updateStudent = async (id, address, contact) => {
    try {
        return await Student.findOneAndUpdate({ id: id }, { address: address, contact: contact });
    }
    catch (err) {
        return "Unable to update";
    }
}

//filtering students
const filterStudents = async (query, pages, limit) => {
    const skip = (pages - 1) * limit;

    const searchQuery = {
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { parent: { $regex: query, $options: 'i' } },
            { class: { $regex: query, $options: 'i' } },
            { address: { $regex: query, $options: 'i' } },
            { contact: { $regex: query, $options: 'i' } }
        ],
    }

    try {
        return await Student.find(searchQuery).skip(skip).limit(limit);
    }
    catch (err) {
        return 'Unable to display data';
    }
}

module.exports = {
    addStudent,
    deleteStudent,
    updateStudent,
    filterStudents,
    getStudents,
    totalPages,
    getStudentId
};
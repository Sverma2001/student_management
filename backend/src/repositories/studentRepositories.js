const Student = require('../models/studentSchema');

//adding student
const addStudent = async (data) => {
    try {
        const id = await getStudentId();
        const student = new Student({
            id: id,
            ...data
        });
        await student.save();
        return student;
    }
    catch {
        throw new Error('Unable to add student');
    }
}

//fetching total pages
const totalPages = async (limit) => {
    try {
        const totalStudents = await Student.countDocuments();
        //it should return 1 if there is no students in the database
        return Math.max(Math.ceil(totalStudents / limit), 1);
    }
    catch {
        throw new Error('Unable to fetch total pages');
    }
}

//getting students by limit
const getStudents = async (page, limit) => {
    const skip = (page - 1) * limit;
    try {
        return await Student.find().skip(skip).limit(limit);
    } catch {
        throw new Error('Unable to fetch students');
    }
}

//getting student id
const getStudentId = async () => {
    try {
        const latestStudent = await Student.findOne().sort({ id: -1 });
        if (!latestStudent) {
            return 1;
        } else {
            return latestStudent.id + 1;
        }
    } catch {
        throw new Error('Unable to fetch student id');
    }
}

//deleting student
const deleteStudent = async (id) => {
    try {
        return await Student.findOneAndDelete({ id });
    }
    catch (err) {
        throw new Error('Unable to delete student');
    }
}

//updating student
const updateStudent = async (id, address, contact) => {
    try {
        return await Student.findOneAndUpdate({ id }, { address, contact });
    }
    catch (err) {
        throw new Error('Unable to update student');
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
        throw new Error('Unable to filter students');
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
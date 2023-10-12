const express = require('express')
const router = new express.Router()
const Student = require('../models/studentSchema')

// add new student
router.post('/addStudent', async (req, res) => {
    try {
        const studentId = await Student.find().sort({ id: -1 }).limit(1)

        if (!studentId || studentId.length === 0) {
            id = 1
        }
        else {
            id = studentId[0].id + 1
        }

        const student = new Student({
            id: id,
            ...req.body
        })

        await student.save()
        res.send(student)
        console.log(student)
        res.send(`Student ${student.name} added successfully`)
    }
     catch (e) {
        res.status(400).send(e)
    }
})

// get all students
router.get('/getStudents', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const totalStudents = await Student.countDocuments();
        const students = await Student.find().skip(skip).limit(limit);

        const student = {
            students,
            currentPage: page,
            totalPages: Math.ceil(totalStudents / limit),
        }
        console.log(student)
        res.send(student)
    }
    catch (e) {
        res.status(500).json({ e: 'Internal Server Error' })
    }
})

// Delete student by their serial no
router.delete('/deleteStudent/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleteStudent = await Student.findOneAndDelete({ id: id })
        res.status(200).send(`student with id ${id} is deleted successfully`)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

//update student by their serial no
router.patch('/updateStudent', async (req, res) => {
    const { id, address, contact } = { ...req.body }
    try {
        await Student.findOneAndUpdate({ id }, { address, contact })
        res.status(201).send("updated successfully")
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/filterSearch/:searchTerm', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const query = req.params.searchTerm

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
        console.log(query)

        const students = await Student.find(searchQuery).skip(skip).limit(limit);

        const student = {
            students,
            currentPage: page,
            totalPages: Math.ceil(students.length / limit) + 1,
        }
        console.log(students.length, student.totalPages)
        res.send(student);
    }
    catch (e) {
        res.status(401).send(e)
    }
})

module.exports = router
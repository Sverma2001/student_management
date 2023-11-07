const { string } = require('joi');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        autoIncrement:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    parent:{
        type:String,
        required:true,
        trim:true
    },
    class:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:false,
        trim:true
    },
    contact:{
        type:String,
        required:false,
        trim:true
    }
})

const Student = mongoose.model('student', studentSchema);
module.exports = Student;
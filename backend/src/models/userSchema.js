const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
},
    {
        timestamps: true
    });

const User = mongoose.model('user', userSchema);
module.exports = User;
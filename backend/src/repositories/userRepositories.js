const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

//fetching user
const getUser = async() => {
    try{
        return await User.find();
    }
    catch{
        return 'Failed to fetch user';
    }
}

//fetch the user from the database
const findUser = async(username) => {
    try{
        return await User.findOne({username:username});
    }
    catch{
        return 'Failed to find user';
    }
}

module.exports = {
    getUser,
    findUser,
};
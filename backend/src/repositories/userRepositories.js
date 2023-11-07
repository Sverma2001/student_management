const User = require('../models/userSchema');

//fetching user
const getUser = async() => {
    try{
        return await User.find();
    }
    catch{
        throw new Error('Unable to fetch user');
    }
}

//fetch the user from the database
const findUser = async(username) => {
    try{
        return await User.findOne({username:username});
    }
    catch{
        throw new Error('Unable to find user');
    }
}

module.exports = {
    getUser,
    findUser,
};
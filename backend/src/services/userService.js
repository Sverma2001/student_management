const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const userRepo = require('../repositories/userRepositories');

//adding user to the database
const addUser = async (name, username, password) => {
    try {
        let user = await userRepo.findUser(username);
        if (user) {
            return 'username already exists, Please choose another';
        }

        user = new User({
                name,
                username,
                password: await bcrypt.hash(password, 10)
            });

        await user.save();
        return "user created";
    }
    catch (error) {
        return error;
    }
}

//fetch user from the database
const getUser = async () => {
    try {
        return await userRepo.getUser();
    }
    catch (error) {
        return error;
    }
}

module.exports = {
    getUser,
    addUser
};
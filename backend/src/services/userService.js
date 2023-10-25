const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const userRepo = require('../repositories/userRepositories');

//adding user to the database
const addUser = async (fname, lname, username, password) => {
    try {
        let user = await userRepo.findUser(username);
        if (user) {
            return 'username already exists, Please choose another';
        }

        const obj = {
            fname: fname,
            lname: lname,
            username: username,
            password: await bcrypt.hash(password, 10)
        };
        user = new User(obj);

        await user.save();
        return "user created";
    }
    catch (err) {
        return err;
    }
}

//fetch user from the database
const getUser = async () => {
    try {
        return await userRepo.getUser();
    }
    catch (err) {
        return err;
    }
}

module.exports = {
    getUser,
    addUser
};
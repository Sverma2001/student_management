const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const userRepo = require('../repositories/userRepositories');

//adding user to the database
const addUser = async (username, password, saltRounds) => {
    try {
        const user = await userRepo.findUser(username);
        if (user) {
            return 'username already exists';
        }
    }
    catch (err) {
        return err;
    }

    let user = {}
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                // Handle error
            }
            else {
                user = new User({
                    username: username, password: hash
                });
                try {
                    await user.save();
                    return user;
                }
                catch (err) {
                    return err;
                }
            };
        });
    });
}

//fetch user from the database
const getUser = async () => {
    try {
        return await userRepo.getUser();
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUser,
    addUser
};
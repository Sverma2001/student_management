const userService = require('../services/userService');
const bcrypt = require('bcryptjs');

//adding user
async function addUser(req, res) {
    const { name, username, password } = req.body ;
    try {
        const response = await userService.addUser(name, username, password);
        if (response?.includes('username already exists')) {
            res.status(409).send(response);
        }
        else {
            res.status(201).send(response);
        }
    }
    catch (err) {
        res.status(500).send({ err: 'Internal Server Error' });
    }
}

//get user
async function getUser(req, res) {
    try {
        const fetchedUser = await userService.getUser();
        res.status(200).send(fetchedUser);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

async function isValidPassword(userPassword, enteredPassword) {
    return await bcrypt.compare(enteredPassword, userPassword);
}

module.exports = {
    addUser,
    getUser,
    isValidPassword
};
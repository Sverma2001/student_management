const userService = require('../services/userService');
const bcrypt = require('bcryptjs');

//adding user
async function addUser(req, res) {
    const { name, username, password } = { ...req.body };
    try {
        const user = await userService.addUser(name, username, password);
        res.status(201).send(user);
    }
    catch (err) {
        res.status(500).send({ err: 'Internal Server Error' });
    }
}

//get user
async function getUser(req, res) {
    try {
        const user = await userService.getUser();
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

async function isValidPassword (userPassword, enteredPassword) {
    return await bcrypt.compare(enteredPassword, userPassword);
}

module.exports = {
    addUser,
    getUser,
    isValidPassword
};
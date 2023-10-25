const userService = require('../services/userService');
const bcrypt = require('bcryptjs');

//adding user
async function addUser(req, res) {
    const { fname, lname, username, password } = { ...req.body };
    try {
        const user = await userService.addUser(fname, lname, username, password);
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
        res.status(201).send(user);
    }
    catch (err) {
        res.status(401).send(err);
    }
}

async function isValidPassword (userPassword, enteredPassword) {
    const compare = await bcrypt.compare(enteredPassword, userPassword);
    return compare;
}

module.exports = {
    addUser,
    getUser,
    isValidPassword
};
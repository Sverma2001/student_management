const userService = require('../services/userService');

//adding user
async function addUser(req, res) {
    const { fname, lname, username, password } = { ...req.body };
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    try {
        const user = await userService.addUser(fname, lname, username, password, saltRounds);
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

module.exports = {
    addUser,
    getUser
};
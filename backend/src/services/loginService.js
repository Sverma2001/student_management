const userRepo = require('../repositories/userRepositories');
const generateToken = require('../middleware/generateToken.js');
const bcrypt = require('bcryptjs');

//user login 
const loginUser = async (username, password) => {
    try {
        const user = await userRepo.findUser(username);
        if (!user) {
            throw Error('not-authorised');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            token = generateToken(username);
            return token;
        }
        else {
            throw Error("password is invalid");
        }
    }
    catch(err) {
        console.log(err.message);
        console.log({err:'Login Failed'});
    }
}

module.exports = {
    loginUser
};
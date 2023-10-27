const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

//generate token
const generateToken = (userid) => {
    const user = { userid };
    try {
        const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
        return token;
    }
    catch (err) {
        throw Error("unable to generate token");
    }
}

module.exports = generateToken;
const jwt = require('jsonwebtoken');
const secretKey = "SachinKumarVerma";

//generate token
const generateToken = (username) => {
    const user = {username};
    try{
        const token = jwt.sign(user,secretKey, { expiresIn: '1h' });
        return token;
    }
    catch(err){
        throw Error("unable to generate token");
    }
} 

module.exports = generateToken;
const jwt = require('jsonwebtoken');
const secretKey = "SachinKumarVerma";

//verify token
const tokenVerified = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Token is missing" });
    }

    try{
        const decodedToken = jwt.verify(token,secretKey);
        if(decodedToken){
            next();
        }
    }
    catch(e){
        res.status(401).json({ message: "Token verification failed" });
    }
}

module.exports = tokenVerified;
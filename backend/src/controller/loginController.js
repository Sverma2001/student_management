const loginService = require('../services/loginService');

async function loginUser(req, res) {
    const {username, password} = {...req.body};
    try{
        const token = await loginService.loginUser(username, password);
        res.status(200).send({token:token});
    }
    catch(err){
        res.status(500).send({err:'Internal Server Error'});
    }
}

module.exports = {
    loginUser
};
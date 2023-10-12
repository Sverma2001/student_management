const express = require('express')
const router = express.Router()
const User = require('../models/userSchema.js')
const bcrypt = require('bcryptjs')

//User Login
router.post('/login', async(req,res)=>{
    const {username, password} = {...req.body}

    
    try{
        const user = await User.findOne({username:username})
        if(!user){
            res.status(401).send('not-authorized')
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
            res.status(200).send('authorized')
        }
        else {
            console.log(req.body)
            res.send('not-authorized');
        }
    }
    catch(e){
        res.status(500).send({e:'Internal Server Error'})
    }
})

//For testing purpose to get all user Credentials
router.get('/getUsers', async(req,res)=>{
    try{
        const user = await User.find()
        res.status(201).send(user)
    }
    catch(e){
        res.status(401).send(e)
    }
})

//User Sign up
router.post('/addUser', async(req,res)=>{
    const {username, password} = {...req.body}
    const saltRounds = 10; // Adjust the number of salt rounds as needed

    let user={}
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
            // Handle error
            } else {
                user = new User({
                    username:username, password:hash
                })

                try{
                    await user.save()
                    res.status(201).send(user)
                }
                catch(e){
                    res.status(400).send(e)
                }
            }
        });
    });
})

module.exports = router
require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateAccessToken } = require('../helpers/jwt');
const salt = bcrypt.genSaltSync(8);


router.post('/signup', async (req, res) =>{
    const {first_name, last_name, email, password} = req.body;
    try {
        const newUser = await User.create({
            first_name, 
            last_name, 
            email, 
            password: bcrypt.hashSync(password,salt)
        });
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json(error.message);
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const passwordMatched = bcrypt.compareSync(password, user.password)
    try {
        if (passwordMatched){
            const accessToken = generateAccessToken(`${new Date().getSeconds()}${user.email}`)
            res.status(200).json({id: user._id,accessToken: accessToken})
        } else {
            res.status(400).json({message:"Wrong credentials"})
        }
    } catch (error) {
        res.status(400).json(error.message); 
    }
});


module.exports = router
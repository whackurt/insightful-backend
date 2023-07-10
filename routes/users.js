const express = require('express');
const router = express.Router()
const { authenticateToken } = require('../helpers/jwt');
const User = require('../models/User');

router.get('/:id',authenticateToken, async (req, res) => {
    try {
        const user = await User.find({_id: req.params.id},'-password');        
        if (user.length){
            res.status(200).json(user);
        } else {
            res.status(200).json({});
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router
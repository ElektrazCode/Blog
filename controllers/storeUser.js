const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = async (req, res) =>{
    await User.create(req.body, (error, user)=>{
        console.log(error);
        if (error)
            res.redirect('/auth/register');
        res.redirect('/');
    });
};
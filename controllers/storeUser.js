const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = async (req, res) =>{
    await User.create(req.body, (error, user)=>{
        if(error){
            const validationErrors = Object.keys(error.errors).map(key=>error.errors[key].message);
            // req.session.validationErrors = validationErrors;
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            return res.redirect('/auth/register');
        }
        res.redirect('/');
    });
};
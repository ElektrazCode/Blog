const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = async (req, res) =>{
    await User.create(req.body);
    res.redirect('/');
};
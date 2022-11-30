const User = require('../models/User');

module.exports = (req, res, next)=>{
    User.findById(req.session.userId, (error, user)=>{
        if (error || !uesr)
            return res.redirect('/');
        next();
    })
};
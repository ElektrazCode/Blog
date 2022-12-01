// const flash = require('connect-flash');
module.exports = (req, res) => {
    //errors: req.session.validationErrors
    res.render('register', { errors: req.flash('validationErrors') });
};
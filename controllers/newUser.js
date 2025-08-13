module.exports = (req, res) => {
    let username = '';
    let password = '';
    const data = req.flash('userData')[0];

    if(typeof data != "undefined"){
        username = data.username;
        password = data.password;
    }
    //errors: req.session.validationErrors
    res.render('register', { 
        errors: req.flash('userValidationErrors'), 
        username: username,
        password: password
    });
};
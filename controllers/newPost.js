module.exports = (req, res) => {
        if (req.session.userId){
                let title = '';
                let body = '';
                const data = req.flash('postData')[0];
                if(typeof data != 'undefined'){
                        title = data.title;
                        body = data.body;
                }
                return res.render('create', {
                        errors: req.flash('postValidationErrors'),
                        title: title,
                        description: body
                });
        }
        else
                res.redirect('/auth/login');
};
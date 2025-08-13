const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports = async (req, res) => {
    let data = {};
    if(!req.files || Object.keys(req.files).length === 0)
        data = req.body;
    else{
        let image = req.files.image;
        image.mv(path.resolve(__dirname, '..', 'public/assets/img', image.name), async (error)=>{
            data = {...req.body, image: '/assets/img/' + image.name};
        });
    }
    await BlogPost.create(data, (error, blogpost) =>{
        if(error){
            const validationErrors = Object.keys(error.errors).map(key=>error.errors[key].message);
            req.flash('postValidationErrors', validationErrors);
            req.flash('postData', req.body);
            return res.redirect('/posts/new');
        }
        else
            return res.redirect('/');
    });
};
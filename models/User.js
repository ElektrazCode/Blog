const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next){
    const user = this;

    bcrypt.hash(user.password, 10, (error, hash)=>{
        user.password = hash;
        next();
    });
});


module.exports = mongoose.model('User', userSchema);


/**Another way of setting up the schema**/

//const mongoose = require('mongoose');
//const schema = mongoose.Schema;
//const userSchema = new schema({
//   username: String,
//   password: String
//});
//const User = mongoose.model('User', userSchema);
//module.exports = User;
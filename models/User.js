const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
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
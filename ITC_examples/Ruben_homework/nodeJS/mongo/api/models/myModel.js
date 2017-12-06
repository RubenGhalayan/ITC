var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {type: String, required: true, unique:true},
    password: String,
    email: String
});
var User = mongoose.model('User', userSchema);
module.exports.User = User;


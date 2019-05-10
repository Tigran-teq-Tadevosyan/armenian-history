const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: String,
    email: String,
    reviews: Array
});
var User = mongoose.model('User', UserSchema);

module.exports = User;

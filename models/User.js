const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: String,
    email:  { type: String, required: true, index: { unique: true } },
    reviews: Array
});
var User = mongoose.model('User', UserSchema);

module.exports = User;
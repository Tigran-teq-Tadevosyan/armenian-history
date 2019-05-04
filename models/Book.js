const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: { type: String, required: true, index: { unique: true } },
    description: String,
    reviews: Array,
    pending_reviews: Array
});
var Book = mongoose.model('Book', BookSchema);

module.exports = Book;

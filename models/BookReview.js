const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookReviewSchema = new Schema({
    book_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    username: String,
    review_content: String
});
var BookReview = mongoose.model('BookReview', BookReviewSchema);

module.exports = BookReview;

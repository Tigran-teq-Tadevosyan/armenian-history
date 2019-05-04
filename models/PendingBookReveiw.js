const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PendingBookReviewSchema = new Schema({
    book_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    username: String,
    review_content: String,
    comment: String,
    status: String
});
var PendingBookReview = mongoose.model('PendingBookReview', PendingBookReviewSchema);

module.exports = PendingBookReview;

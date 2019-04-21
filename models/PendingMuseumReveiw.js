const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PendingMuseumReviewSchema = new Schema({
    museum_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    username: String,
    basic_summery: String,
    before_visiting: String,
    the_visit_itself: String,
    after_visiting: String,
    comment: String,
    status: String
});
var PendingMuseumReview = mongoose.model('PendingMuseumReview', PendingMuseumReviewSchema);

module.exports = PendingMuseumReview;

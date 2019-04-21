const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MuseumReviewSchema = new Schema({
    museum_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    username: String,
    basic_summery: String,
    before_visiting: String,
    the_visit_itself: String,
    after_visiting: String
});
var MuseumReview = mongoose.model('MuseumReview', MuseumReviewSchema);

module.exports = MuseumReview;

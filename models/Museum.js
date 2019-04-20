const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MuseumSchema = new Schema({
    title: { type: String, required: true, index: { unique: true } },
    description: String,
    reviews: Array,
    pending_reviews: Array
});
var Museum = mongoose.model('Museum', MuseumSchema);

module.exports = Museum;

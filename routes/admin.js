'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Museum = require('../models/Museum.js');
const PendingMuseumReveiw = require('../models/PendingMuseumReveiw.js');
const MuseumReveiw = require('../models/MuseumReview.js');

// define the home page route
router.get('/', function (req, res) {
    Museum.find({},(err,museums)=>{
	res.render('dashboard',{
	    partial:"admin_partials/museums.ejs",
	    museums:museums
	});	
    });
});

// Add Museum
router.post('/addmuseum', function (req, res) {
    let new_museum = new Museum({
	title:req.body.name,
	description:"",
	reviews:[],
	pending_reviews:[]
    });
    new_museum.save();
    res.redirect('/');
});

// Reviews
router.get('/reviews', function (req, res) {
    PendingMuseumReveiw.find({status:'pending'},(err,reviews)=>{
		res.render('dashboard',{
			partial:"admin_partials/reviews.ejs",
			reviews:reviews
		});	
    });
});

router.post('/disprovereview', function (req, res) {
    PendingMuseumReveiw.findOne({_id:req.body.id},(err,review)=>{
		if(err || !review) return res.redirect('/');
		review.status = 'disapproved'
		review.comment = req.body.comment
		review.save()
	});
});

router.post('/approvereview', function (req, res) {
	PendingMuseumReveiw.findOne({_id:req.body.id},(err,review)=>{
		if(err || !review) return res.redirect('/');
		let new_MuseumReveiw = new MuseumReveiw({
			museum_id: review.museum_id,
			user_id: review.user_id,
			username: review.username,
			basic_summery: review.basic_summery,
			before_visiting: review.before_visiting,
			the_visit_itself: review.the_visit_itself,
			after_visiting: review.after_visiting
		});
		new_MuseumReveiw.save((err,new_review)=>{
			User.findOne({_id:review.user_id},(err,user)=>{
				var index = user.reviews.indexOf(review._id);
				if (index > -1) {
					user.reviews.splice(index, 1);
				}
				user.reviews.push(new_review._id);
				user.save();
				review.remove();
			});
		});
	});
});

module.exports = router;

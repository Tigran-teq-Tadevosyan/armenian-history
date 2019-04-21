'use strict';

const express = require('express');
const router = express.Router();
const mailer = require('../utils/mailer');
const User = require('../models/User.js');
const Museum = require('../models/Museum.js');
const PendingMuseumReveiw = require('../models/PendingMuseumReveiw.js');
const MuseumReview = require('../models/MuseumReview.js');


var pendingUsers = [];

function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


// define the home page route
router.get('/', function (req, res) {
  res.render('layout',{
    partial:"partials/main.ejs",
    transparent: true,
    user: req.user
  });
});

router.get('/profile', function (req, res) {
  MuseumReview.find({user_id: req.user._id},(err,user_reviews)=>{
    if(!user_reviews || err) return res.redirect("/");
    PendingMuseumReveiw.find({user_id: req.user._id},(err,user_pendingreviews)=>{
      if(!user_pendingreviews || err) return res.redirect("/");
      res.render('layout',{
        partial:"partials/profile.ejs",
        transparent: false,
        user: req.user,
        reviews: user_reviews,
        pendingreviews: user_pendingreviews
      });
    });
  });
});

router.get('/museum', function (req, res) {
    Museum.find({},(err,museums)=>{
	res.render('layout',{
	    partial:"partials/museum.ejs",
	    transparent: false,
	    user: req.user,
	    museums: museums
	});
    });
});

router.get('/book', function (req, res) {
  res.render('layout',{
    partial:"partials/book.ejs",
    transparent: false,
    user: req.user
  });
});

router.get('/login', function (req, res) {
  res.render('layout',{
    partial:"partials/login.ejs",
    transparent: false,
    user: req.user
  });
});

router.get('/checkinbox', function (req, res) {
  res.render('layout',{
    partial:"partials/checkinbox.ejs",
    transparent: false,
    user: req.user
  });
});

router.get('/logout', function (req, res) {
  res.cookie('userdata',undefined, { maxAge: 900000, httpOnly: true });
  res.render('layout',{
    partial:"partials/main.ejs",
    transparent: false,
    user: undefined
  });
});

router.get('/pendinguser/:id', function (req, res) {
  var user = pendingUsers.filter( function(item){return (item.pendingID==req.params.id);} )[0];
  if (!user)
    return res.redirect('/');
  let new_user = new User({
    username: user.username,
    email:  user.email,
    password: user.password
  });
  new_user.save(function(err, new_user){
    res.cookie("userdata", new_user._id); 
    res.redirect("/");
  });
});

router.get('/unitmuseum/:id', function(req, res){
    Museum.findOne({_id:req.params.id},(err,museum) => {
      if(!museum || err) return res.redirect("/");
      MuseumReview.find({_id: { $in : museum.reviews }},(err,reviews)=>{
        if(!reviews || err) return res.redirect("/");
        res.render('layout',{
            partial:"partials/unit.ejs",
            museum:museum,
            transparent:false,
            user:req.user,
            reviews:reviews
        });
      });
    });
});

router.get('/addreview/:id', function(req, res){
  Museum.findOne({_id:req.params.id},(err,museum) => {
    if(!museum || err) return res.redirect("/");
    res.render('partials/addreview.ejs',{
        partial:"partials/addreview.ejs",
        museum:museum,
        transparent:false,
        user:req.user
    });
  });
});

router.get('/resubmit/:id', function(req, res){
  PendingMuseumReveiw.findOne({_id:req.params.id},(err,review) => {
    if(!review || err) return res.redirect("/");
    res.render('partials/resubmit.ejs',{
        review:review,
        transparent:false,
        user:req.user
    });
  });
});

// Adding post reqs

router.post('/login', function (req, res) {
  User.findOne({username:req.body.username,password:req.body.password},(err,user)=>{
    if (err || !user)
      return res.redirect('/');
    res.cookie("userdata", user._id); 
    res.redirect("/");
  });
});

router.post('/signup', function (req, res) {
  let pendingID = makeid(10);
  mailer(req.body.username,req.body.email,pendingID)
  pendingUsers.push({
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    pendingID:pendingID
  });
  res.redirect('/checkinbox');
});

router.post('/addreview/:id', function(req, res){
  Museum.findOne({_id:req.params.id},(err,museum) => {
    if(!museum || err) return res.redirect("/");
    console.log('museum',museum);
    console.log('user',req.user);
    let new_PendingMuseumReveiw = new PendingMuseumReveiw({
        museum_id: museum._id,
        user_id: req.user._id,
        username: req.user.username,
        basic_summery:req.body.basic_summery,
        before_visiting:req.body.before_visiting,
        the_visit_itself:req.body.the_visit_itself,
        after_visiting:req.body.after_visiting,
        comment: "",
        status: "pending"
    });
    new_PendingMuseumReveiw.save((err,pendingReveiw)=>{
      if(err || !pendingReveiw) return res.redirect('/profile');
      req.user.reviews.push(pendingReveiw._id);
      req.user.save();
      res.redirect('/profile');
    });
  });
});

router.post('/resubmit/:id', function(req, res){
  PendingMuseumReveiw.findOne({_id:req.params.id},(err,review) => {
    if(!review || err) return res.redirect("/");
    review.basic_summery = req.body.basic_summery;
    review.before_visiting = req.body.before_visiting;
    review.the_visit_itself = req.body.the_visit_itself;
    review.after_visiting = req.body.after_visiting;
    review.comment = '';
    review.status = 'pending'
    review.save(()=>{
      res.redirect('/profile');
    });
  });
});

module.exports = router;

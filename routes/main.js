'use strict';

const express = require('express');
const router = express.Router();
const mailer = require('../utils/mailer');
const User = require('../models/User.js');
const Museum = require('../models/Museum.js');

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
  res.render('layout',{
    partial:"partials/profile.ejs",
    transparent: false,
    user: req.user
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

module.exports = router;

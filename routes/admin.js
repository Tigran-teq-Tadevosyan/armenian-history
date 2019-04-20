'use strict';

const express = require('express');
const router = express.Router();
const Museum = require('../models/Museum.js');

// define the home page route
router.get('/', function (req, res) {
    Museum.find({},(err,museums)=>{
	console.log(museums);
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

module.exports = router;

'use strict';

const User = require('./models/User.js');

module.exports = (req, res, next) => {
    // console.log(req.cookies)
    // req.user = {
    //     username:'Tigran'
    // }
    if (!req.cookies.userdata) return next();
    User.findOne({_id:req.cookies.userdata},(err,user)=>{
        if(err || !user) return next();
        req.user = user;
        return next();
    });
};

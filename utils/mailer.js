'use strict';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testemailforhistoryproject@gmail.com',
      pass: 'matosyan123'
    }
  });

module.exports = (username,email,pendingID) => {
    var mailOptions = {
        from: 'Armeninan History',
        to: email,//'edwardassassin357@gmail.com'
        subject: 'Account activation',
        text: 'Welcome ' + username + '! Click to this link to activate you account http://localhost/pendinguser/' + pendingID + '. This link is active for 1 hour.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
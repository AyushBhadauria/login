'use strict'
const config = require('../../config/local');
const User = require('../../models/user');
const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
var async = require('async');
const bcrypt = require('bcryptjs');

const Mailer = require('../../mailer/creator');
// Register
exports.register = function(req, res) {
  
  let newUser = new User(req.body);
    User.addUser(newUser, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to register user'});
      } else {
        res.json({success: true, msg:'User registered'});
        var options = {
            name: user.name,
            subject: 'Welcome To Our New Website!!!',
            email:user.email,
          
          };
          Mailer.newUser(req,user.email,options)
      }
 
});
};
//-------Forgot Password---------//

exports.forgotpassword = function(req, res) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
        
      });
    },
  function(token, done) {
  const email = req.body.email;
  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User Not Found'});}
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      user.save(function(err) {
        done(err, token, user);
      });
    });
  },

  function(token, user, done) {
    var options = {
        name: user.name,
        subject: 'Account Password Reset',
        url: config.baseUrl+'/reset/' + token
      };
      Mailer.forgotPassword(req,user.email,options)
      return res.json({success: true, msg:'An e-mail has been sent to ' + user.email + ' with further instructions.'});
  }
], function(err) {
  if (err) throw err;
});
};
//-------Reset--------//
exports.resetPassword = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token })
      .where('resetPasswordExpires').gt(Date.now())
      .then((user) => {
        if (!user) {
          return res.json({success: false, msg: 'Password reset token is invalid or has expired.'});
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newPass, salt, (err, hash) => {
            if(err) throw err;
            req.body.newPass = hash;
            user.password = req.body.newPass;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function(err) {
              done(err,user);
          });
          });
        });
    });
    },
    function(user, done) {
        return res.json({success: true, msg: 'Password changed Succesfully.'});
        var options = {
            name: user.name,
            subject: 'Password Reset Successfully',
            email:user.email
          };
          Mailer.confirmReset(req,user.email,options)
    }
  ]);
};

//-------Profile--------//
exports.getProfile = function(req, res) {
  res.json({user: req.user});
};
exports.getProfileById = function(req, res) {
  
 User.find({id:req.params.id},(err,user)=>{
   if(err) throw err;
   else if(!user){
    res.json({success: false, msg:'User Not Fdund'}) 
   }
   else{

    res.json({success: true, msg:user}) 
   }
 })
};


exports.getAllProfiles = function(req, res) {
  User.find({}, (err, users)=>{
    if(err){
      throw err;
    }
 
    res.json(users);
  })
};
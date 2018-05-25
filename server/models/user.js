const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/local');
var Schema = mongoose.Schema;
// User Schema
var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true, unique: true },
  status: { type: Boolean, default: true },
  provider: { type: String, default: 'local'},
  password: {type: String},
  contact: { type: Number },
  lastLogin: { type: Date, default: null },
  date: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

const User = module.exports = mongoose.model('Login', UserSchema);
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
module.exports.getUserByEmail = function(email, callback){
	const query = {email: email}
	User.findOne(query, callback);
  }
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}



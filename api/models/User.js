// user model
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  email : String,
  password : String
});

/**
 * this method is used to remove the password from the user object
 * @returns {*|Array|Object|Binary}
 */
userSchema.methods.toJSON = function () {
  var user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.comparePasswords = function (password, callback) {
  var currentPassword = this.password;

  bcrypt.genSalt(10, function (err, salt) {
    // if there is error we return and pass it
    if(err) throw err;
    bcrypt.hash(currentPassword ,salt, null, function (err, hash) {
      // if there is error we return and pass it
      if(err) throw err;
      currentPassword = hash;
      bcrypt.compare(password, currentPassword, callback);
    });
  });
};

/**-----------------------------------
 * add our middleware By plugin to our
 * user schema and modify our model
 -----------------------------------*/
userSchema.pre('save', function (next) {
  var user = this;
  /**----------------------------------------
   * if user is not modified we don't need to
   * hash it so we just return next
   ----------------------------------------*/
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    // if there is error we return and pass it
    if(err) return next(err);
    bcrypt.hash(user.password ,salt, null, function (err, hash) {
      // if there is error we return and pass it
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
  next();
});

module.exports = mongoose.model('User', userSchema);

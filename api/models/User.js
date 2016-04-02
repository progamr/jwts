// user model
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
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
}
exports.model = mongoose.model('User', userSchema);

/**-----------------------------------
 * add our middleware By plugin to our
 * user schema and modify oyr model
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

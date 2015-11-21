var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: String,
  firstName: String,
  lastName: String
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

function updatePassword(callback) {
  var user = this;
  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
};
UserSchema.pre('save', updatePassword);

UserSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);

